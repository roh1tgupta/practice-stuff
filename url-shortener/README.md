# URL Shortener (Node/Express)

Production-ready scaffold for a high-scale URL shortener with Express, MongoDB, and Redis.

## Features
- Security: `helmet`, CORS, input validation (zod), centralized error handling
- Performance: compression, caching (Redis), connection pooling
- Scalability: stateless API, rate-limiter with Redis backend, Prometheus metrics
- Persistence: MongoDB for canonical mapping, TTL support via `expiresAt`
- Key generation: collision-safe with nanoid + Mongo uniqueness
- Analytics: visit counters in Redis and Mongo `visits`
- Health: `/healthz`, `/metrics`

## Quick start (local)

1. Copy env
```bash
cp .env.example .env
```

2. Start Mongo and Redis (Docker)
```bash
docker compose up -d
```

3. Install deps
```bash
npm install
```

4. Run the service
```bash
npm run dev
```

## API

- POST `/api/v1/shorten`
```json
{
  "url": "https://example.com/some/long/path",
  "customCode": "optional-custom",
  "ttlSeconds": 3600
}
```
Response:
```json
{
  "shortCode": "abc12345",
  "shortUrl": "http://localhost:3000/abc12345",
  "longUrl": "https://example.com/some/long/path",
  "expiresAt": null
}
```

- GET `/api/v1/expand/:code`
Returns `{ code, longUrl }` if found.

- GET `/:code`
Redirects (302) to the long URL.

- GET `/healthz`
Health check.

- GET `/metrics`
Prometheus metrics (on port 9090 if using the separate metrics server).

## API endpoints and how they are implemented

- **POST `/api/v1/shorten`**
  - Validates body with Zod in `src/routes/api.js` (`url`, optional `customCode`, optional `ttlSeconds`).
  - Generates/uses an 8-char code. In the current design, the public short code is stored as the document `_id` (type `String`) in Mongo (`src/models/Url.js`).
  - Persists URL document with optional `expiresAt` TTL in MongoDB.
  - Caches both directions in Redis for fast lookups:
    - `code:{shortCode}:url -> longUrl`
    - `url:{longUrl}:code -> shortCode`
  - Returns `{ shortCode, shortUrl, longUrl, expiresAt }`.

- **GET `/api/v1/expand/:code`**
  - Expands a short code to the long URL.
  - First checks Redis `code:{code}:url`. On miss, loads Mongo with `Url.findById(code)` and repopulates Redis with TTL.
  - Responds `{ code, longUrl }` or 404.

- **GET `/:code` (redirect)**
  - Resolves the long URL (same Redis→Mongo flow as above) and issues a `302` redirect.
  - Increments `visits` counter in Mongo and updates analytics counters in Redis.
  - File: `src/routes/redirect.js`.

- **GET `/` (root page)**
  - Serves `public/index.html` with a small UI to create short links. The page posts to `/api/v1/shorten` via `public/main.js` and shows the result inline.
  - Static serving configured in `src/app.js`.

- **GET `/healthz` / `/readyz`**
  - Health and readiness probes implemented in `src/app.js` and `src/utils/readiness.js`.

- **GET `/metrics`**
  - Prometheus metrics exposed by a lightweight HTTP server defined in `src/utils/metrics.js`. The server listens on `METRICS_PORT` (default `9090`).

## Storage and configuration

- **MongoDB (canonical storage)**
  - Model: `src/models/Url.js`.
  - Schema (key fields):
    - `_id: String` → the public short code.
    - `longUrl: String` → original URL.
    - `expiresAt: Date|null` → optional expiry.
    - `visits: Number` → visit counter.
  - Indexes:
    - TTL index on `{ expiresAt: 1 }` with `expireAfterSeconds: 0` and partial filter (applies only when `expiresAt` is a Date).
    - Time index on `{ createdAt: 1 }`.
  - Connection/pool configured in `src/storage/mongo.js` using `MONGO_URI` and `MONGO_MAX_POOL_SIZE`.

- **Redis (cache + rate limiting + analytics)**
  - Client: `ioredis` in `src/storage/redis.js` (events logged: connect/ready/error/end).
  - Cache keys:
    - `code:{shortCode}:url` → long URL (TTL aligned to `expiresAt` when present).
    - `url:{longUrl}:code` → short code (TTL aligned similarly).
  - Rate limiting uses Redis backend (see `src/middleware/rateLimit.js`).

- **Configuration (`.env`)** via `dotenv` loaded in `src/config/index.js`:
  - Server: `PORT`, `BASE_URL`, `NODE_ENV`.
  - Mongo: `MONGO_URI`, `MONGO_MAX_POOL_SIZE`.
  - Redis: `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`, `REDIS_DB`.
  - Rate limit: `RATE_WINDOW_SECONDS`, `RATE_MAX_PER_WINDOW`.
  - Keygen: `KEY_LENGTH`, `KEY_ALPHABET`, `MAX_KEYGEN_RETRIES`.
  - TTL: `DEFAULT_TTL_SECONDS`, `MAX_TTL_SECONDS`.
  - Logs: `LOG_LEVEL` (e.g., `warn`).
  - Metrics: `METRICS_PORT` (default `9090`).

### MongoDB collection creation (at a glance)
- Collections are typically created on the first write (insert) or when Mongoose builds indexes.
- A read on a non-existent collection returns empty and does not create it.
- In dev, auto index build can create the collection at app start; in prod, consider disabling autoIndex and building indexes during deployment.

## Summary of implementation clarifications

- **Env loading (dotenv)**
  - `loadConfig()` calls `dotenv.config()` early; values are read from `.env`. You can override existing env with `dotenv.config({ override: true })` if desired.

- **Frontend validation and CSP**
  - Native URL input validation was disabled (`type="text"`, `novalidate`), and the client normalizes URLs by preprending `https://` if the scheme is missing. Inline scripts were moved to `public/main.js` to satisfy Helmet’s CSP (`script-src 'self'`).

- **Why short codes are 8 chars (and not Mongo `_id`)**
  - `_id` (ObjectId) is 24 hex chars (≈16–17 chars if Base62-encoded) and not suitable for an 8-char short link. We kept a separate public code. In the current design, we map that short code into the document `_id` as a string for simplicity and uniqueness.

- **Mongo connection pool (`maxPoolSize`)**
  - Controls concurrent DB connections per process. Defaulted via env/config. Tune based on load; too small causes queuing, too large wastes resources.

- **Logging**
  - `pino-http` is configured to log only failed requests: 4xx as `warn`, 5xx as `error`, and suppress 2xx/3xx (`silent`). Health/ready and Chrome DevTools well-known probe are ignored. Log level can be adjusted with `LOG_LEVEL`.

- **Chrome DevTools well-known request**
  - `/.well-known/appspecific/com.chrome.devtools.json` is a harmless probe. It’s ignored in auto-logging.

- **Metrics server port**
  - Exposed at `/metrics` on a dedicated HTTP server. Port is configurable via `METRICS_PORT` (default `9090`). If the port is in use, the app skips starting the metrics server and logs a warning.

## Production notes
- Run behind a reverse proxy (NGINX) that terminates TLS and adds `X-Forwarded-*` headers.
- Configure `BASE_URL` to your public domain.
- Scale horizontally: this app is stateless; cache and DB are external.
- Use `pm2` or systemd to run multiple Node processes, or a container orchestrator.
- Consider Bloom filter or Redis `EXISTS` pre-checks if key collision rate rises.
- Optionally add sharded Mongo and Redis Cluster for higher throughput.

## Tests
Add integration tests using supertest in a `tests/` folder (not included in this scaffold).

## Reverse proxy (NGINX) for production

Use NGINX (or a managed load balancer) in front of the Node app to terminate TLS (HTTPS) and forward requests to the application on localhost. This improves security, operability, and performance.

Example NGINX config (TLS termination + proxy):

```nginx
server {
  listen 443 ssl http2;
  server_name yourdomain.com;

  ssl_certificate     /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

  location / {
    proxy_set_header Host               $host;
    proxy_set_header X-Real-IP          $remote_addr;
    proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto  $scheme;

    proxy_pass http://127.0.0.1:3000;
  }
}
```

What this does:
- Terminates HTTPS at NGINX using your certificate (`listen 443 ssl http2`, `ssl_certificate*`).
- Forwards requests to the Node app over HTTP on the loopback interface (`proxy_pass http://127.0.0.1:3000`).
- Preserves client context via headers (`X-Forwarded-*`, `Host`) so the app sees the original protocol and IP.

Why use it in production:
- Offloads TLS from Node, enabling HTTP/2 and simpler certificate management (e.g., with Let’s Encrypt).
- Adds a hardened public-facing layer for rate limiting, header policies, gzip/brotli, caching, and request buffering.
- Supports zero-downtime deploys, blue/green routing, and better observability.
- Works seamlessly with this app because `src/app.js` sets `app.set('trust proxy', 1)`, so Express respects `X-Forwarded-*` and `req.protocol` is accurate.

Remember to set `BASE_URL=https://yourdomain.com` in `.env` so short links are generated with the correct scheme and host.

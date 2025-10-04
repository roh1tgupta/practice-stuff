# Ride-Sharing System Design (Uber-like)

## Overview
The ride-sharing system enables riders to request rides and drivers to accept and provide them. It matches riders with nearby drivers, manages trip lifecycles, calculates dynamic fares, and tracks locations in real-time. The system is built to be scalable, responsive, and reliable, handling millions of users with low latency.

### Key Aspects
- **Driver-Passenger Matching**: Pair riders with nearby drivers based on location, ETA, ratings, and vehicle type.
- **Trip Management**: Handle ride lifecycle (request, accept, start, track, end, rate).
- **Pricing**: Calculate fares dynamically (distance, time, surge based on demand).
- **Geolocation**: Track real-time locations and compute routes/ETAs.

### Challenges Addressed
- **Real-Time Matching**: Sub-second matching using geospatial indexing and caching.
- **Scalability**: Microservices, load balancing, and queues handle high traffic.
- **ETA Calculation**: External APIs (e.g., Google Maps) and caching ensure accurate, fast ETAs.

## Architecture
A distributed, event-driven system using microservices:

```
[Rider/Driver Apps] → [Load Balancer (NGINX/AWS ELB)] → [API Gateway (Kong/AWS)]
  |
[Microservices (Kubernetes)]:
- User Service (profiles, auth)
- Matching Service (pairing)
- Trip Service (ride lifecycle)
- Pricing Service (fare calc)
- Geolocation Service (location tracking)
  |
[Data Stores]:
- PostgreSQL (user/trip data)
- PostGIS (geospatial, lat/long)
- Redis (cache: driver locations, demand, trip data)
  |
[Message Queues (Kafka)]: Async tasks (notifications, updates)
  |
[External APIs]: Google Maps (routing/ETA), Payment Processor
```

- **Load Balancer**: Distributes traffic to API Gateway.
- **API Gateway**: Routes requests, handles auth/rate-limiting.
- **Microservices**: Independent, scalable (e.g., Go/Node.js/Python).
- **Databases**: PostgreSQL for persistent data, PostGIS for spatial queries, Redis for fast caching.
- **Message Queues**: Kafka for async events (e.g., driver notifications).
- **Monitoring**: Prometheus for metrics, ELK for logs.

## Components and Responsibilities

| Component | Purpose | Tech |
|-----------|---------|------|
| User Service | Manages profiles, auth, ratings | Node.js, PostgreSQL |
| Matching Service | Pairs riders/drivers (proximity, ratings) | Go, PostGIS, Redis |
| Trip Service | Manages ride lifecycle | Python/Django, PostgreSQL |
| Pricing Service | Calculates fares (base + surge) | Python, Redis |
| Geolocation Service | Tracks locations, ETAs | Node.js, PostGIS, WebSockets |
| Load Balancer | Distributes traffic | NGINX/AWS ELB |
| Geospatial DB | Stores lat/long, spatial queries | PostGIS |
| Cache | Fast access to locations/demand | Redis (geospatial sets, counters) |
| Message Queues | Async tasks (notifications, updates) | Kafka |

## Data Storage in Redis
- **Driver Locations**:
  - Key: `active_drivers` (geospatial set).
  - Value: `{driver_id: (lat, long)}`, e.g., `GEOADD active_drivers -74.0060 40.7128 d123`.
  - TTL: 10min.
  - Use: Fast proximity searches for matching.
- **Demand Counters**:
  - Keys: `active_drivers:<geohash>`, `pending_requests:<geohash>`.
  - Value: Integer, e.g., `INCR active_drivers:9q8y -> 3`.
  - TTL: 5-10min.
  - Use: Surge pricing (requests/drivers ratio).
- **Trip Location/ETA**:
  - Key: `trip:<trip_id>:location`.
  - Value: JSON, e.g., `SET trip:xyz456:location {"lat": 40.7128, "long": -74.0060, "eta": "8min"}`.
  - TTL: 1min.
  - Use: Real-time tracking, fare updates.

## Flows for Users

### Rider Flow
1. **Register/Login**:
   - App sends `/register` or `/login` → API Gateway → User Service.
   - Stores profile in PostgreSQL.
   - Failure: Retry, notify app ("Try again").
2. **Request Ride**:
   - App sends `/request-ride {pickup, destination, ride_type}` → API Gateway.
   - **User Service**: Validates user (sync).
   - **Geolocation Service**: Stores lat/long in PostGIS, gets ETA from Google Maps (sync).
   - **Pricing Service**: Computes fare using distance/ETA and Redis demand data (sync).
   - **Matching Service**: Queries Redis/PostGIS for nearby drivers, queues request via Kafka (async start).
   - App gets `{request_id, fare, eta}` (sync).
   - Failure: If no drivers, expand radius or notify app ("No rides").
3. **Matching**:
   - Matching Service sends request to driver via Kafka → driver app (WebSocket).
   - On accept: Trip Service creates record in PostgreSQL, notifies rider via WebSocket.
   - On reject: Re-match with next driver (Redis/PostGIS query).
   - Failure: If no match, queue request, notify app.
4. **During Trip**:
   - App sends `/update-location` → Geolocation Service → PostGIS + Redis (`trip:<id>:location`).
   - Trip Service subscribes to Kafka, updates ETA/fare, pushes via WebSocket.
   - Failure: Use Redis cache; notify if tracking delayed.
5. **End Trip**:
   - Driver ends → Trip Service calls Pricing, updates PostgreSQL, processes payment (async).
   - App gets receipt via WebSocket.
   - Failure: Use cached fare, retry payment.
6. **Rate Driver**:
   - App sends `/submit-rating` → User Service → PostgreSQL.
   - Failure: Queue rating for retry.

### Driver Flow
1. **Register/Login**:
   - Similar to rider, stores in PostgreSQL.
2. **Go Online**:
   - App sends `/go-online {lat_long}` → User Service (status: available, PostgreSQL) → Geolocation Service (PostGIS + Redis `active_drivers`, `INCR active_drivers:geohash`).
   - Failure: Fallback to last Redis location; notify app.
3. **Receive Ride Request**:
   - Matching Service pushes via Kafka → app (WebSocket).
   - Accept: `/accept-ride` → Trip Service creates trip (PostgreSQL), removes driver from Redis `active_drivers`.
   - Reject: Matching Service re-matches.
   - Failure: Queue retries; timeout auto-rejects.
4. **During Trip**:
   - App sends `/update-location` → Geolocation Service (PostGIS + Redis `trip:<id>:location`).
   - Trip Service updates status/ETA, pushes to rider via WebSocket.
   - Failure: Use Redis cache; notify if delayed.
5. **End Trip**:
   - App sends `/end-trip` → Trip Service → Pricing → PostgreSQL, payment queued.
   - Failure: Use cached fare; retry payment.
6. **Go Offline**:
   - App sends `/go-offline` → User Service (PostgreSQL), removes from Redis.
   - Failure: Timeout assumes offline.

### Interconnections
- **Rider-Driver Link**: Drivers’ Redis `active_drivers` and PostGIS locations enable rider matching. Trip creation (PostgreSQL) syncs both apps via WebSocket. Demand counters (`active_drivers:geohash`) affect rider fares.
- **Data Sync**:
  - **PostgreSQL/PostGIS**: Persistent storage for profiles, trips, locations (updated on key events).
  - **Redis**: Caches locations/demand for speed (updated after DB writes, TTL ensures freshness).
  - **Kafka**: Async updates (e.g., driver accept → rider notified).
- **Service Calls**: Matching uses Geolocation (locations); Pricing uses Geolocation (distance/ETA) and Redis (demand); Trip uses Pricing/Geolocation for updates.

## Solving Challenges
1. **Real-Time Matching**:
   - **Solution**: Redis geospatial set (`active_drivers`, O(log N)) for fast proximity searches. Kafka decouples notifications. Scale Matching Service via Kubernetes.
   - **Flow Impact**: Riders get quick matches; drivers get instant requests.
2. **Scalability**:
   - **Solution**: Microservices scale independently (e.g., more Matching pods during rush hour). Load balancer distributes traffic. Redis reduces DB load; Kafka handles backpressure.
   - **Flow Impact**: Handles millions of users; no delays in rider/driver flows.
3. **ETA Calculation**:
   - **Solution**: Google Maps API for accurate ETA (traffic-aware). Cache ETAs in Redis (`trip:<id>:location`) for quick access. Fallback to Haversine if API fails.
   - **Flow Impact**: Rider/driver apps show reliable ETAs, updated real-time.

## Failure Handling
- **Service Failure**: API Gateway retries (3x). Fallback to Redis if DB down.
- **External API Failure**: Use cached ETA/distance or Haversine formula.
- **Queue Failure**: Kafka retries; apps buffer updates.
- **App Notification**: WebSocket/push informs users (e.g., “No drivers, try later”).

## Implementation Steps
1. **Setup**: Use AWS/GCP, Kubernetes for orchestration.
2. **Services**: Build in Go (Matching/Geolocation for speed), Python (Trip/Pricing), Node.js (User).
3. **Databases**: PostgreSQL with PostGIS extension, Redis cluster.
4. **Queue**: Kafka for events, WebSocket for real-time.
5. **Test**: Simulate high load (e.g., 1M riders/drivers).
6. **Monitor**: Prometheus for metrics, ELK for logs.

This design ensures a scalable, real-time ride-sharing system with seamless rider-driver interactions.
import { GraphQLError } from 'graphql';

/**
 * Rate Limiting Plugin for Apollo Server
 * Limits requests to a specified number per minute per client
 */

class RateLimiter {
  constructor(windowMs = 60000, maxRequests = 100) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.clients = new Map();
  }

  isRateLimited(clientId) {
    const now = Date.now();
    const clientData = this.clients.get(clientId) || { requests: [], blocked: false };

    // Remove requests outside the current window
    clientData.requests = clientData.requests.filter(
      timestamp => now - timestamp < this.windowMs
    );

    // Check if client is currently blocked
    if (clientData.blocked) {
      if (now - clientData.blockedAt > this.windowMs) {
        // Unblock if window has passed
        clientData.blocked = false;
        clientData.requests = [];
      } else {
        return true; // Still blocked
      }
    }

    // Add current request
    clientData.requests.push(now);

    // Block if too many requests
    if (clientData.requests.length > this.maxRequests) {
      clientData.blocked = true;
      clientData.blockedAt = now;
      this.clients.set(clientId, clientData);
      return true;
    }

    this.clients.set(clientId, clientData);
    return false;
  }

  getRemainingRequests(clientId) {
    const clientData = this.clients.get(clientId);
    if (!clientData) return this.maxRequests;
    return Math.max(0, this.maxRequests - clientData.requests.length);
  }

  getTimeToReset(clientId) {
    const clientData = this.clients.get(clientId);
    if (!clientData || clientData.requests.length === 0) return 0;
    
    const oldestRequest = Math.min(...clientData.requests);
    return Math.max(0, this.windowMs - (Date.now() - oldestRequest));
  }
}

export function createRateLimitingPlugin(options = {}) {
  const rateLimiter = new RateLimiter(
    options.windowMs || 60000,
    options.maxRequests || 100
  );

  return {
    async requestDidStart() {
      return {
        // Check rate limits before resolving operation
        async didResolveOperation({ request, contextValue }) {
          const clientId = request?.http?.headers?.get('x-client-id') || contextValue?.clientId || 'anonymous';
          
          // Check rate limit first
          if (rateLimiter.isRateLimited(clientId)) {
            const timeToReset = Math.ceil(rateLimiter.getTimeToReset(clientId) / 1000);
            throw new GraphQLError(
              `Rate limit exceeded. Try again in ${timeToReset} seconds. Limit: ${options.maxRequests} requests per ${options.windowMs / 1000} seconds.`,
              {
                extensions: {
                  code: 'RATE_LIMIT_EXCEEDED',
                  timeToReset,
                  limit: options.maxRequests,
                  windowMs: options.windowMs,
                  remaining: 0
                }
              }
            );
          }
        },

        // Add rate limit info to response
        async willSendResponse({ request, contextValue, response }) {
          const clientId = request?.http?.headers?.get('x-client-id') || contextValue?.clientId || 'anonymous';
          const remaining = rateLimiter.getRemainingRequests(clientId);
          
          // Add rate limit headers
          if (contextValue) {
            contextValue.responseHeaders = {
              'X-RateLimit-Limit': options.maxRequests,
              'X-RateLimit-Remaining': remaining,
              'X-RateLimit-Reset': Math.ceil(rateLimiter.getTimeToReset(clientId) / 1000)
            };
          }

          // Add rate limit info to response extensions
          response.extensions = {
            ...response.extensions,
            rateLimits: {
              limit: options.maxRequests,
              remaining,
              reset: Math.ceil(rateLimiter.getTimeToReset(clientId) / 1000)
            }
          };
        }
      };
    }
  };
}

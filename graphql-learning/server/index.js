import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { GraphQLError } from 'graphql';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { getComplexity, fieldExtensionsEstimator, simpleEstimator } from 'graphql-query-complexity';

// Import schema and resolvers
import typeDefs from './schema.js';
import resolvers from './resolvers.js';
import { verifyToken } from './utils/auth.js';
import { createAliasAbusePreventionPlugin } from './middleware/aliasAbusePrevention.js';
import { createQueryComplexityPlugin } from './middleware/queryComplexityAnalysis.js';
import { createRateLimitingPlugin } from './middleware/rateLimiting.js';
import fs from 'fs/promises';

// Create the schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create Express app and HTTP server
const app = express();
const httpServer = http.createServer(app);

// Create WebSocket server for subscriptions
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

// Set up WebSocket server with the schema
const serverCleanup = useServer({ schema }, wsServer);

// In-memory cache for persisted queries
const persistedQueryCache = new Map();

// Create Apollo Server
const server = new ApolloServer({
  schema,
//   Apollo Server's Plugin Hook Resolution Process
// During server shutdown, Apollo Server follows this sequence:
// First, it checks if a plugin has a direct serverWillStop() method
// If not, it looks for a drainServer() method in the object that was returned by the plugin's serverWillStart()
// This behavior is intentional and documented in Apollo Server's plugin architecture to support both:
// The newer, more direct API (explicit serverWillStop)
// The legacy API (returning drainServer from serverWillStart)
  plugins: [
    // Persisted Queries Plugin
    {
      async requestDidStart() {
        return {
          async willSendResponse({ response, contextValue }) {
            // Add persisted query info to response extensions for client metrics
            if (contextValue.persistedQueryCacheHit !== undefined) {
              response.extensions = response.extensions || {};
              response.extensions.persistedQuery = {
                cacheHit: contextValue.persistedQueryCacheHit,
                cacheSize: contextValue.persistedQueryCacheSize || persistedQueryCache.size,
                actualRequestSize: contextValue.actualRequestSize
              };
            }
          },
          async didResolveOperation({ request, document, contextValue }) {
            console.log('=== REQUEST DEBUG ===');
            console.log('Request extensions:', JSON.stringify(request.extensions, null, 2));
            console.log('Has query:', !!request.query);
            console.log('Query length:', request.query?.length || 0);
            console.log('Full request body size:', JSON.stringify(request).length);
            
            const persistedQuery = request.extensions?.persistedQuery;
            
            if (persistedQuery) {
              const { sha256Hash, version } = persistedQuery;
              console.log('🔄 PERSISTED QUERY REQUEST');
              console.log('Hash:', sha256Hash?.substring(0, 12) + '...');
              console.log('Version:', version);
              console.log('Cache size:', persistedQueryCache.size);
              console.log('Request has query field:', !!request.query);
              
              // If we have a hash but no query, try to get from cache
              if (sha256Hash && !request.query) {
                const cachedQuery = persistedQueryCache.get(sha256Hash);
                if (cachedQuery) {
                  request.query = cachedQuery;
                  contextValue.persistedQueryCacheHit = true;
                  contextValue.actualRequestSize = 64; // Only hash was sent
                  console.log('✅ CACHE HIT - Retrieved query from cache, request size: 64 bytes');
                } else {
                  console.log('❌ CACHE MISS - Query not found in cache');
                  contextValue.persistedQueryCacheHit = false;
                  // Return error to trigger Apollo Client retry with full query
                  throw new GraphQLError('PersistedQueryNotFound', {
                    extensions: { code: 'PERSISTED_QUERY_NOT_FOUND' }
                  });
                }
              }
              
              // If we have both hash and query, cache it
              if (sha256Hash && request.query) {
                persistedQueryCache.set(sha256Hash, request.query);
                contextValue.persistedQueryCacheHit = false;
                contextValue.persistedQueryCacheSize = persistedQueryCache.size;
                contextValue.actualRequestSize = request.query.length;
                console.log('💾 CACHING - Stored query with hash, full query size:', request.query.length);
              }
            } else {
              console.log('📝 REGULAR QUERY - No persisted query extension');
              contextValue.persistedQueryCacheHit = false;
              contextValue.actualRequestSize = request.query?.length || 0;
            }
            console.log('===================');
          }
        };
      }
    },
    // Package-based Query Complexity (graphql-query-complexity)
    // {
    //   async requestDidStart() {
    //     return {
    //       async didResolveOperation({ request, document, contextValue }) {
    //         try {
    //           const mode = contextValue?.complexityMode;
    //           // Run package analyzer when explicitly selected or when auto (header absent)
    //           const shouldRun = mode === 'package' || !mode; // auto => no header
    //           if (!shouldRun) return;

    //           const complexity = getComplexity({
    //             schema,
    //             query: document,
    //             variables: request.variables,
    //             operationName: request.operationName,
    //             estimators: [
    //               fieldExtensionsEstimator(),
    //               simpleEstimator({ defaultComplexity: 1 })
    //             ],
    //           });

    //           // Log and enforce limit
    //           if (complexity > 1000) {
    //             throw new Error(`Query rejected: Complexity score too high (${complexity}). Maximum allowed: 1000`);
    //           }
    //           if (complexity > 800) {
    //             console.warn(`⚠️  [Package] Query complexity approaching limit: ${complexity}/1000`);
    //           }
    //         } catch (err) {
    //           // Re-throw to surface as GraphQL error
    //           throw err;
    //         }
    //       }
    //     };
    //   }
    // },
    // Rate Limiting Plugin
    createRateLimitingPlugin({
      windowMs: 60000, // 1 minute
      maxRequests: 100 // 100 requests per minute
    }),

    // Query Complexity Analysis Plugin
    // createQueryComplexityPlugin({
    //   maxComplexity: 1000,
    //   enabled: true
    // }),
    
    // Alias Abuse Prevention Plugin
    createAliasAbusePreventionPlugin({
      maxAliases: 15,
      maxDepth: 10,
      enabled: true
    }),
    
    // Proper shutdown for the HTTP server
    ApolloServerPluginDrainHttpServer({ httpServer }),
    
    // Proper shutdown for the WebSocket server
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

// Start the server
await server.start();

// Helper function to read JSON data from files
async function readData(filename) {
  try {
    const data = await fs.readFile(`./data/${filename}.json`, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}.json:`, error);
    return [];
  }
}

// Apply middleware
app.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      // Get the user token from the headers
      const token = req.headers.authorization?.replace('Bearer ', '');
      
      let user = null;
      if (token) {
        try {
          const decoded = verifyToken(token);
          const users = await readData('users');
          user = users.find(u => u.id === decoded.userId);
          if (user) {
            // Remove password from user object
            const { password, ...userWithoutPassword } = user;
            user = userWithoutPassword;
          }
        } catch (error) {
          // Token is invalid, but we don't throw an error here
          // We just don't set the user in context
          console.log('Invalid token:', error.message);
        }
      }
      
      // Read header-driven complexity mode from FE
      const complexityModeHeader = req.headers['x-complexity-mode'];
      const complexityMode = typeof complexityModeHeader === 'string'
        ? complexityModeHeader.toLowerCase()
        : undefined;

      return { 
        user, 
        complexityMode,
        // Add persisted query cache stats for demo purposes
        persistedQueryCacheSize: persistedQueryCache.size,
        persistedQueryCacheHit: false // Will be overridden by plugin if applicable
      };
    },
  }),
);

// Add a route for the root path
app.get('/', (req, res) => {
  res.send('GraphQL API is running at /graphql');
});

// Start the HTTP server
const PORT = process.env.PORT || 4000;
await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/graphql`);

import { GraphQLError } from 'graphql';
import { createHash } from 'crypto';

// Create a singleton cache for persisted queries
const queryCache = new Map();

// Helper function to generate query hash exactly as sent by the client
// IMPORTANT: Do NOT change whitespace. Apollo Client computes the hash on the exact
// bytes of the printed query string. Any normalization will cause mismatches.
const generateQueryHash = (query) => {
  return createHash('sha256').update(query).digest('hex');
};

export const createPersistedQueriesPlugin = () => {
  // Log immediately when module is loaded
  console.log('PLUGIN: Module loaded');
  
  return {
    async requestDidStart({ request }) {
      // Log every incoming request immediately
      // console.log('PLUGIN: Incoming request:', {
      //   operationName: request.operationName,
      //   hasExtensions: !!request.extensions,
      //   hasPersistedQuery: !!request.extensions?.persistedQuery,
      //   extensionsContent: request.extensions
      // });

      return {
        async didResolveOperation({ request, contextValue }) {
          const persistedQuery = request.extensions?.persistedQuery;
          
          if (!persistedQuery) {
            contextValue.wasPersistedQuery = false;
            // Compute approximate request payload size for non-persisted queries
            const payloadForSize = {
              query: request.query ?? undefined,
              operationName: request.operationName ?? undefined,
              variables: request.variables ?? undefined,
              extensions: request.extensions ?? undefined,
            };
            const json = JSON.stringify(payloadForSize);
            contextValue.actualRequestSize = Buffer.byteLength(json || '', 'utf8');
            return;
          }
          
          const { sha256Hash } = persistedQuery;
          contextValue.wasPersistedQuery = true;

          // Compute approximate request payload size BEFORE we mutate request.query for cache hits
          const payloadForSize = {
            query: request.query ?? undefined, // undefined on hash-only requests
            operationName: request.operationName ?? undefined,
            variables: request.variables ?? undefined,
            extensions: request.extensions ?? undefined, // includes persistedQuery with sha256Hash
          };
          const json = JSON.stringify(payloadForSize);
          contextValue.actualRequestSize = Buffer.byteLength(json || '', 'utf8');

          // Case 1: Hash only request - try to get from cache
          if (sha256Hash && !request.query) {
            const cachedQuery = queryCache.get(sha256Hash);
            if (cachedQuery) {
              request.query = cachedQuery;
              contextValue.persistedQueryCacheHit = true;
              return;
            }
            // Not found in cache - ask client to send full query
            throw new GraphQLError('PersistedQueryNotFound', {
              extensions: { code: 'PERSISTED_QUERY_NOT_FOUND' }
            });
          }

          // Case 2: Hash + Query request - verify and cache
          if (sha256Hash && request.query) {
            const generatedHash = generateQueryHash(request.query);
            if (sha256Hash !== generatedHash) {
              throw new GraphQLError('Hash verification failed', {
                extensions: { 
                  code: 'PERSISTED_QUERY_HASH_MISMATCH',
                  providedHash: sha256Hash,
                  generatedHash
                }
              });
            }
            queryCache.set(sha256Hash, request.query);
            contextValue.persistedQueryCacheHit = false;
          }
        },
        async willSendResponse({ response, contextValue }) {
          const persistedInfo = {
            cacheHit: contextValue.persistedQueryCacheHit || false,
            cacheSize: queryCache.size,
            wasPersistedQuery: contextValue.wasPersistedQuery || false,
            actualRequestSize: contextValue.actualRequestSize
          };

          // Apollo Server v4: attach extensions to singleResult
          const single = response?.body?.singleResult;
          if (single) {
            single.extensions = {
              ...(single.extensions || {}),
              persistedQuery: persistedInfo,
            };
          }
        },
        
      };
    }
  };
};


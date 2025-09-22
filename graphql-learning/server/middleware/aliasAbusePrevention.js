import { GraphQLError } from 'graphql';
import { visit } from 'graphql/language/visitor.js';

/**
 * Alias Abuse Prevention Middleware
 * 
 * This middleware prevents GraphQL queries with excessive aliases that could:
 * 1. Cause performance degradation
 * 2. Lead to DoS attacks
 * 3. Consume excessive server resources
 * 
 * How it works:
 * - Analyzes the incoming GraphQL query AST
 * - Counts the number of aliases used in the query
 * - Rejects queries that exceed the configured limit
 * - Provides detailed error messages for debugging
 */

const DEFAULT_MAX_ALIASES = 15; // Maximum allowed aliases per query
const DEFAULT_MAX_DEPTH = 10;   // Maximum query depth to prevent deeply nested alias abuse

/**
 * Configuration options for alias abuse prevention
 */
export const aliasAbuseConfig = {
  maxAliases: DEFAULT_MAX_ALIASES,
  maxDepth: DEFAULT_MAX_DEPTH,
  enabled: true,
  // Fields that are exempt from alias counting (e.g., introspection fields)
  exemptFields: ['__schema', '__type', '__typename'],
  // Custom error messages
  messages: {
    tooManyAliases: (count, max) => 
      `Query rejected: Too many aliases detected (${count}). Maximum allowed: ${max}`,
    tooDeep: (depth, max) => 
      `Query rejected: Query depth too deep (${depth}). Maximum allowed: ${max}`,
    aliasAbuse: 'Query rejected: Potential alias abuse detected'
  }
};

/**
 * Analyzes a GraphQL query for alias abuse patterns
 * @param {Object} query - The GraphQL query AST
 * @param {Object} config - Configuration options
 * @returns {Object} Analysis results
 */
function analyzeQueryForAliases(query, config = aliasAbuseConfig) {
  let aliasCount = 0;
  let maxDepth = 0;
  let currentDepth = 0;
  const aliasDetails = [];
  const fieldCounts = {};

  // Visitor pattern to traverse the GraphQL AST
  const visitor = {
    Field: {
      enter(node) {
        currentDepth++;
        maxDepth = Math.max(maxDepth, currentDepth);

        // Count aliases
        if (node.alias) {
          aliasCount++;
          aliasDetails.push({
            alias: node.alias.value,
            field: node.name.value,
            depth: currentDepth
          });
        }

        // Count field usage (to detect repetitive aliasing)
        const fieldName = node.name.value;
        if (!config.exemptFields.includes(fieldName)) {
          fieldCounts[fieldName] = (fieldCounts[fieldName] || 0) + 1;
        }
      },
      leave() {
        currentDepth--;
      }
    }
  };

  // Visit the query AST
  visit(query, visitor);

  // Detect suspicious patterns
  const suspiciousPatterns = [];
  
  // Pattern 1: Same field aliased many times
  Object.entries(fieldCounts).forEach(([field, count]) => {
    if (count > 5) { // Threshold for suspicious repetition
      suspiciousPatterns.push({
        type: 'repetitive_aliasing',
        field,
        count,
        description: `Field '${field}' is queried ${count} times`
      });
    }
  });

  // Pattern 2: Deep nested aliases
  const deepAliases = aliasDetails.filter(alias => alias.depth > 5);
  if (deepAliases.length > 0) {
    suspiciousPatterns.push({
      type: 'deep_nested_aliases',
      count: deepAliases.length,
      description: `${deepAliases.length} aliases found at depth > 5`
    });
  }

  return {
    aliasCount,
    maxDepth,
    aliasDetails,
    fieldCounts,
    suspiciousPatterns,
    isAbusive: aliasCount > config.maxAliases || maxDepth > config.maxDepth
  };
}

/**
 * Apollo Server plugin for alias abuse prevention
 * @param {Object} options - Plugin configuration options
 * @returns {Object} Apollo Server plugin
 */
export function createAliasAbusePreventionPlugin(options = {}) {
  const config = { ...aliasAbuseConfig, ...options };

  return {
    requestDidStart() {
      return {
        didResolveOperation({ request, document }) {
          if (!config.enabled) return;

          try {
            // Analyze each operation in the document
            for (const definition of document.definitions) {
              if (definition.kind === 'OperationDefinition') {
                const analysis = analyzeQueryForAliases(definition, config);

                // Log analysis for monitoring
                console.log('🔍 Alias Analysis:', {
                  operation: definition.operation,
                  aliasCount: analysis.aliasCount,
                  maxDepth: analysis.maxDepth,
                  suspiciousPatterns: analysis.suspiciousPatterns.length
                });

                // Check for violations
                if (analysis.aliasCount > config.maxAliases) {
                  throw new GraphQLError(
                    config.messages.tooManyAliases(analysis.aliasCount, config.maxAliases),
                    {
                      extensions: {
                        code: 'ALIAS_ABUSE_DETECTED',
                        aliasCount: analysis.aliasCount,
                        maxAllowed: config.maxAliases,
                        aliasDetails: analysis.aliasDetails,
                        suspiciousPatterns: analysis.suspiciousPatterns
                      }
                    }
                  );
                }

                if (analysis.maxDepth > config.maxDepth) {
                  throw new GraphQLError(
                    config.messages.tooDeep(analysis.maxDepth, config.maxDepth),
                    {
                      extensions: {
                        code: 'QUERY_TOO_DEEP',
                        depth: analysis.maxDepth,
                        maxAllowed: config.maxDepth
                      }
                    }
                  );
                }

                // Check for suspicious patterns
                if (analysis.suspiciousPatterns.length > 2) {
                  console.warn('⚠️  Suspicious query patterns detected:', analysis.suspiciousPatterns);
                  
                  // Optionally reject highly suspicious queries
                  if (analysis.suspiciousPatterns.length > 5) {
                    throw new GraphQLError(
                      config.messages.aliasAbuse,
                      {
                        extensions: {
                          code: 'SUSPICIOUS_QUERY_PATTERN',
                          patterns: analysis.suspiciousPatterns
                        }
                      }
                    );
                  }
                }
              }
            }
          } catch (error) {
            // Re-throw GraphQL errors
            if (error instanceof GraphQLError) {
              throw error;
            }
            
            // Log unexpected errors
            console.error('Error in alias abuse prevention:', error);
            
            // Don't block the query for unexpected errors in production
            if (process.env.NODE_ENV === 'production') {
              console.warn('Alias abuse prevention failed, allowing query to proceed');
            } else {
              throw new GraphQLError('Internal error in alias abuse prevention');
            }
          }
        }
      };
    }
  };
}

/**
 * Express middleware for alias abuse prevention (alternative approach)
 * This can be used if you prefer Express middleware over Apollo plugins
 */
export function aliasAbuseMiddleware(options = {}) {
  const config = { ...aliasAbuseConfig, ...options };

  return (req, res, next) => {
    if (!config.enabled) return next();

    // Only process GraphQL requests
    if (req.path !== '/graphql' || req.method !== 'POST') {
      return next();
    }

    try {
      const { query } = req.body;
      
      if (!query || typeof query !== 'string') {
        return next();
      }

      // Parse and analyze the query
      const { parse } = require('graphql');
      const document = parse(query);
      
      for (const definition of document.definitions) {
        if (definition.kind === 'OperationDefinition') {
          const analysis = analyzeQueryForAliases(definition, config);
          
          if (analysis.isAbusive) {
            return res.status(400).json({
              errors: [{
                message: analysis.aliasCount > config.maxAliases 
                  ? config.messages.tooManyAliases(analysis.aliasCount, config.maxAliases)
                  : config.messages.tooDeep(analysis.maxDepth, config.maxDepth),
                extensions: {
                  code: 'ALIAS_ABUSE_DETECTED',
                  analysis
                }
              }]
            });
          }
        }
      }

      next();
    } catch (error) {
      console.error('Error in alias abuse middleware:', error);
      // Don't block valid requests due to parsing errors
      next();
    }
  };
}

/**
 * Utility function to validate a query string for alias abuse
 * Useful for client-side validation or testing
 */
export function validateQueryForAliases(queryString, options = {}) {
  const config = { ...aliasAbuseConfig, ...options };
  
  try {
    const { parse } = require('graphql');
    const document = parse(queryString);
    
    for (const definition of document.definitions) {
      if (definition.kind === 'OperationDefinition') {
        return analyzeQueryForAliases(definition, config);
      }
    }
    
    return { aliasCount: 0, maxDepth: 0, isAbusive: false };
  } catch (error) {
    return { 
      error: error.message, 
      isAbusive: false 
    };
  }
}

export default createAliasAbusePreventionPlugin;

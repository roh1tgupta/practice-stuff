import { GraphQLError } from 'graphql';
import { visit } from 'graphql/language/visitor.js';

/**
 * Query Complexity Analysis Middleware
 * 
 * This middleware prevents GraphQL queries with excessive computational complexity that could:
 * 1. Cause performance degradation
 * 2. Lead to DoS attacks
 * 3. Consume excessive server resources
 * 4. Overwhelm the database
 * 
 * How it works:
 * - Analyzes the incoming GraphQL query AST
 * - Calculates a complexity score based on field weights and query structure
 * - Rejects queries that exceed the configured complexity limit (default: 1000)
 * - Provides detailed error messages and complexity breakdown
 */

const DEFAULT_MAX_COMPLEXITY = 1000; // Maximum allowed complexity score
const DEFAULT_INTROSPECTION_COMPLEXITY = 1; // Low complexity for introspection queries

/**
 * Default field complexity weights
 * Higher values indicate more expensive operations
 */
const DEFAULT_FIELD_COMPLEXITIES = {
  // Basic fields (low complexity)
  'id': 1,
  'name': 1,
  'title': 1,
  'email': 1,
  'username': 1,
  'role': 1,
  'genre': 1,
  'country': 1,
  'age': 1,
  'rating': 1,
  'comment': 1,
  'createdAt': 1,
  '__typename': 0,
  '__schema': 1,
  '__type': 1,

  // Relationship fields (medium complexity)
  'author': 5,
  'books': 10,
  'reviews': 8,
  'user': 3,
  'book': 3,

  // List queries (higher complexity)
  'authors': 15,
  'users': 12,
  'booksByGenre': 20,
  'booksByAuthor': 18,
  'reviewsByBook': 15,
  'reviewsByUser': 12,
  'filteredBooks': 25,
  'searchBooks': 30,

  // Paginated queries (medium-high complexity)
  'paginatedBooks': 20,

  // Statistics and aggregations (high complexity)
  'authorStatistics': 50,
  'adminStats': 75,

  // Protected/authenticated queries (medium complexity)
  'protectedBooks': 20,
  'protectedAuthors': 18,
  'myProfile': 5,
  'allUsersAdmin': 40,

  // Mutations (variable complexity)
  'addBook': 10,
  'updateBook': 8,
  'deleteBook': 5,
  'addAuthor': 8,
  'updateAuthor': 6,
  'deleteAuthor': 5,
  'addReview': 12,
  'deleteReview': 5,
  'addUser': 10,
  'deleteUser': 8,
  'addBooks': 25, // Batch operation
  'promoteUserToAdmin': 15,
  'login': 20,
  'register': 25,
  'deleteUserAdmin': 15,
  'promoteUserToRole': 12,

  // Subscriptions (medium complexity)
  'bookAdded': 10,
  'reviewAdded': 12,
  'bookUpdated': 8
};

/**
 * Configuration options for query complexity analysis
 */
export const complexityAnalysisConfig = {
  maxComplexity: DEFAULT_MAX_COMPLEXITY,
  fieldComplexities: DEFAULT_FIELD_COMPLEXITIES,
  introspectionComplexity: DEFAULT_INTROSPECTION_COMPLEXITY,
  enabled: true,
  // Multipliers for different scenarios
  multipliers: {
    list: 2,           // Multiply complexity for list fields
    nested: 1.5,       // Multiply complexity for nested fields
    argument: 1.2,     // Multiply complexity when arguments are used
    alias: 1.1         // Small penalty for aliases
  },
  // Custom error messages
  messages: {
    complexityExceeded: (score, max) => 
      `Query rejected: Complexity score too high (${score}). Maximum allowed: ${max}`,
    complexityAnalysis: 'Query complexity analysis failed'
  }
};

/**
 * Calculates the complexity score for a GraphQL query
 * @param {Object} query - The GraphQL query AST
 * @param {Object} config - Configuration options
 * @returns {Object} Complexity analysis results
 */
function analyzeQueryComplexity(query, config = complexityAnalysisConfig) {
  let totalComplexity = 0;
  let fieldBreakdown = [];
  let maxDepth = 0;
  let currentDepth = 0;
  const fieldCounts = {};

  // Visitor pattern to traverse the GraphQL AST
  const visitor = {
    Field: {
      enter(node, key, parent, path, ancestors) {
        currentDepth++;
        maxDepth = Math.max(maxDepth, currentDepth);

        const fieldName = node.name.value;
        const isIntrospection = fieldName.startsWith('__');
        
        // Get base complexity for this field
        let fieldComplexity = isIntrospection 
          ? config.introspectionComplexity 
          : (config.fieldComplexities[fieldName] || 5); // Default complexity if not defined

        // Apply multipliers based on context
        let multiplier = 1;
        
        // Check if this is a list field (heuristic: plural names or known list fields)
        const isListField = fieldName.endsWith('s') || 
                           ['books', 'authors', 'users', 'reviews'].includes(fieldName) ||
                           fieldName.includes('ByGenre') || 
                           fieldName.includes('ByAuthor') ||
                           fieldName.includes('ByBook') ||
                           fieldName.includes('ByUser');
        
        if (isListField) {
          multiplier *= config.multipliers.list;
        }

        // Apply nesting multiplier based on depth
        if (currentDepth > 2) {
          multiplier *= Math.pow(config.multipliers.nested, currentDepth - 2);
        }

        // Apply argument multiplier if field has arguments
        if (node.arguments && node.arguments.length > 0) {
          multiplier *= config.multipliers.argument;
          
          // Additional complexity for pagination arguments
          const hasLimit = node.arguments.some(arg => 
            arg.name.value === 'limit' || arg.name.value === 'first'
          );
          if (hasLimit) {
            const limitArg = node.arguments.find(arg => 
              arg.name.value === 'limit' || arg.name.value === 'first'
            );
            if (limitArg && limitArg.value.kind === 'IntValue') {
              const limitValue = parseInt(limitArg.value.value);
              multiplier *= Math.min(limitValue / 10, 5); // Cap the multiplier at 5x
            }
          }
        }

        // Apply alias multiplier if field is aliased
        if (node.alias) {
          multiplier *= config.multipliers.alias;
        }

        const finalComplexity = Math.ceil(fieldComplexity * multiplier);
        totalComplexity += finalComplexity;

        // Track field usage
        fieldCounts[fieldName] = (fieldCounts[fieldName] || 0) + 1;

        // Add to breakdown for debugging
        fieldBreakdown.push({
          field: fieldName,
          alias: node.alias?.value,
          baseComplexity: fieldComplexity,
          multiplier: multiplier.toFixed(2),
          finalComplexity,
          depth: currentDepth,
          hasArguments: node.arguments?.length > 0,
          argumentCount: node.arguments?.length || 0
        });
      },
      leave() {
        currentDepth--;
      }
    }
  };

  // Visit the query AST
  visit(query, visitor);

  // Additional complexity penalties
  let penalties = 0;

  // Penalty for excessive field repetition
  Object.entries(fieldCounts).forEach(([field, count]) => {
    if (count > 3) {
      penalties += (count - 3) * 10; // 10 points penalty per excessive repetition
    }
  });

  // Penalty for excessive depth
  if (maxDepth > 5) {
    penalties += (maxDepth - 5) * 20; // 20 points penalty per excessive depth level
  }

  const finalComplexity = totalComplexity + penalties;

  return {
    complexity: finalComplexity,
    baseComplexity: totalComplexity,
    penalties,
    maxDepth,
    fieldCount: fieldBreakdown.length,
    fieldBreakdown,
    fieldCounts,
    isExceeded: finalComplexity > config.maxComplexity,
    analysis: {
      mostExpensiveFields: fieldBreakdown
        .sort((a, b) => b.finalComplexity - a.finalComplexity)
        .slice(0, 5),
      totalFields: fieldBreakdown.length,
      uniqueFields: Object.keys(fieldCounts).length,
      averageFieldComplexity: Math.round(totalComplexity / fieldBreakdown.length) || 0
    }
  };
}

/**
 * Apollo Server plugin for query complexity analysis
 * @param {Object} options - Plugin configuration options
 * @returns {Object} Apollo Server plugin
 */
export function createQueryComplexityPlugin(options = {}) {
  const config = { ...complexityAnalysisConfig, mode: 'auto', ...options };

  return {
    requestDidStart() {
      return {
        didResolveOperation({ request, document, contextValue }) {
          // Strict demo mode gating: only run when demoMode === 'complexity'
          if (!contextValue?.demoMode || contextValue.demoMode !== 'complexity') {
            return;
          }
          if (!config.enabled) return;

          try {
            // Determine mode: manual | package | auto (default)
            const headerMode = contextValue?.complexityMode;
            const mode = (headerMode === 'manual' || headerMode === 'package') ? headerMode : config.mode;

            // If mode is 'package', skip this custom analysis
            if (mode === 'package') return;

            // Analyze each operation in the document
            for (const definition of document.definitions) {
              if (definition.kind === 'OperationDefinition') {
                const analysis = analyzeQueryComplexity(definition, config);

                // Log analysis for monitoring
                console.log('📊 Complexity Analysis:', {
                  operation: definition.operation,
                  operationName: definition.name?.value || 'Anonymous',
                  complexity: analysis.complexity,
                  maxAllowed: config.maxComplexity,
                  fieldCount: analysis.fieldCount,
                  maxDepth: analysis.maxDepth,
                  isExceeded: analysis.isExceeded
                });

                // Log top expensive fields for debugging
                if (analysis.analysis.mostExpensiveFields.length > 0) {
                  console.log('🔥 Most Expensive Fields:', 
                    analysis.analysis.mostExpensiveFields.map(f => 
                      `${f.field}: ${f.finalComplexity}`
                    ).join(', ')
                  );
                }

                // Check for complexity violation
                if (analysis.isExceeded) {
                  throw new GraphQLError(
                    config.messages.complexityExceeded(analysis.complexity, config.maxComplexity),
                    {
                      extensions: {
                        code: 'QUERY_COMPLEXITY_TOO_HIGH',
                        complexity: analysis.complexity,
                        maxAllowed: config.maxComplexity,
                        baseComplexity: analysis.baseComplexity,
                        penalties: analysis.penalties,
                        analysis: {
                          fieldCount: analysis.fieldCount,
                          maxDepth: analysis.maxDepth,
                          mostExpensiveFields: analysis.analysis.mostExpensiveFields,
                          fieldBreakdown: analysis.fieldBreakdown.slice(0, 10) // Limit for response size
                        }
                      }
                    }
                  );
                }

                // Warn about queries approaching the limit
                const warningThreshold = config.maxComplexity * 0.8; // 80% of max
                if (analysis.complexity > warningThreshold) {
                  console.warn(`⚠️  Query complexity approaching limit: ${analysis.complexity}/${config.maxComplexity}`);
                }
              }
            }
          } catch (error) {
            // Re-throw GraphQL errors
            if (error instanceof GraphQLError) {
              throw error;
            }
            
            // Log unexpected errors
            console.error('Error in query complexity analysis:', error);
            
            // Don't block the query for unexpected errors in production
            if (process.env.NODE_ENV === 'production') {
              console.warn('Query complexity analysis failed, allowing query to proceed');
            } else {
              throw new GraphQLError(config.messages.complexityAnalysis);
            }
          }
        }
      };
    }
  };
}

/**
 * Utility function to validate a query string for complexity
 * Useful for client-side validation or testing
 */
export function validateQueryComplexity(queryString, options = {}) {
  const config = { ...complexityAnalysisConfig, ...options };
  
  try {
    const { parse } = require('graphql');
    const document = parse(queryString);
    
    for (const definition of document.definitions) {
      if (definition.kind === 'OperationDefinition') {
        return analyzeQueryComplexity(definition, config);
      }
    }
    
    return { complexity: 0, isExceeded: false };
  } catch (error) {
    return { 
      error: error.message, 
      complexity: 0,
      isExceeded: false 
    };
  }
}

/**
 * Helper function to estimate complexity for a field based on its characteristics
 * @param {string} fieldName - Name of the field
 * @param {Object} fieldConfig - Field configuration
 * @returns {number} Estimated complexity score
 */
export function estimateFieldComplexity(fieldName, fieldConfig = {}) {
  const {
    isList = false,
    hasArguments = false,
    isRelation = false,
    isComputed = false,
    isExpensive = false
  } = fieldConfig;

  let baseComplexity = 1;

  if (isExpensive) baseComplexity = 100;
  else if (isComputed) baseComplexity = 50;
  else if (isRelation) baseComplexity = 10;
  else if (isList) baseComplexity = 15;
  else if (hasArguments) baseComplexity = 5;

  return baseComplexity;
}

export default createQueryComplexityPlugin;

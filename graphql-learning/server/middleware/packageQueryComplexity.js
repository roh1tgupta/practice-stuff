import { getComplexity, fieldExtensionsEstimator, simpleEstimator } from 'graphql-query-complexity';

/**
 * Package-based Query Complexity Plugin (using graphql-query-complexity)
 *
 * Options:
 * - schema: GraphQLSchema (required)
 * - maxComplexity: number (default: 1000)
 * - warnThreshold: number (default: 800)
 */
export function createPackageQueryComplexityPlugin({ schema, maxComplexity = 1000, warnThreshold = 800 } = {}) {
  if (!schema) {
    throw new Error('createPackageQueryComplexityPlugin requires a GraphQL schema');
  }

  return {
    async requestDidStart() {
      return {
        async didResolveOperation({ request, document, contextValue }) {
          // Strict demo mode gating: only run when demoMode === 'complexity'
          if (!contextValue?.demoMode || contextValue.demoMode !== 'complexity') {
            return;
          }
          const mode = contextValue?.complexityMode;
          // Run package analyzer when explicitly selected or when auto (header absent)
          const shouldRun = mode === 'package' || !mode; // auto => no header
          if (!shouldRun) return;

          const complexity = getComplexity({
            schema,
            query: document,
            variables: request.variables,
            operationName: request.operationName,
            estimators: [
              fieldExtensionsEstimator(),
              simpleEstimator({ defaultComplexity: 1 })
            ],
          });

          if (complexity > maxComplexity) {
            throw new Error(`Query rejected: Complexity score too high (${complexity}). Maximum allowed: ${maxComplexity}`);
          }
          if (complexity > warnThreshold) {
            console.warn(`⚠️  [Package] Query complexity approaching limit: ${complexity}/${maxComplexity}`);
          }
        }
      };
    }
  };
}

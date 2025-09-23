import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { sha256 } from 'crypto-hash';

// Create an HTTP link for queries and mutations
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

// Create authentication link that automatically adds headers
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from localStorage
  const token = localStorage.getItem('authToken');
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      // Add any future headers here centrally
      'x-client-version': '1.0.0',
    }
  };
});

// Create persisted query link for performance optimization
const persistedQueriesLink = createPersistedQueryLink({
  sha256,
  useGETForHashedQueries: false, // Use POST for both - easier to debug
  disable: ({ operationName, variables, query, context }) => {
    // Allow dynamic enabling/disabling based on localStorage flag
    const isDisabled = localStorage.getItem('disablePersistedQueries') === 'true';
    console.log('🔍 Persisted Query Link Check:', {
      disabled: isDisabled,
      queryLength: query?.length,
      operationName,
      hasContext: !!context
    });
    return isDisabled;
  }
});

// Create a WebSocket link for subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/graphql',
    connectionParams: {
      // If authorization needed for WebSocket connections, uncomment below:
      // const token = localStorage.getItem('authToken');
      // return {
      //   authorization: token ? `Bearer ${token}` : "",
      // };
    },
  }),
);

// Split links based on operation type
// Use WebSocket for subscriptions and HTTP for queries and mutations
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

// Create and export the Apollo Client
const client = new ApolloClient({
  // link: splitLink, -> Open GraphQL API, no auth needed
  
// Purpose: Adds authentication headers to HTTP requests and persisted queries optimization
// How it works:
// authLink (lines 14-27) automatically adds authorization: Bearer ${token} header
// persistedQueriesLink (lines 30-37) handles query caching and hash generation
// Applied to all HTTP GraphQL queries and mutations
// Runs before the request goes to the server
  link: authLink.concat(persistedQueriesLink).concat(splitLink), // Chain auth -> persisted queries -> split link
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          books: {
            merge(existing = [], incoming) {
              return [...incoming];
            },
          },
          authors: {
            merge(existing = [], incoming) {
              return [...incoming];
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export default client;

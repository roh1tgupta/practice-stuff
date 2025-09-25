import { ApolloClient, InMemoryCache, HttpLink, split, ApolloLink, makeVar } from '@apollo/client';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { sha256 } from 'crypto-hash';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

// Create an HTTP link for queries and mutations
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql', // Make sure this matches server endpoint
});


// Reactive var mailbox for extensions so components can reliably read the latest response extensions
export const lastExtensionsVar = makeVar(null);

// Link to write into the mailbox 
const extensionsMailboxLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    if (response && response.extensions) {
      lastExtensionsVar(response.extensions);
    }
    return response;
  });
});

// Create persisted query link
// Enable only when:
//  - The operation explicitly sets context.headers['x-demo-mode'] === 'persisted'
//  - AND the global localStorage flag does not disable it
const persistedQueriesLink = createPersistedQueryLink({
  sha256,
  useGETForHashedQueries: false,
  disable: (operation) => {
    const globallyDisabled = localStorage.getItem('disablePersistedQueries') === 'true';
    const demoMode = operation?.getContext?.()?.headers?.['x-demo-mode'];
    const isPersistedDemo = demoMode === 'persisted';
    // Disable when globally disabled OR not explicitly in persisted demo
    return globallyDisabled || !isPersistedDemo;
  }
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
  link: authLink
    .concat(extensionsMailboxLink)
    .concat(persistedQueriesLink)
    .concat(splitLink), // Chain auth -> debug -> mailbox -> persisted queries -> split link
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
      includeExtensions: true,
    },
    query: {
      includeExtensions: true,
    },
  },
});

export default client;

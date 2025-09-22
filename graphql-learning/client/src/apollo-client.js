import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

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
  
// Purpose: Adds authentication headers to HTTP requests
// How it works:
// authLink (lines 13-25) automatically adds authorization: Bearer ${token} header
// Applied to all HTTP GraphQL queries and mutations
// Runs before the request goes to the server
  link: authLink.concat(splitLink), // Chain auth link before split link
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

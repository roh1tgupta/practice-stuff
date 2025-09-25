import { ApolloClient, InMemoryCache, HttpLink, split, ApolloLink, makeVar } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
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

// Swallow expected APQ handshake errors ONLY for APQ demo operations
const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  const ctx = operation?.getContext ? operation.getContext() : {};
  const isPersistedCtx = ctx.persistedDemo === true ||
    ctx.headers?.['x-demo-mode'] === 'persisted' ||
    ctx.headers?.['X-Demo-Mode'] === 'persisted';

  if (!isPersistedCtx) return; // do not suppress for non-APQ contexts

  // Ignore the first handshake GraphQL error
  if (graphQLErrors && graphQLErrors.length) {
    const hasPersistedNF = graphQLErrors.some(
      (e) => e?.extensions?.code === 'PERSISTED_QUERY_NOT_FOUND'
    );
    if (hasPersistedNF) return;
  }

  // Ignore aborts triggered by the APQ retry
  if (networkError) {
    const name = networkError.name || '';
    const message = networkError.message || '';
    if (name === 'AbortError' || message.toLowerCase().includes('aborted')) {
      return;
    }
  }
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

// Base persisted query link (disabled by default; gating done via split below)
const persistedQueriesLink = createPersistedQueryLink({
  sha256,
  useGETForHashedQueries: false,
});


// apqEnabledLink is created with ApolloLink.split(predicate, ifTrueLink, ifFalseLink).
// Gate APQ via ApolloLink.split so we can reliably access operation.getContext()
const apqEnabledLink = ApolloLink.split(
  (operation) => {
    const ctx = operation.getContext ? operation.getContext() : {};
    const globallyDisabled = localStorage.getItem('disablePersistedQueries') === 'true';
    if (globallyDisabled) return false;
    const isPersistedDemoFlag = ctx.persistedDemo === true;
    const headerDemoMode = ctx.headers?.['x-demo-mode'] || ctx.headers?.['X-Demo-Mode'];
    const isPersistedDemoHeader = headerDemoMode === 'persisted';

    return isPersistedDemoFlag || isPersistedDemoHeader;
  },
  // If predicate true => route through APQ link, else just pass through
  persistedQueriesLink,
  new ApolloLink((operation, forward) => forward(operation))
);

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
    .concat(errorLink)
    .concat(apqEnabledLink)
    .concat(splitLink), // Chain auth -> mailbox -> apq gate -> split link
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
    // query: affects one-off calls like apolloClient.query(...)
// watchQuery: affects “watched” queries (useQuery, cache observers) that re-render on cache changes
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      includeExtensions: true,
      // Do not throw on GraphQL errors so APQ handshake errors don't trigger React overlay
      errorPolicy: 'all',
    },
    query: {
      includeExtensions: true,
      // Do not throw on GraphQL errors so APQ handshake errors don't trigger React overlay
      errorPolicy: 'all',

      // set errorPolicy: 'all' so GraphQL errors don’t throw globally; they’re delivered in result.errors to your components without triggering the dev overlay.
    },
  },
});

export default client;

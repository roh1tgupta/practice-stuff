useQuery returns { data, loading, error, refetch, networkStatus, fetchMore, variables, called }.

  // To refetch the query every 5 minutes (300,000 ms), use the pollInterval option in the useQuery hook:
// const { loading: loadingBooks, error: errorBooks, data: booksData } = useQuery(GET_BOOKS, {
//   pollInterval: 300000, // 5 minutes in milliseconds
// });

// Here are common options you can pass to the second argument of useQuery in Apollo Client, along with their purposes:
// variables:
// Pass variables for your query.
// Example: { variables: { id: '123' } }

// fetchPolicy:
// Controls how Apollo fetches and caches data.
// Common values: 'cache-first', 'network-only', 'cache-and-network', 'no-cache'.
// Available fetchPolicy Values
// cache-first (default)

// Checks cache first. If data is found, uses it; otherwise, fetches from network.
// Best for: Fast UI, minimal network requests.

// network-only
// Always fetches from network, ignores cache.
// Best for: Always fresh data, real-time updates.

// cache-and-network
// Returns cached data immediately (if available), then fetches from network and updates cache/UI.
// Best for: Fast UI with background refresh.

// cache-only
// Only reads from cache, never fetches from network.
// Best for: Offline mode, or when you know data is already cached.

// no-cache
// Always fetches from network, does not store result in cache.
// Best for: Sensitive data, or when you don’t want to cache results.

// standby
// Query is not executed unless refetched manually.
// Best for: Pausing queries until needed.

// network-only
// Always fetches data from the network (server).
// Stores the result in Apollo’s cache.
// Subsequent queries can use cached data if fetch policy changes.
// no-cache
// Always fetches data from the network (server).
// Does NOT store the result in Apollo’s cache.
// Data is not available for future queries or cache reads.
// If you execute a query with fetchPolicy: 'network-only', Apollo Client will:

// Fetch data from the network (server).
// Store the result in its cache.
// If you later run the same query (with the same variables) but change the fetchPolicy to something like 'cache-first':

// Apollo will first check the cache for data.
// If the data is present (from the previous network-only fetch), it will use the cached data instead of making a new network request.


// pollInterval:
// Refetches the query at the specified interval (in ms).

// skip:
// If true, the query will not run.
// The skip option in useQuery is used to conditionally prevent a query from running.
// like if You only want to run the query when a variable (like id) is available
// or You want to fetch data only after a user clicks a button or completes a form:

// onCompleted:
// Callback when the query successfully completes.

// onError:
// Callback when the query encounters an error.

// notifyOnNetworkStatusChange:
// If true, component will re-render on network status changes.
// If notifyOnNetworkStatusChange: true, your component will re-render whenever the query’s networkStatus changes (not just when loading or data changes).
// This is useful for showing loading indicators or UI updates during refetches, pagination, or polling.

// networkStatus is a number that represents the current state of the query’s network request (e.g., loading, refetching, polling, etc.).
// You can use it to show different UI states (like a spinner during refetch or pagination).
// const { data, loading, error, networkStatus } = useQuery(GET_BOOKS);
// The networkStatus value returned by Apollo Client’s useQuery is a number representing the current state of the query. Here are the possible values:

// Value	Meaning
// 1	Loading
// 2	SetVariables
// 3	FetchMore
// 4	Refetch
// 5	Poll
// 6	Ready (query complete)
// 7	Error

// context:
// Pass custom context to the link chain (e.g., for headers).

// errorPolicy:
// How errors are handled: 'none', 'ignore', 'all'.
// errorPolicy is an option you can pass to Apollo Client’s useQuery or useMutation to control how errors are handled in the response.

// Possible Values:
// none (default for queries)

// If there is a GraphQL error, data will be undefined and the error will be in the error field.
// The query/mutation is considered failed.
// ignore

// Ignores GraphQL errors and still returns any available data in the data field.
// The error field will be undefined.
// all

// Returns both partial data and any errors in the error field.
// Useful if you want to display partial results and handle errors at the same time.

// useQuery(GET_BOOKS, {
//   variables: { genre: 'Fiction' },
//   fetchPolicy: 'network-only',
//   pollInterval: 300000,
//   skip: false,
//   onCompleted: (data) => { /* ... */ },
//   onError: (error) => { /* ... */ },
//   notifyOnNetworkStatusChange: true,
//   context: { headers: { authorization: 'Bearer token' } },
//   errorPolicy: 'all',
// });



  // below is to run the query on demand (not on component load), call getBooks() to execute
  // const [getBooks, { data, loading, error }] = useLazyQuery(GET_BOOKS);











useMutation Returns a tuple: [mutateFunction, resultObject].
You call mutateFunction({ variables, ... }) to execute the mutation.
The mutation runs and updates the result object (data, loading, error, etc.).




Common Options for useMutation
variables
Default variables for the mutation.

onCompleted
Callback when the mutation succeeds.

onError
Callback when the mutation fails.

refetchQueries
Array of queries to refetch after mutation completes.

update
Function to manually update the Apollo cache after mutation.
After a mutation runs, you can use the update option to write custom logic that directly modifies Apollo Client’s cache.
This is useful when you want to immediately reflect changes in your UI without waiting for a refetch.
eg:
const [addBook] = useMutation(ADD_BOOK, {
  update: (cache, { data: { addBook } }) => {
    // Read the current list of books from the cache
    const existingBooks = cache.readQuery({ query: GET_BOOKS });
    // Add the new book to the list
    cache.writeQuery({
      query: GET_BOOKS,
      data: { books: [...existingBooks.books, addBook] },
    });
  },
});
Apollo Client’s cache object (usually an instance of InMemoryCache) exposes several useful methods for reading, writing, and modifying cached data:
Common Cache Methods
readQuery
Reads data for a specific query from the cache.
-----------------------------------------------
writeQuery
Writes data for a specific query to the cache.
-----------------------------------------------
readFragment
Reads a fragment of data from the cache.
-----------------------------------------------
writeFragment
Writes a fragment of data to the cache.
-----------------------------------------------
evict
Removes specific data from the cache.
-----------------------------------------------
modify
Directly modifies cached fields for a specific object.
-----------------------------------------------
reset
Clears the entire cache.
-----------------------------------------------
restore
Replaces the cache contents with a new set of data.
-----------------------------------------------
extract
Returns the current contents of the cache as a plain object.
-----------------------------------------------
cache.readQuery({ query: GET_BOOKS });
cache.writeQuery({ query: GET_BOOKS, data: { books: [...] } });
cache.readFragment({ id: 'Book:1', fragment: BOOK_FRAGMENT });
cache.writeFragment({ id: 'Book:1', fragment: BOOK_FRAGMENT, data: {...} });
cache.evict({ id: 'Book:1' });
cache.modify({ id: 'Book:1', fields: { name(existing) { return 'New Name'; } } });
cache.reset();
cache.restore(initialData);
const currentCache = cache.extract();




optimisticResponse
Provide a temporary response for instant UI updates before the server responds.

context
Pass custom context (e.g., headers) to the mutation.

errorPolicy
How errors are handled: 'none', 'ignore', 'all'.


const [addAuthor, { data, loading, error }] = useMutation(ADD_AUTHOR, {
  variables: { author: newAuthor },
  onCompleted: () => { /* ... */ },
  onError: (error) => { /* ... */ },
  refetchQueries: [{ query: GET_AUTHORS }],
  update: (cache, result) => { /* ... */ },
  optimisticResponse: { /* ... */ },
  context: { /* ... */ },
  errorPolicy: 'all',
});


-----------------------------------------------
const { 
  data,
  loading,
  error,
  variables,
  called,
  subscribeToMore,
  unsubscribe  // <-- This function lets you manually unsubscribe
} = useSubscription(SUBSCRIPTION_DOCUMENT);

data: The subscription result data.
loading: Boolean, true until the first response is received.
error: Any errors that occurred.

------------------------------------------------------------
loading is typically only true briefly when the page first mounts while the WebSocket connection is being established.
--------------------------------------------------
Once the subscription connection is active, loading stays false regardless of whether any subscription events have been received.
----------------------------------
The subscription continues listening for events indefinitely until the component unmounts or the connection is closed.
------------------------------------------------------------



Parameters for [useSubscription]:
useSubscription(
  subscriptionDocument,  // Required: GraphQL subscription document
  {
    variables,           // Optional: Variables for the subscription
    onSubscriptionData,  // Optional: Function called when new data arrives
    onSubscriptionComplete, // Optional: Function called when subscription completes
    fetchPolicy,         // Optional: How to merge subscription results
    shouldResubscribe,   // Optional: Boolean or function to determine if subscription should restart
    client              // Optional: ApolloClient instance
  }
);

-----------------------------------------------------------------------------------
diff between using onSubscriptionData and data returned by useSubscription:

If you only use the onSubscriptionData callback and don't access the data property from useSubscription, your component won't automatically re-render when new subscription data arrives.

Here's how it works:
When you access data in your component, React creates a dependency on that value
When new subscription data arrives, the data value changes
This triggers a re-render of your component
But if you only use onSubscriptionData:

The callback runs when new data arrives
React doesn't know about this new data unless you update state
The component doesn't automatically re-render
This pattern is useful when you want to:

Handle incoming subscription data without re-rendering
Manually control when/if to update the UI
Process subscription data but only update specific parts of your app
-----------------------------------------------------------------------------------

Purpose of client in useSubscription Options
The client parameter in useSubscription allows you to specify which Apollo Client instance to use for the subscription.
When is this useful?
Multiple Apollo Clients
If your app uses multiple Apollo Client instances (perhaps connecting to different GraphQL endpoints), you can specify which client should handle a particular subscription.
Testing
You can pass a mock client for testing components that use subscriptions.
Dynamic Client Selection
You might need to change which client to use at runtime based on user preferences or other conditions.
Most applications use a single Apollo Client instance provided through ApolloProvider at the app root, so this parameter is often omitted.




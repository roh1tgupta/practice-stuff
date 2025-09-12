import { gql } from '@apollo/client';

// Basic fragments for reuse
export const BOOK_BASIC_FRAGMENT = gql`
  fragment BookBasicFields on Book {
    id
    name
    genre
  }
`;

export const AUTHOR_BASIC_FRAGMENT = gql`
  fragment AuthorBasicFields on Author {
    id
    name
  }
`;

export const AUTHOR_DETAILS_FRAGMENT = gql`
  fragment AuthorDetailFields on Author {
    id
    name
    age
    country
  }
`;

export const REVIEW_BASIC_FRAGMENT = gql`
  fragment ReviewBasicFields on Review {
    id
    rating
    comment
  }
`;

// In the GraphQL query you're highlighting, ${BOOK_BASIC_FRAGMENT} is a crucial part of using fragments in GraphQL with Apollo Client.

// When you use a fragment in a GraphQL query with Apollo Client, you need to:

// First reference the fragment in your query with the spread operator (...FragmentName)
// Then include the actual fragment definition with ${FRAGMENT_NAME} at the end of your template literal
// The line ${BOOK_BASIC_FRAGMENT} is necessary because:

// It tells Apollo Client where to find the definition of the BookBasicFields fragment that you're using in your query
// At runtime, Apollo Client will replace this reference with the actual fragment definition
// Without it, Apollo wouldn't know what fields ...BookBasicFields refers to

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      ...BookBasicFields
      author {
        id
        name
      }
    }
  }
  ${BOOK_BASIC_FRAGMENT}
`;

// $id: ID! declares a variable named id of type ID (non-null).
export const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      ...BookBasicFields
      author {
        ...AuthorDetailFields
      }
      reviews {
        ...ReviewBasicFields
        user {
          username
        }
      }
    }
  }
  ${BOOK_BASIC_FRAGMENT}
  ${AUTHOR_DETAILS_FRAGMENT}
  ${REVIEW_BASIC_FRAGMENT}
`;

export const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      ...AuthorDetailFields
      books {
        id
        name
      }
    }
  }
  ${AUTHOR_DETAILS_FRAGMENT}
`;

export const GET_AUTHOR = gql`
  query GetAuthor($id: ID!) {
    author(id: $id) {
      ...AuthorDetailFields
      books {
        ...BookBasicFields
      }
    }
  }
  ${AUTHOR_DETAILS_FRAGMENT}
  ${BOOK_BASIC_FRAGMENT}
`;

// Advanced queries
export const GET_BOOKS_BY_GENRE = gql`
  query GetBooksByGenre($genre: String!) {
    booksByGenre(genre: $genre) {
      ...BookBasicFields
      author {
        ...AuthorBasicFields
      }
    }
  }
  ${BOOK_BASIC_FRAGMENT}
  ${AUTHOR_BASIC_FRAGMENT}
`;

export const GET_BOOKS_BY_AUTHOR = gql`
  query GetBooksByAuthor($authorId: ID!) {
    booksByAuthor(authorId: $authorId) {
      ...BookBasicFields
    }
  }
  ${BOOK_BASIC_FRAGMENT}
`;

// BookFilter is defined in GraphQL server schema as an input type.
export const GET_FILTERED_BOOKS = gql`
  query GetFilteredBooks($filter: BookFilter) {
    filteredBooks(filter: $filter) {
      ...BookBasicFields
      author {
        ...AuthorBasicFields
      }
    }
  }
  ${BOOK_BASIC_FRAGMENT}
  ${AUTHOR_BASIC_FRAGMENT}
`;

export const GET_PAGINATED_BOOKS = gql`
  query GetPaginatedBooks(
    $pagination: PaginationInput
    $filter: BookFilter
    $order: BookOrderInput
  ) {
    paginatedBooks(
      pagination: $pagination
      filter: $filter
      order: $order
    ) {
      books {
        ...BookBasicFields
        author {
          ...AuthorBasicFields
        }
      }
      totalCount
      hasNextPage
    }
  }
  ${BOOK_BASIC_FRAGMENT}
  ${AUTHOR_BASIC_FRAGMENT}
`;

export const SEARCH_BOOKS = gql`
  query SearchBooks($query: String!) {
    searchBooks(query: $query) {
      ...BookBasicFields
      author {
        ...AuthorBasicFields
      }
    }
  }
  ${BOOK_BASIC_FRAGMENT}
  ${AUTHOR_BASIC_FRAGMENT}
`;

export const GET_AUTHOR_STATS = gql`
  query GetAuthorStats($id: ID!) {
    authorStatistics(id: $id) {
      totalBooks
      averageBookRating
      mostPopularGenre
    }
    author(id: $id) {
      name
    }
  }
`;

// Mutations
export const ADD_BOOK = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      ...BookBasicFields
    }
  }
  ${BOOK_BASIC_FRAGMENT}
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $book: UpdateBookInput!) {
    updateBook(id: $id, book: $book) {
      ...BookBasicFields
      author {
        ...AuthorBasicFields
      }
    }
  }
  ${BOOK_BASIC_FRAGMENT}
  ${AUTHOR_BASIC_FRAGMENT}
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`;

export const ADD_AUTHOR = gql`
  mutation AddAuthor($name: String!, $age: Int!, $country: String) {
    addAuthor(name: $name, age: $age, country: $country) {
      ...AuthorDetailFields
    }
  }
  ${AUTHOR_DETAILS_FRAGMENT}
`;

export const ADD_REVIEW = gql`
  mutation AddReview($review: ReviewInput!) {
    addReview(review: $review) {
      ...ReviewBasicFields
      book {
        id
        name
      }
      user {
        id
        username
      }
    }
  }
  ${REVIEW_BASIC_FRAGMENT}
`;

// Subscriptions
export const BOOK_ADDED_SUBSCRIPTION = gql`
  subscription BookAdded {
    bookAdded {
      ...BookBasicFields
      author {
        ...AuthorBasicFields
      }
    }
  }
  ${BOOK_BASIC_FRAGMENT}
  ${AUTHOR_BASIC_FRAGMENT}
`;

export const REVIEW_ADDED_SUBSCRIPTION = gql`
  subscription ReviewAdded {
    reviewAdded {
      ...ReviewBasicFields
      book {
        id
        name
      }
      user {
        id
        username
      }
    }
  }
  ${REVIEW_BASIC_FRAGMENT}
`;

export const BOOK_UPDATED_SUBSCRIPTION = gql`
  subscription BookUpdated {
    bookUpdated {
      ...BookBasicFields
      author {
        ...AuthorBasicFields
      }
    }
  }
  ${BOOK_BASIC_FRAGMENT}
  ${AUTHOR_BASIC_FRAGMENT}
`;

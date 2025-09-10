import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      name
      genre
      author {
        id
        name
      }
    }
  }
`;

// $id: ID! declares a variable named id of type ID (non-null).
export const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        country
      }
      reviews {
        id
        rating
        comment
        user {
          username
        }
      }
    }
  }
`;

export const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      id
      name
      age
      country
      books {
        id
        name
      }
    }
  }
`;

export const GET_AUTHOR = gql`
  query GetAuthor($id: ID!) {
    author(id: $id) {
      id
      name
      age
      country
      books {
        id
        name
        genre
      }
    }
  }
`;

// Advanced queries
export const GET_BOOKS_BY_GENRE = gql`
  query GetBooksByGenre($genre: String!) {
    booksByGenre(genre: $genre) {
      id
      name
      author {
        id
        name
      }
    }
  }
`;

export const GET_BOOKS_BY_AUTHOR = gql`
  query GetBooksByAuthor($authorId: ID!) {
    booksByAuthor(authorId: $authorId) {
      id
      name
      genre
    }
  }
`;

// BookFilter is defined in GraphQL server schema as an input type.
export const GET_FILTERED_BOOKS = gql`
  query GetFilteredBooks($filter: BookFilter) {
    filteredBooks(filter: $filter) {
      id
      name
      genre
      author {
        id
        name
      }
    }
  }
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
        id
        name
        genre
        author {
          id
          name
        }
      }
      totalCount
      hasNextPage
    }
  }
`;

export const SEARCH_BOOKS = gql`
  query SearchBooks($query: String!) {
    searchBooks(query: $query) {
      id
      name
      genre
      author {
        id
        name
      }
    }
  }
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
  mutation AddBook($book: BookInput!) {
    addBook(book: $book) {
      id
      name
      genre
      author {
        id
        name
      }
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $book: UpdateBookInput!) {
    updateBook(id: $id, book: $book) {
      id
      name
      genre
      author {
        id
        name
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`;

export const ADD_AUTHOR = gql`
  mutation AddAuthor($author: AuthorInput!) {
    addAuthor(author: $author) {
      id
      name
      age
      country
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation AddReview($review: ReviewInput!) {
    addReview(review: $review) {
      id
      rating
      comment
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
`;

// Subscriptions
export const BOOK_ADDED_SUBSCRIPTION = gql`
  subscription BookAdded {
    bookAdded {
      id
      name
      genre
      author {
        id
        name
      }
    }
  }
`;

export const REVIEW_ADDED_SUBSCRIPTION = gql`
  subscription ReviewAdded {
    reviewAdded {
      id
      rating
      comment
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
`;

export const BOOK_UPDATED_SUBSCRIPTION = gql`
  subscription BookUpdated {
    bookUpdated {
      id
      name
      genre
      author {
        id
        name
      }
    }
  }
`;

import { gql } from '@apollo/client';

// Simple queries for persisted query demo
export const SIMPLE_GET_BOOKS = gql`
  query SimpleGetBooks {
    books {
      id
      name
      genre
    }
  }
`;

export const SIMPLE_GET_AUTHORS = gql`
  query SimpleGetAuthors {
    authors {
      id
      name
      country
    }
  }
`;

// Medium complexity queries
export const MEDIUM_BOOKS_WITH_AUTHORS = gql`
  query MediumBooksWithAuthors {
    books {
      id
      name
      genre
      author {
        id
        name
        age
        country
      }
    }
  }
`;

export const MEDIUM_AUTHORS_WITH_BOOKS = gql`
  query MediumAuthorsWithBooks {
    authors {
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

// Complex queries for demonstrating maximum benefit
export const COMPLEX_PAGINATED_BOOKS = gql`
  query ComplexPaginatedBooks($pagination: PaginationInput, $filter: BookFilter, $order: BookOrderInput) {
    paginatedBooks(pagination: $pagination, filter: $filter, order: $order) {
      books {
        id
        name
        genre
        author {
          id
          name
          age
          country
          books {
            id
            name
          }
        }
        reviews {
          id
          rating
          comment
          user {
            id
            username
            role
          }
        }
      }
      totalCount
      hasNextPage
    }
  }
`;

export const VERY_COMPLEX_AUTHOR_STATS = gql`
  query VeryComplexAuthorStats($id: ID!) {
    author(id: $id) {
      id
      name
      age
      country
      books {
        id
        name
        genre
        reviews {
          id
          rating
          comment
          createdAt
          user {
            id
            username
            email
            role
            reviews {
              id
              rating
              book {
                id
                name
                author {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
    authorStatistics(id: $id) {
      totalBooks
      averageBookRating
      mostPopularGenre
    }
  }
`;

export const EXTREMELY_COMPLEX_NESTED_QUERY = gql`
  query ExtremelyComplexNestedQuery {
    books {
      id
      name
      genre
      author {
        id
        name
        age
        country
        books {
          id
          name
          genre
          reviews {
            id
            rating
            comment
            createdAt
            user {
              id
              username
              email
              role
              reviews {
                id
                rating
                comment
                book {
                  id
                  name
                  genre
                  author {
                    id
                    name
                    country
                  }
                }
              }
            }
          }
        }
      }
      reviews {
        id
        rating
        comment
        createdAt
        user {
          id
          username
          email
          role
        }
        book {
          id
          name
          author {
            id
            name
          }
        }
      }
    }
    authors {
      id
      name
      age
      country
      books {
        id
        name
        reviews {
          id
          rating
          user {
            username
          }
        }
      }
    }
  }
`;

// Demo queries with fragments for better organization
export const BOOK_FULL_FRAGMENT = gql`
  fragment BookFullFields on Book {
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
        id
        username
      }
    }
  }
`;

export const DEMO_BOOKS_WITH_FRAGMENTS = gql`
  query DemoBooksWithFragments {
    books {
      ...BookFullFields
    }
  }
  ${BOOK_FULL_FRAGMENT}
`;

// Query size comparison examples
export const TINY_QUERY = gql`
  query TinyQuery {
    books {
      id
    }
  }
`;

export const LARGE_QUERY_FOR_DEMO = gql`
  query LargeQueryForDemo($filter: BookFilter, $pagination: PaginationInput, $order: BookOrderInput) {
    # This query demonstrates maximum payload reduction benefit
    paginatedBooks(pagination: $pagination, filter: $filter, order: $order) {
      books {
        id
        name
        genre
        author {
          id
          name
          age
          country
          books {
            id
            name
            genre
            reviews {
              id
              rating
              comment
              createdAt
              user {
                id
                username
                email
                role
              }
            }
          }
        }
        reviews {
          id
          rating
          comment
          createdAt
          user {
            id
            username
            email
            role
            reviews {
              id
              rating
              comment
              book {
                id
                name
                genre
              }
            }
          }
        }
      }
      totalCount
      hasNextPage
    }
    
    # Additional queries to increase payload size
    authors {
      id
      name
      age
      country
      books {
        id
        name
        genre
        reviews {
          id
          rating
          comment
          user {
            id
            username
          }
        }
      }
    }
    
    # Search functionality
    searchBooks(query: "fantasy") {
      id
      name
      genre
      author {
        id
        name
        country
      }
    }
  }
`;

// Export all queries for easy access
export const DEMO_QUERIES = {
  simple: [
    { name: 'Simple Books', query: SIMPLE_GET_BOOKS, variables: {} },
    { name: 'Simple Authors', query: SIMPLE_GET_AUTHORS, variables: {} }
  ],
  medium: [
    { name: 'Books with Authors', query: MEDIUM_BOOKS_WITH_AUTHORS, variables: {} },
    { name: 'Authors with Books', query: MEDIUM_AUTHORS_WITH_BOOKS, variables: {} }
  ],
  complex: [
    { 
      name: 'Paginated Books', 
      query: COMPLEX_PAGINATED_BOOKS, 
      variables: { 
        pagination: { page: 1, limit: 5 },
        filter: { genre: "Fantasy" },
        order: { field: "NAME", direction: "ASC" }
      }
    },
    { 
      name: 'Author Statistics', 
      query: VERY_COMPLEX_AUTHOR_STATS, 
      variables: { id: "1" }
    }
  ],
  extreme: [
    { name: 'Extremely Nested Query', query: EXTREMELY_COMPLEX_NESTED_QUERY, variables: {} },
    { 
      name: 'Large Demo Query', 
      query: LARGE_QUERY_FOR_DEMO, 
      variables: {
        filter: { genre: "Science Fiction" },
        pagination: { page: 1, limit: 10 },
        order: { field: "NAME", direction: "DESC" }
      }
    }
  ],
  fragments: [
    { name: 'Books with Fragments', query: DEMO_BOOKS_WITH_FRAGMENTS, variables: {} }
  ],
  comparison: [
    { name: 'Tiny Query (50 bytes)', query: TINY_QUERY, variables: {} },
    { name: 'Large Query (2KB+)', query: LARGE_QUERY_FOR_DEMO, variables: {} }
  ]
};

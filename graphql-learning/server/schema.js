// GraphQL schema definition
const typeDefs = `#graphql
  # Enum for user roles
  enum UserRole {
    ADMIN
    READER
    CRITIC
  }

  # Custom scalar types
  scalar Date

  # User type
  type User {
    id: ID!
    username: String!
    email: String!
    role: UserRole!
    reviews: [Review!]
  }

  # Book type
  type Book {
    id: ID!
    name: String!
    genre: String!
    author: Author!
    reviews: [Review!]
  }

  # Author type
  type Author {
    id: ID!
    name: String!
    age: Int
    country: String
    books: [Book!]
  }

  # Review type
  type Review {
    id: ID!
    user: User!
    book: Book!
    rating: Int!
    comment: String
    createdAt: String
  }

  # Input for creating a new book
  input BookInput {
    name: String!
    genre: String!
    authorId: ID!
  }

  # Input for updating a book
  input UpdateBookInput {
    name: String
    genre: String
    authorId: ID
  }

  # Input for creating a new author
  input AuthorInput {
    name: String!
    age: Int!
    country: String!
  }

  # Input for updating an author
  input UpdateAuthorInput {
    name: String
    age: Int
    country: String
  }

  # Input for creating a new review
  input ReviewInput {
    userId: ID!
    bookId: ID!
    rating: Int!
    comment: String
  }

  # Input for creating a new user
  input UserInput {
    username: String!
    email: String!
    role: UserRole!
  }

  # Book filter input
  input BookFilter {
    genre: String
    authorId: ID
  }

  # Pagination input
  input PaginationInput {
    page: Int! = 1
    limit: Int! = 10
  }

  # Book ordering input
  input BookOrderInput {
    field: BookOrderField!
    direction: OrderDirection!
  }

  # Fields by which books can be ordered
  enum BookOrderField {
    NAME
    GENRE
  }

  # Order direction enum
  enum OrderDirection {
    ASC
    DESC
  }

  # Paginated books result
  type PaginatedBooks {
    books: [Book!]!
    totalCount: Int!
    hasNextPage: Boolean!
  }

  # ...removed union SearchResult...

  # Query type - read operations
  type Query {
    # Basic queries
    book(id: ID!): Book
    books: [Book!]!
    author(id: ID!): Author
    authors: [Author!]!
    user(id: ID!): User
    users: [User!]!
    review(id: ID!): Review
    reviews: [Review!]!

    # Advanced queries
  booksByGenre(genre: String!): [Book!]!
    booksByAuthor(authorId: ID!): [Book!]!
    reviewsByBook(bookId: ID!): [Review!]!
    reviewsByUser(userId: ID!): [Review!]!

    # Complex queries
    filteredBooks(filter: BookFilter): [Book!]!
    paginatedBooks(pagination: PaginationInput, filter: BookFilter, order: BookOrderInput): PaginatedBooks!
    
  # Search functionality
  searchBooks(query: String!): [Book!]!
    
    # Statistics
    authorStatistics(id: ID!): AuthorStats!
  }

  # Statistics for an author
  type AuthorStats {
    totalBooks: Int!
    averageBookRating: Float!
    mostPopularGenre: String
  }

  # Mutation type - write operations
  type Mutation {
    # Basic mutations
    addBook(book: BookInput!): Book!
    updateBook(id: ID!, book: UpdateBookInput!): Book!
    deleteBook(id: ID!): ID!
    
    addAuthor(author: AuthorInput!): Author!
    updateAuthor(id: ID!, author: UpdateAuthorInput!): Author!
    deleteAuthor(id: ID!): ID!
    
    addReview(review: ReviewInput!): Review!
    deleteReview(id: ID!): ID!
    
    addUser(user: UserInput!): User!
    deleteUser(id: ID!): ID!
    
    # Batch mutations
    addBooks(books: [BookInput!]!): [Book!]!

    # Complex mutations
    promoteUserToAdmin(id: ID!): User!
  }

  # Subscription type - real-time updates
  type Subscription {
    bookAdded: Book!
    reviewAdded: Review!
    bookUpdated: Book!
  }
`;

export default typeDefs;

import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { PubSub } from 'graphql-subscriptions';


// ...existing code...

// Create PubSub instance for GraphQL Subscriptions
const pubsub = new PubSub();

// Define subscription triggers
const BOOK_ADDED = 'BOOK_ADDED';
const REVIEW_ADDED = 'REVIEW_ADDED';
const BOOK_UPDATED = 'BOOK_UPDATED';

// Helper function to read JSON data from files
async function readData(filename) {
  try {
    const data = await fs.readFile(`./data/${filename}.json`, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}.json:`, error);
    return [];
  }
}

// Helper function to write JSON data to files
async function writeData(filename, data) {
  try {
    await fs.writeFile(`./data/${filename}.json`, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}.json:`, error);
    return false;
  }
}

const resolvers = {
  // Root Query resolvers
  Query: {
    // Basic queries
    book: async (_, { id }) => {
      const books = await readData('books');
      return books.find(book => book.id === id);
    },
    
    books: async () => {
      return readData('books');
    },
    
    author: async (_, { id }) => {
      const authors = await readData('authors');
      return authors.find(author => author.id === id);
    },
    
    authors: async () => {
      return readData('authors');
    },
    
    user: async (_, { id }) => {
      const users = await readData('users');
      return users.find(user => user.id === id);
    },
    
    users: async () => {
      return readData('users');
    },
    
    review: async (_, { id }) => {
      const reviews = await readData('reviews');
      return reviews.find(review => review.id === id);
    },
    
    reviews: async () => {
      return readData('reviews');
    },

    // Advanced queries
    booksByGenre: async (_, { genre }) => {
      const books = await readData('books');
      return books.filter(book => book.genre === genre);
    },
    
    booksByAuthor: async (_, { authorId }) => {
      const books = await readData('books');
      return books.filter(book => book.authorId === authorId);
    },
    
    reviewsByBook: async (_, { bookId }) => {
      const reviews = await readData('reviews');
      return reviews.filter(review => review.bookId === bookId);
    },
    
    reviewsByUser: async (_, { userId }) => {
      const reviews = await readData('reviews');
      return reviews.filter(review => review.userId === userId);
    },

    // Complex queries
    filteredBooks: async (_, { filter }) => {
      const books = await readData('books');
      
      if (!filter) return books;
      
      return books.filter(book => {
        let matches = true;
        
        if (filter.genre !== undefined) {
          matches = matches && book.genre === filter.genre;
        }
        
        if (filter.authorId !== undefined) {
          matches = matches && book.authorId === filter.authorId;
        }
        
        return matches;
      });
    },
    
    paginatedBooks: async (_, { pagination, filter, order }) => {
      let books = await readData('books');
      const totalCount = books.length;
      
      // Apply filters if provided
      if (filter) {
        books = books.filter(book => {
          let matches = true;
          
          if (filter.genre !== undefined) {
            matches = matches && book.genre === filter.genre;
          }
          
          if (filter.authorId !== undefined) {
            matches = matches && book.authorId === filter.authorId;
          }
          
          return matches;
        });
      }
      
      // Apply ordering if provided
      if (order) {
        books.sort((a, b) => {
          let fieldA, fieldB;
          
          if (order.field === 'NAME') {
            fieldA = a.name;
            fieldB = b.name;
          } else if (order.field === 'GENRE') {
            fieldA = a.genre;
            fieldB = b.genre;
          }
          
          if (order.direction === 'ASC') {
            return fieldA < fieldB ? -1 : fieldA > fieldB ? 1 : 0;
          } else {
            return fieldA > fieldB ? -1 : fieldA < fieldB ? 1 : 0;
          }
        });
      }
      
      // Apply pagination
      const { page, limit } = pagination || { page: 1, limit: 10 };
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      
      const paginatedBooks = books.slice(startIndex, endIndex);
      
      return {
        books: paginatedBooks,
        totalCount,
        hasNextPage: endIndex < totalCount
      };
    },
    
  // ...removed search resolver, not in schema...
  // ...existing code...
    
    authorStatistics: async (_, { id }) => {
      const [authors, books, reviews] = await Promise.all([
        readData('authors'),
        readData('books'),
        readData('reviews')
      ]);
      
      const author = authors.find(author => author.id === id);
      if (!author) throw new Error(`Author with ID ${id} not found`);
      
      const authorBooks = books.filter(book => book.authorId === id);
      
      // Calculate total books
      const totalBooks = authorBooks.length;
      
      // Calculate average book rating
      let totalRating = 0;
      let ratingCount = 0;
      
      authorBooks.forEach(book => {
        const bookReviews = reviews.filter(review => review.bookId === book.id);
        bookReviews.forEach(review => {
          totalRating += review.rating;
          ratingCount++;
        });
      });
      
      const averageBookRating = ratingCount > 0 ? totalRating / ratingCount : 0;
      
      // Find most popular genre
      const genreCounts = {};
      authorBooks.forEach(book => {
        genreCounts[book.genre] = (genreCounts[book.genre] || 0) + 1;
      });
      
      let mostPopularGenre = null;
      let maxCount = 0;
      
      Object.entries(genreCounts).forEach(([genre, count]) => {
        if (count > maxCount) {
          mostPopularGenre = genre;
          maxCount = count;
        }
      });
      
      return {
        totalBooks,
        averageBookRating,
        mostPopularGenre
      };
    }
  },

  // Root Mutation resolvers
  Mutation: {
    addBook: async (_, { book }) => {
      const books = await readData('books');
      const authors = await readData('authors');
      
      // Check if author exists
      const authorExists = authors.some(author => author.id === book.authorId);
      if (!authorExists) {
        throw new Error(`Author with ID ${book.authorId} does not exist`);
      }
      
      const newBook = {
        id: uuidv4(),
        name: book.name,
        genre: book.genre,
        authorId: book.authorId
      };
      
      books.push(newBook);
      await writeData('books', books);
      
      // Publish subscription event
      pubsub.publish(BOOK_ADDED, { bookAdded: newBook });
      
      return newBook;
    },
    
    updateBook: async (_, { id, book }) => {
      const books = await readData('books');
      const bookIndex = books.findIndex(b => b.id === id);
      
      if (bookIndex === -1) {
        throw new Error(`Book with ID ${id} not found`);
      }
      
      if (book.authorId) {
        const authors = await readData('authors');
        const authorExists = authors.some(author => author.id === book.authorId);
        
        if (!authorExists) {
          throw new Error(`Author with ID ${book.authorId} does not exist`);
        }
      }
      
      const updatedBook = {
        ...books[bookIndex],
        name: book.name ?? books[bookIndex].name,
        genre: book.genre ?? books[bookIndex].genre,
        authorId: book.authorId ?? books[bookIndex].authorId
      };
      
      books[bookIndex] = updatedBook;
      await writeData('books', books);
      
      // Publish subscription event
      pubsub.publish(BOOK_UPDATED, { bookUpdated: updatedBook });
      
      return updatedBook;
    },
    
    deleteBook: async (_, { id }) => {
      const books = await readData('books');
      const bookIndex = books.findIndex(book => book.id === id);
      
      if (bookIndex === -1) {
        throw new Error(`Book with ID ${id} not found`);
      }
      
      books.splice(bookIndex, 1);
      await writeData('books', books);
      
      // Also delete related reviews
      const reviews = await readData('reviews');
      const updatedReviews = reviews.filter(review => review.bookId !== id);
      await writeData('reviews', updatedReviews);
      
      return id;
    },
    
    addAuthor: async (_, { author }) => {
      const authors = await readData('authors');
      
      const newAuthor = {
        id: uuidv4(),
        name: author.name,
        age: author.age,
        country: author.country
      };
      
      authors.push(newAuthor);
      await writeData('authors', authors);
      
      return newAuthor;
    },
    
    updateAuthor: async (_, { id, author }) => {
      const authors = await readData('authors');
      const authorIndex = authors.findIndex(a => a.id === id);
      
      if (authorIndex === -1) {
        throw new Error(`Author with ID ${id} not found`);
      }
      
      const updatedAuthor = {
        ...authors[authorIndex],
        name: author.name ?? authors[authorIndex].name,
        age: author.age ?? authors[authorIndex].age,
        country: author.country ?? authors[authorIndex].country
      };
      
      authors[authorIndex] = updatedAuthor;
      await writeData('authors', authors);
      
      return updatedAuthor;
    },
    
    deleteAuthor: async (_, { id }) => {
      const [authors, books] = await Promise.all([
        readData('authors'),
        readData('books')
      ]);
      
      const authorIndex = authors.findIndex(author => author.id === id);
      
      if (authorIndex === -1) {
        throw new Error(`Author with ID ${id} not found`);
      }
      
      // Check if author has books
      const hasBooks = books.some(book => book.authorId === id);
      
      if (hasBooks) {
        throw new Error(`Cannot delete author with ID ${id} because they have associated books`);
      }
      
      authors.splice(authorIndex, 1);
      await writeData('authors', authors);
      
      return id;
    },
    
    addReview: async (_, { review }) => {
      const [users, books, reviews] = await Promise.all([
        readData('users'),
        readData('books'),
        readData('reviews')
      ]);
      
      // Check if user exists
      const userExists = users.some(user => user.id === review.userId);
      if (!userExists) {
        throw new Error(`User with ID ${review.userId} does not exist`);
      }
      
      // Check if book exists
      const bookExists = books.some(book => book.id === review.bookId);
      if (!bookExists) {
        throw new Error(`Book with ID ${review.bookId} does not exist`);
      }
      
      const newReview = {
        id: uuidv4(),
        userId: review.userId,
        bookId: review.bookId,
        rating: review.rating,
        comment: review.comment || "",
        createdAt: new Date().toISOString()
      };
      
      reviews.push(newReview);
      await writeData('reviews', reviews);
      
      // Publish subscription event
      pubsub.publish(REVIEW_ADDED, { reviewAdded: newReview });
      
      return newReview;
    },
    
    deleteReview: async (_, { id }) => {
      const reviews = await readData('reviews');
      const reviewIndex = reviews.findIndex(review => review.id === id);
      
      if (reviewIndex === -1) {
        throw new Error(`Review with ID ${id} not found`);
      }
      
      reviews.splice(reviewIndex, 1);
      await writeData('reviews', reviews);
      
      return id;
    },
    
    addUser: async (_, { user }) => {
      const users = await readData('users');
      
      // Check if username or email already exists
      const existingUser = users.find(
        u => u.username === user.username || u.email === user.email
      );
      
      if (existingUser) {
        throw new Error('Username or email already exists');
      }
      
      const newUser = {
        id: uuidv4(),
        username: user.username,
        email: user.email,
        role: user.role
      };
      
      users.push(newUser);
      await writeData('users', users);
      
      return newUser;
    },
    
    deleteUser: async (_, { id }) => {
      const [users, reviews] = await Promise.all([
        readData('users'),
        readData('reviews')
      ]);
      
      const userIndex = users.findIndex(user => user.id === id);
      
      if (userIndex === -1) {
        throw new Error(`User with ID ${id} not found`);
      }
      
      users.splice(userIndex, 1);
      await writeData('users', users);
      
      // Also delete related reviews
      const updatedReviews = reviews.filter(review => review.userId !== id);
      await writeData('reviews', updatedReviews);
      
      return id;
    },
    
    addBooks: async (_, { books: booksInput }) => {
      const [books, authors] = await Promise.all([
        readData('books'),
        readData('authors')
      ]);
      
      // Check if all authors exist
      for (const book of booksInput) {
        const authorExists = authors.some(author => author.id === book.authorId);
        if (!authorExists) {
          throw new Error(`Author with ID ${book.authorId} does not exist`);
        }
      }
      
      const newBooks = booksInput.map(book => ({
        id: uuidv4(),
        name: book.name,
        genre: book.genre,
        authorId: book.authorId
      }));
      
      books.push(...newBooks);
      await writeData('books', books);
      
      // Publish subscription events for each book
      newBooks.forEach(book => {
        pubsub.publish(BOOK_ADDED, { bookAdded: book });
      });
      
      return newBooks;
    },
    
    promoteUserToAdmin: async (_, { id }) => {
      const users = await readData('users');
      const userIndex = users.findIndex(user => user.id === id);
      
      if (userIndex === -1) {
        throw new Error(`User with ID ${id} not found`);
      }
      
      const updatedUser = {
        ...users[userIndex],
        role: 'ADMIN'
      };
      
      users[userIndex] = updatedUser;
      await writeData('users', users);
      
      return updatedUser;
    }
  },

  // Subscription resolvers
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator([BOOK_ADDED])
    },
    
    reviewAdded: {
      subscribe: () => pubsub.asyncIterator([REVIEW_ADDED])
    },
    
    bookUpdated: {
      subscribe: () => pubsub.asyncIterator([BOOK_UPDATED])
    }
  },

  // Type resolvers for relationships between types
  Book: {
    author: async (parent) => {
      const authors = await readData('authors');
      return authors.find(author => author.id === parent.authorId);
    },
    
    reviews: async (parent) => {
      const reviews = await readData('reviews');
      return reviews.filter(review => review.bookId === parent.id);
    }
  },
  
  Author: {
    books: async (parent) => {
      const books = await readData('books');
      return books.filter(book => book.authorId === parent.id);
    }
  },
  
  Review: {
    user: async (parent) => {
      const users = await readData('users');
      return users.find(user => user.id === parent.userId);
    },
    
    book: async (parent) => {
      const books = await readData('books');
      return books.find(book => book.id === parent.bookId);
    }
  },
  
  User: {
    reviews: async (parent) => {
      const reviews = await readData('reviews');
      return reviews.filter(review => review.userId === parent.id);
    }
  }
};

export default resolvers;

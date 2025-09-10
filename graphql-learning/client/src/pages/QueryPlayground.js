import React, { useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import {
  GET_BOOKS,
  GET_BOOK,
  GET_AUTHORS,
  GET_BOOKS_BY_GENRE,
  GET_FILTERED_BOOKS,
  SEARCH_BOOKS
} from '../graphql/queries';

// Predefined query examples
const QUERY_EXAMPLES = {
  BASIC_BOOKS: `query {
  books {
    id
    name
    genre
    author {
      name
    }
  }
}`,
  BOOK_BY_ID: `query GetBook($id: ID!) {
  book(id: $id) {
    id
    name
    genre
    author {
      name
      country
    }
    reviews {
      rating
      comment
    }
  }
}`,
  BOOKS_BY_GENRE: `query GetBooksByGenre($genre: String!) {
  booksByGenre(genre: $genre) {
    id
    name
    author {
      name
    }
  }
}`,
  FILTERED_BOOKS: `query GetFilteredBooks($filter: BookFilter) {
  filteredBooks(filter: $filter) {
    id
    name
    genre
    author {
      name
    }
  }
}`,
  SEARCH_BOOKS: `query SearchBooks($query: String!) {
  searchBooks(query: $query) {
    id
    name
    genre
  }
}`
};

function QueryPlayground() {
  const [queryType, setQueryType] = useState('');
  const [queryParams, setQueryParams] = useState({});
  const [queryText, setQueryText] = useState('');
  
  // Get all books for reference
  const { data: allBooksData } = useQuery(GET_BOOKS);
  
  // Get all authors for reference
  const { data: allAuthorsData } = useQuery(GET_AUTHORS);
  
  // Query hooks for different query types
  const [getBook, { loading: loadingBook, error: errorBook, data: bookData }] = useLazyQuery(GET_BOOK);
  const [getBooksByGenre, { loading: loadingByGenre, error: errorByGenre, data: byGenreData }] = 
    useLazyQuery(GET_BOOKS_BY_GENRE);
  const [getFilteredBooks, { loading: loadingFiltered, error: errorFiltered, data: filteredData }] = 
    useLazyQuery(GET_FILTERED_BOOKS);
  const [searchBooks, { loading: loadingSearch, error: errorSearch, data: searchData }] = 
    useLazyQuery(SEARCH_BOOKS);
  
  // Helper function to extract unique genres from books
  const getUniqueGenres = () => {
    if (!allBooksData?.books) return [];
    const genres = new Set(allBooksData.books.map(book => book.genre));
    return [...genres];
  };
  
  // Handle query type change
  const handleQueryTypeChange = (event) => {
    const newType = event.target.value;
    setQueryType(newType);
    setQueryParams({});
    
    // Set example query text based on selection
    setQueryText(QUERY_EXAMPLES[newType] || '');
  };
  
  // Handle parameter change
  const handleParamChange = (param) => (event) => {
    setQueryParams({
      ...queryParams,
      [param]: event.target.value
    });
  };
  
  // Handle query execution
  const executeQuery = () => {
    switch(queryType) {
      case 'BASIC_BOOKS':
        // Nothing to do, we already have all books loaded
        break;
      case 'BOOK_BY_ID':
        getBook({ variables: { id: queryParams.id } });
        break;
      case 'BOOKS_BY_GENRE':
        getBooksByGenre({ variables: { genre: queryParams.genre } });
        break;
      case 'FILTERED_BOOKS':
        getFilteredBooks({ 
          variables: { 
            filter: { 
              genre: queryParams.genre || undefined,
              authorId: queryParams.authorId || undefined
            } 
          } 
        });
        break;
      case 'SEARCH_BOOKS':
        searchBooks({ variables: { query: queryParams.searchQuery || '' } });
        break;
      default:
        break;
    }
  };
  
  // Determine which data to display
  const getResultData = () => {
    switch(queryType) {
      case 'BASIC_BOOKS':
        return allBooksData?.books || [];
      case 'BOOK_BY_ID':
        return bookData?.book ? [bookData.book] : [];
      case 'BOOKS_BY_GENRE':
        return byGenreData?.booksByGenre || [];
      case 'FILTERED_BOOKS':
        return filteredData?.filteredBooks || [];
      case 'SEARCH_BOOKS':
        return searchData?.searchBooks || [];
      default:
        return [];
    }
  };
  
  // Determine if we're loading
  const isLoading = loadingBook || loadingByGenre || loadingFiltered || loadingSearch;
  
  // Determine if we have an error
  const error = errorBook || errorByGenre || errorFiltered || errorSearch;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        GraphQL Query Playground
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card sx={{ mb: 3 }}>
            <CardHeader title="Query Selection" />
            <Divider />
            <CardContent>
              <FormControl fullWidth margin="normal">
                <InputLabel>Query Type</InputLabel>
                <Select
                  value={queryType}
                  onChange={handleQueryTypeChange}
                  label="Query Type"
                >
                  <MenuItem value="BASIC_BOOKS">Get All Books</MenuItem>
                  <MenuItem value="BOOK_BY_ID">Get Book by ID</MenuItem>
                  <MenuItem value="BOOKS_BY_GENRE">Get Books by Genre</MenuItem>
                  <MenuItem value="FILTERED_BOOKS">Get Filtered Books</MenuItem>
                  <MenuItem value="SEARCH_BOOKS">Search Books</MenuItem>
                </Select>
              </FormControl>
              
              {queryType === 'BOOK_BY_ID' && (
                <FormControl fullWidth margin="normal">
                  <InputLabel>Book ID</InputLabel>
                  <Select
                    value={queryParams.id || ''}
                    onChange={handleParamChange('id')}
                    label="Book ID"
                  >
                    {allBooksData?.books?.map(book => (
                      <MenuItem key={book.id} value={book.id}>
                        {book.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              
              {(queryType === 'BOOKS_BY_GENRE' || queryType === 'FILTERED_BOOKS') && (
                <FormControl fullWidth margin="normal">
                  <InputLabel>Genre</InputLabel>
                  <Select
                    value={queryParams.genre || ''}
                    onChange={handleParamChange('genre')}
                    label="Genre"
                  >
                    {getUniqueGenres().map(genre => (
                      <MenuItem key={genre} value={genre}>
                        {genre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              
              {queryType === 'FILTERED_BOOKS' && (
                <FormControl fullWidth margin="normal">
                  <InputLabel>Author</InputLabel>
                  <Select
                    value={queryParams.authorId || ''}
                    onChange={handleParamChange('authorId')}
                    label="Author"
                  >
                    <MenuItem value="">Any Author</MenuItem>
                    {allAuthorsData?.authors?.map(author => (
                      <MenuItem key={author.id} value={author.id}>
                        {author.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              
              {queryType === 'SEARCH_BOOKS' && (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Search Query"
                  value={queryParams.searchQuery || ''}
                  onChange={handleParamChange('searchQuery')}
                />
              )}
              
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ mt: 2 }}
                onClick={executeQuery}
                disabled={!queryType || isLoading}
              >
                Execute Query
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader title="GraphQL Query" />
            <Divider />
            <CardContent>
              <TextField
                fullWidth
                multiline
                rows={10}
                value={queryText}
                InputProps={{
                  readOnly: true,
                  style: { fontFamily: 'monospace' }
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={7}>
          <Card>
            <CardHeader 
              title="Query Results" 
              subheader={`${getResultData().length} item(s) returned`} 
            />
            <Divider />
            <CardContent>
              {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              )}
              
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  Error: {error.message}
                </Alert>
              )}
              
              {!isLoading && !error && (
                <>
                  {getResultData().length === 0 ? (
                    <Alert severity="info">
                      No results found. Please select a query and execute it.
                    </Alert>
                  ) : (
                    <Box sx={{ maxHeight: '500px', overflow: 'auto' }}>
                      {queryType === 'BOOK_BY_ID' && bookData?.book && (
                        <Box>
                          <Typography variant="h6" gutterBottom>
                            {bookData.book.name}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Genre: {bookData.book.genre}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Author: {bookData.book.author.name} ({bookData.book.author.country})
                          </Typography>
                          
                          {bookData.book.reviews?.length > 0 && (
                            <>
                              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                                Reviews:
                              </Typography>
                              <List dense>
                                {bookData.book.reviews.map((review, index) => (
                                  <ListItem key={index} divider={index < bookData.book.reviews.length - 1}>
                                    <ListItemText 
                                      primary={`Rating: ${review.rating}/5`} 
                                      secondary={review.comment} 
                                    />
                                  </ListItem>
                                ))}
                              </List>
                            </>
                          )}
                        </Box>
                      )}
                      
                      {queryType !== 'BOOK_BY_ID' && (
                        <List>
                          {getResultData().map((book) => (
                            <ListItem key={book.id} divider>
                              <ListItemText
                                primary={book.name}
                                secondary={
                                  <>
                                    {book.genre && `Genre: ${book.genre}`}
                                    {book.author && <span> | Author: {book.author.name}</span>}
                                  </>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      )}
                    </Box>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default QueryPlayground;

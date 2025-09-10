import React, { useState, useMemo } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Stack,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import {
  GET_AUTHORS,
  GET_PAGINATED_BOOKS,
  GET_FILTERED_BOOKS,
  SEARCH_BOOKS
} from '../graphql/queries';

function AdvancedExamplesPage() {
  // State for pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  
  // State for filtering
  const [genreFilter, setGenreFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  
  // State for ordering
  const [orderField, setOrderField] = useState('NAME');
  const [orderDirection, setOrderDirection] = useState('ASC');
  
  // State for search
  const [searchQuery, setSearchQuery] = useState('');
  
  // Query for authors (for the filter dropdown)
  const { data: authorsData, loading: loadingAuthors } = useQuery(GET_AUTHORS);
  
  // Query for paginated books
  const { loading: loadingBooks, error: errorBooks, data: booksData } = 
    useQuery(GET_PAGINATED_BOOKS, {
      variables: {
        pagination: { page, limit },
        filter: {
          genre: genreFilter || undefined,
          authorId: authorFilter || undefined
        },
        order: {
          field: orderField,
          direction: orderDirection
        }
      }
    });
  
  // Query for search
  const [executeSearch, { loading: loadingSearch, error: errorSearch, data: searchData }] = 
    useLazyQuery(SEARCH_BOOKS);
  
  // Extract unique genres from books data
  const uniqueGenres = useMemo(() => {
    if (!booksData?.paginatedBooks?.books) return [];
    const genres = new Set(booksData.paginatedBooks.books.map(book => book.genre));
    return [...genres];
  }, [booksData]);
  
  // Handle pagination change
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  
  // Handle limit change
  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
    setPage(1); // Reset to first page when changing limit
  };
  
  // Handle filter changes
  const handleGenreFilterChange = (event) => {
    setGenreFilter(event.target.value);
    setPage(1); // Reset to first page when changing filter
  };
  
  const handleAuthorFilterChange = (event) => {
    setAuthorFilter(event.target.value);
    setPage(1); // Reset to first page when changing filter
  };
  
  // Handle order changes
  const handleOrderFieldChange = (event) => {
    setOrderField(event.target.value);
  };
  
  const handleOrderDirectionChange = (event) => {
    setOrderDirection(event.target.value);
  };
  
  // Handle search
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const handleSearch = () => {
    if (searchQuery.trim()) {
      executeSearch({ variables: { query: searchQuery } });
    }
  };
  
  // Calculate total pages for pagination
  const totalPages = booksData?.paginatedBooks?.totalCount
    ? Math.ceil(booksData.paginatedBooks.totalCount / limit)
    : 0;
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Advanced GraphQL Examples
      </Typography>
      
      <Grid container spacing={3}>
        {/* Pagination and Filtering Example */}
        <Grid item xs={12}>
          <Card sx={{ mb: 4 }}>
            <CardHeader title="Pagination, Filtering & Sorting" />
            <Divider />
            <CardContent>
              <Typography paragraph>
                This example demonstrates pagination, filtering, and sorting with GraphQL. These features are 
                implemented on the server side rather than client side, which is more efficient for large datasets.
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {/* Filters */}
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Genre Filter</InputLabel>
                    <Select
                      value={genreFilter}
                      onChange={handleGenreFilterChange}
                      label="Genre Filter"
                    >
                      <MenuItem value="">All Genres</MenuItem>
                      {uniqueGenres.map(genre => (
                        <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Author Filter</InputLabel>
                    <Select
                      value={authorFilter}
                      onChange={handleAuthorFilterChange}
                      label="Author Filter"
                      disabled={loadingAuthors}
                    >
                      <MenuItem value="">All Authors</MenuItem>
                      {authorsData?.authors.map(author => (
                        <MenuItem key={author.id} value={author.id}>{author.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Items Per Page</InputLabel>
                    <Select
                      value={limit}
                      onChange={handleLimitChange}
                      label="Items Per Page"
                    >
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {/* Sort options */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                      value={orderField}
                      onChange={handleOrderFieldChange}
                      label="Sort By"
                    >
                      <MenuItem value="NAME">Book Title</MenuItem>
                      <MenuItem value="GENRE">Genre</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Order</InputLabel>
                    <Select
                      value={orderDirection}
                      onChange={handleOrderDirectionChange}
                      label="Order"
                    >
                      <MenuItem value="ASC">Ascending</MenuItem>
                      <MenuItem value="DESC">Descending</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              
              {/* Results table */}
              {loadingBooks ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : errorBooks ? (
                <Alert severity="error">{errorBooks.message}</Alert>
              ) : (
                <>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Title</strong></TableCell>
                          <TableCell><strong>Genre</strong></TableCell>
                          <TableCell><strong>Author</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {booksData?.paginatedBooks?.books.map((book) => (
                          <TableRow key={book.id}>
                            <TableCell>{book.name}</TableCell>
                            <TableCell>
                              <Chip label={book.genre} size="small" />
                            </TableCell>
                            <TableCell>{book.author.name}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Pagination 
                      count={totalPages} 
                      page={page} 
                      onChange={handlePageChange} 
                      color="primary" 
                    />
                  </Box>
                  
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Showing {(page - 1) * limit + 1} - {Math.min(page * limit, booksData?.paginatedBooks?.totalCount || 0)} of {booksData?.paginatedBooks?.totalCount} results
                    </Typography>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        {/* Search Example */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Advanced Search" />
            <Divider />
            <CardContent>
              <Typography paragraph>
                This example shows how to implement a search feature with GraphQL. The search is performed on the server 
                and returns books that match the query in either title or genre.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <TextField
                  label="Search Books"
                  value={searchQuery}
                  onChange={handleSearchQueryChange}
                  variant="outlined"
                  fullWidth
                />
                <Button 
                  variant="contained" 
                  onClick={handleSearch}
                  disabled={loadingSearch || !searchQuery.trim()}
                >
                  Search
                </Button>
              </Box>
              
              {loadingSearch ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : errorSearch ? (
                <Alert severity="error">{errorSearch.message}</Alert>
              ) : searchData ? (
                <>
                  <Typography variant="subtitle1" gutterBottom>
                    Found {searchData.searchBooks.length} results for "{searchQuery}"
                  </Typography>
                  
                  {searchData.searchBooks.length > 0 ? (
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell><strong>Title</strong></TableCell>
                            <TableCell><strong>Genre</strong></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {searchData.searchBooks.map((book) => (
                            <TableRow key={book.id}>
                              <TableCell>{book.name}</TableCell>
                              <TableCell>
                                <Chip label={book.genre} size="small" />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Alert severity="info">No books found matching your search criteria.</Alert>
                  )}
                </>
              ) : (
                <Alert severity="info">Enter a search term and click Search to find books.</Alert>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdvancedExamplesPage;

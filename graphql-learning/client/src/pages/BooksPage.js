import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Chip,
  Snackbar,
} from '@mui/material';
import { GET_BOOKS, GET_AUTHORS, ADD_BOOK, DELETE_BOOK } from '../graphql/queries';

import SubscriptionsPage from './SubscriptionsPage';

function BooksPage() {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newBook, setNewBook] = useState({ name: '', genre: '', authorId: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Query hooks
  // below is to run the query on component load/ automatically
  const { loading: loadingBooks, error: errorBooks, data: booksData } = useQuery(GET_BOOKS);


  
  const { loading: loadingAuthors, error: errorAuthors, data: authorsData } = useQuery(GET_AUTHORS);

  // Mutation hooks
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
    onCompleted: () => {
      setSnackbar({ open: true, message: 'Book added successfully!', severity: 'success' });
    },
    onError: (error) => {
      setSnackbar({ open: true, message: `Error: ${error.message}`, severity: 'error' });
    }
  });

  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
    onCompleted: () => {
      setSnackbar({ open: true, message: 'Book deleted successfully!', severity: 'success' });
    },
    onError: (error) => {
      setSnackbar({ open: true, message: `Error: ${error.message}`, severity: 'error' });
    }
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  // Handle dialog open/close
  const handleOpenAddDialog = () => setOpenAddDialog(true);
  const handleCloseAddDialog = () => setOpenAddDialog(false);

  // Handle form submission
  const handleAddBook = () => {
    addBook({ variables: { book: newBook } });
    setNewBook({ name: '', genre: '', authorId: '' });
    handleCloseAddDialog();
  };

  // Handle book deletion
  const handleDeleteBook = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      deleteBook({ variables: { id } });
    }
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Loading and error states
  if (loadingBooks || loadingAuthors) return <CircularProgress />;
  if (errorBooks) return <Alert severity="error">Error loading books: {errorBooks.message}</Alert>;
  if (errorAuthors) return <Alert severity="error">Error loading authors: {errorAuthors.message}</Alert>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Books
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpenAddDialog}>
          Add New Book
        </Button>
      </Box>

      <Grid container spacing={3}>
        {booksData.books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div" gutterBottom>
                  {book.name}
                </Typography>
                <Chip 
                  label={book.genre}
                  color="primary"
                  size="small"
                  sx={{ mb: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Author: {book.author.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="error" onClick={() => handleDeleteBook(book.id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Book Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Book</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Book Title"
            type="text"
            fullWidth
            variant="outlined"
            value={newBook.name}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="genre"
            label="Genre"
            type="text"
            fullWidth
            variant="outlined"
            value={newBook.genre}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth>
            <InputLabel>Author</InputLabel>
            <Select
              name="authorId"
              value={newBook.authorId}
              label="Author"
              onChange={handleInputChange}
            >
              {authorsData.authors.map((author) => (
                <MenuItem key={author.id} value={author.id}>
                  {author.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button 
            onClick={handleAddBook}
            disabled={!newBook.name || !newBook.genre || !newBook.authorId}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <SubscriptionsPage />
    </Box>
  );
}

export default BooksPage;

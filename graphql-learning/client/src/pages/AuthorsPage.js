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
  CircularProgress,
  Alert,
  Divider,
  Snackbar,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { GET_AUTHORS, ADD_AUTHOR, GET_AUTHOR_STATS } from '../graphql/queries';

function AuthorsPage() {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [newAuthor, setNewAuthor] = useState({ name: '', age: '', country: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Query hooks
  const { loading, error, data } = useQuery(GET_AUTHORS);
  const { loading: loadingStats, data: statsData } = useQuery(
    GET_AUTHOR_STATS,
    {
      variables: { id: selectedAuthor?.id },
      skip: !selectedAuthor,
    }
  );

  // Mutation hook
  const [addAuthor] = useMutation(ADD_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }],
    onCompleted: () => {
      setSnackbar({ open: true, message: 'Author added successfully!', severity: 'success' });
    },
    onError: (error) => {
      setSnackbar({ open: true, message: `Error: ${error.message}`, severity: 'error' });
    }
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'age') {
      setNewAuthor({ ...newAuthor, [name]: parseInt(value) || '' });
    } else {
      setNewAuthor({ ...newAuthor, [name]: value });
    }
  };

  // Handle dialog open/close
  const handleOpenAddDialog = () => setOpenAddDialog(true);
  const handleCloseAddDialog = () => setOpenAddDialog(false);

  // Handle form submission
  const handleAddAuthor = () => {
    addAuthor({ variables: { author: newAuthor } });
    setNewAuthor({ name: '', age: '', country: '' });
    handleCloseAddDialog();
  };

  // Handle author selection for stats
  const handleSelectAuthor = (author) => {
    setSelectedAuthor(author);
  };

  // Handle clearing selection
  const handleClearSelection = () => {
    setSelectedAuthor(null);
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Loading and error states
  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error loading authors: {error.message}</Alert>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Authors
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpenAddDialog}>
          Add New Author
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={selectedAuthor ? 8 : 12}>
          <Grid container spacing={3}>
            {data.authors.map((author) => (
              <Grid item xs={12} sm={6} md={4} key={author.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    bgcolor: selectedAuthor?.id === author.id ? '#f5f9ff' : 'white',
                    border: selectedAuthor?.id === author.id ? '1px solid #2a3eb1' : 'none'
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="div" gutterBottom>
                      {author.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Age: {author.age}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Country: {author.country}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Books: {author.books.length}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleSelectAuthor(author)}>
                      View Statistics
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {selectedAuthor && (
          <Grid item xs={12} md={4}>
            <Card sx={{ position: 'sticky', top: '20px' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5" component="div" gutterBottom>
                    {selectedAuthor.name} - Statistics
                  </Typography>
                  <Button size="small" onClick={handleClearSelection}>
                    Close
                  </Button>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                {loadingStats ? (
                  <CircularProgress size={24} />
                ) : statsData ? (
                  <Box>
                    <Typography variant="body1" gutterBottom>
                      Total Books: {statsData.authorStatistics.totalBooks}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Average Book Rating: {statsData.authorStatistics.averageBookRating.toFixed(1)}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Popular Genre: {statsData.authorStatistics.mostPopularGenre || 'N/A'}
                    </Typography>

                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                      Books:
                    </Typography>
                    <List dense>
                      {selectedAuthor.books.map((book) => (
                        <ListItem key={book.id}>
                          <ListItemText primary={book.name} secondary={book.genre} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                ) : (
                  <Alert severity="info">No statistics available</Alert>
                )}
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Add Author Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Author</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Author Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newAuthor.name}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="age"
            label="Age"
            type="number"
            fullWidth
            variant="outlined"
            value={newAuthor.age}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="country"
            label="Country"
            type="text"
            fullWidth
            variant="outlined"
            value={newAuthor.country}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button 
            onClick={handleAddAuthor}
            disabled={!newAuthor.name || !newAuthor.age || !newAuthor.country}
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
    </Box>
  );
}

export default AuthorsPage;

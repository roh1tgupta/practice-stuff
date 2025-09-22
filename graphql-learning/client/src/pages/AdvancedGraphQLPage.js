import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress
} from '@mui/material';
import { useMutation, useLazyQuery } from '@apollo/client';
import { gql } from '@apollo/client';

// GraphQL mutations and queries
const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        username
        email
        role
      }
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        id
        username
        email
        role
      }
    }
  }
`;

const PROTECTED_BOOKS_QUERY = gql`
  query ProtectedBooks {
    protectedBooks {
      id
      name
      genre
      author {
        name
      }
    }
  }
`;

const PROTECTED_AUTHORS_QUERY = gql`
  query ProtectedAuthors {
    protectedAuthors {
      id
      name
      age
      country
    }
  }
`;

const MY_PROFILE_QUERY = gql`
  query MyProfile {
    myProfile {
      id
      username
      email
      role
    }
  }
`;

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function AdvancedGraphQLPage() {
  const [tabValue, setTabValue] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Login form state
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'READER'
  });

  // GraphQL hooks
  const [login, { loading: loginLoading }] = useMutation(LOGIN_MUTATION);
  const [register, { loading: registerLoading }] = useMutation(REGISTER_MUTATION);
  
  const [getProtectedBooks, { data: booksData, loading: booksLoading, error: booksError }] = useLazyQuery(PROTECTED_BOOKS_QUERY);
  const [getProtectedAuthors, { data: authorsData, loading: authorsLoading, error: authorsError }] = useLazyQuery(PROTECTED_AUTHORS_QUERY);
  const [getMyProfile, { data: profileData, loading: profileLoading, error: profileError }] = useLazyQuery(MY_PROFILE_QUERY);
  
  // Separate queries for unauthenticated requests (to demonstrate server-side errors)
  const [getUnauthBooks, { data: unauthBooksData, loading: unauthBooksLoading, error: unauthBooksError }] = useLazyQuery(PROTECTED_BOOKS_QUERY);
  const [getUnauthAuthors, { data: unauthAuthorsData, loading: unauthAuthorsLoading, error: unauthAuthorsError }] = useLazyQuery(PROTECTED_AUTHORS_QUERY);
  const [getUnauthProfile, { data: unauthProfileData, loading: unauthProfileLoading, error: unauthProfileError }] = useLazyQuery(MY_PROFILE_QUERY);

  // Check for existing token on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setAuthError('');
    setAuthSuccess('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    try {
      const { data } = await login({
        variables: { input: loginForm },
        context: {
          headers: {
            authorization: localStorage.getItem('authToken') ? `Bearer ${localStorage.getItem('authToken')}` : '',
          },
        },
      });

      if (data.login) {
        localStorage.setItem('authToken', data.login.token);
        localStorage.setItem('userData', JSON.stringify(data.login.user));
        setIsAuthenticated(true);
        setUser(data.login.user);
        setAuthSuccess('Login successful!');
        setLoginForm({ username: '', password: '' });
      }
    } catch (error) {
      setAuthError(error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    try {
      const { data } = await register({
        variables: { input: registerForm },
      });

      if (data.register) {
        localStorage.setItem('authToken', data.register.token);
        localStorage.setItem('userData', JSON.stringify(data.register.user));
        setIsAuthenticated(true);
        setUser(data.register.user);
        setAuthSuccess('Registration successful!');
        setRegisterForm({ username: '', email: '', password: '', role: 'READER' });
      }
    } catch (error) {
      setAuthError(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
    setAuthSuccess('Logged out successfully!');
  };

  const executeProtectedQuery = async (queryType) => {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      setAuthError('Please log in to access protected resources');
      return;
    }

    try {
      // No need to pass context manually - authLink handles it automatically
      switch (queryType) {
        case 'books':
          await getProtectedBooks();
          break;
        case 'authors':
          await getProtectedAuthors();
          break;
        case 'profile':
          await getMyProfile();
          break;
        default:
          break;
      }
    } catch (error) {
      setAuthError(error.message);
    }
  };

  // Execute queries WITHOUT authentication to demonstrate server-side errors
  const executeUnauthenticatedQuery = async (queryType) => {
    setAuthError(''); // Clear previous errors
    
    try {
      // Deliberately override authLink by passing empty authorization header
      const context = {
        headers: {
          authorization: "", // Override authLink to trigger server-side auth error
        },
      };

      switch (queryType) {
        case 'books':
          await getUnauthBooks({ context });
          break;
        case 'authors':
          await getUnauthAuthors({ context });
          break;
        case 'profile':
          await getUnauthProfile({ context });
          break;
        default:
          break;
      }
    } catch (error) {
      // This will catch the server-side authentication error
      setAuthError(`Server-side authentication error: ${error.message}`);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom>
        Advanced GraphQL - Authentication & Authorization
      </Typography>
      
      <Typography variant="body1" paragraph>
        This page demonstrates advanced GraphQL concepts including user authentication, 
        protected queries, and authorization. Try logging in and accessing protected resources!
      </Typography>

      <Paper sx={{ width: '100%', mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Authentication" />
            <Tab label="Protected Queries" />
            <Tab label="User Management" />
          </Tabs>
        </Box>

        {/* Authentication Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={4}>
            {/* Login Section */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Login
                  </Typography>
                  
                  {!isAuthenticated ? (
                    <Box component="form" onSubmit={handleLogin}>
                      <TextField
                        fullWidth
                        label="Username"
                        value={loginForm.username}
                        onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                        margin="normal"
                        required
                      />
                      <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        margin="normal"
                        required
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2 }}
                        disabled={loginLoading}
                      >
                        {loginLoading ? <CircularProgress size={24} /> : 'Login'}
                      </Button>
                    </Box>
                  ) : (
                    <Box>
                      <Typography variant="body1" gutterBottom>
                        Welcome, {user?.username}!
                      </Typography>
                      <Chip label={user?.role} color="primary" sx={{ mb: 2 }} />
                      <br />
                      <Button variant="outlined" onClick={handleLogout}>
                        Logout
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Register Section */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Register New User
                  </Typography>
                  
                  <Box component="form" onSubmit={handleRegister}>
                    <TextField
                      fullWidth
                      label="Username"
                      value={registerForm.username}
                      onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                      margin="normal"
                      required
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      margin="normal"
                      required
                    />
                    <TextField
                      fullWidth
                      label="Password"
                      type="password"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      margin="normal"
                      required
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 2 }}
                      disabled={registerLoading}
                    >
                      {registerLoading ? <CircularProgress size={24} /> : 'Register'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Sample Credentials */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sample Credentials for Testing
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2"><strong>Admin User:</strong></Typography>
                  <Typography variant="body2">Username: admin_user</Typography>
                  <Typography variant="body2">Password: admin2023</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2"><strong>Regular Reader:</strong></Typography>
                  <Typography variant="body2">Username: bookworm123</Typography>
                  <Typography variant="body2">Password: password123</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2"><strong>Critic:</strong></Typography>
                  <Typography variant="body2">Username: literary_critic</Typography>
                  <Typography variant="body2">Password: critic456</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Protected Queries Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h5" gutterBottom>
            Protected GraphQL Queries
          </Typography>
          
          <Typography variant="body1" paragraph>
            These queries require authentication. Compare the difference between authenticated and unauthenticated requests!
          </Typography>

          {/* Authenticated Queries Section */}
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            ✅ Authenticated Queries (with JWT token)
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => executeProtectedQuery('books')}
                disabled={booksLoading}
                color="success"
              >
                {booksLoading ? <CircularProgress size={24} /> : 'Get Protected Books'}
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => executeProtectedQuery('authors')}
                disabled={authorsLoading}
                color="success"
              >
                {authorsLoading ? <CircularProgress size={24} /> : 'Get Protected Authors'}
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => executeProtectedQuery('profile')}
                disabled={profileLoading}
                color="success"
              >
                {profileLoading ? <CircularProgress size={24} /> : 'Get My Profile'}
              </Button>
            </Grid>
          </Grid>

          {/* Unauthenticated Queries Section */}
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            ❌ Unauthenticated Queries (without JWT token - triggers server errors)
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            These buttons send requests WITHOUT authentication tokens to demonstrate server-side error handling:
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => executeUnauthenticatedQuery('books')}
                disabled={unauthBooksLoading}
                color="error"
              >
                {unauthBooksLoading ? <CircularProgress size={24} /> : 'Try Books (No Auth)'}
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => executeUnauthenticatedQuery('authors')}
                disabled={unauthAuthorsLoading}
                color="error"
              >
                {unauthAuthorsLoading ? <CircularProgress size={24} /> : 'Try Authors (No Auth)'}
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => executeUnauthenticatedQuery('profile')}
                disabled={unauthProfileLoading}
                color="error"
              >
                {unauthProfileLoading ? <CircularProgress size={24} /> : 'Try Profile (No Auth)'}
              </Button>
            </Grid>
          </Grid>

          {/* Display Results */}
          {booksData && (
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Protected Books</Typography>
                <List>
                  {booksData.protectedBooks.map((book) => (
                    <ListItem key={book.id}>
                      <ListItemText
                        primary={book.name}
                        secondary={`Genre: ${book.genre} | Author: ${book.author.name}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}

          {authorsData && (
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Protected Authors</Typography>
                <List>
                  {authorsData.protectedAuthors.map((author) => (
                    <ListItem key={author.id}>
                      <ListItemText
                        primary={author.name}
                        secondary={`Age: ${author.age} | Country: ${author.country}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}

          {profileData && (
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>My Profile</Typography>
                <Typography><strong>Username:</strong> {profileData.myProfile.username}</Typography>
                <Typography><strong>Email:</strong> {profileData.myProfile.email}</Typography>
                <Typography><strong>Role:</strong> {profileData.myProfile.role}</Typography>
              </CardContent>
            </Card>
          )}

          {/* Display Authenticated Query Errors */}
          {(booksError || authorsError || profileError) && (
            <Alert severity="error" sx={{ mt: 2 }}>
              <strong>Authenticated Query Error:</strong> {booksError?.message || authorsError?.message || profileError?.message}
            </Alert>
          )}

          {/* Display Unauthenticated Query Errors (Server-side authentication errors) */}
          {(unauthBooksError || unauthAuthorsError || unauthProfileError) && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              <strong>Server-side Authentication Error:</strong> {unauthBooksError?.message || unauthAuthorsError?.message || unauthProfileError?.message}
              <br />
              <Typography variant="body2" sx={{ mt: 1 }}>
                This error comes directly from the GraphQL server when trying to access protected resources without authentication.
              </Typography>
            </Alert>
          )}

          {/* Display Unauthenticated Query Results (if any - should be empty due to auth errors) */}
          {(unauthBooksData || unauthAuthorsData || unauthProfileData) && (
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="error">
                  Unauthenticated Query Results (This shouldn't appear due to auth errors)
                </Typography>
                {unauthBooksData && <Typography>Books: {JSON.stringify(unauthBooksData)}</Typography>}
                {unauthAuthorsData && <Typography>Authors: {JSON.stringify(unauthAuthorsData)}</Typography>}
                {unauthProfileData && <Typography>Profile: {JSON.stringify(unauthProfileData)}</Typography>}
              </CardContent>
            </Card>
          )}
        </TabPanel>

        {/* User Management Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h5" gutterBottom>
            User Management
          </Typography>
          
          <Typography variant="body1" paragraph>
            Current authentication status and user information.
          </Typography>

          {isAuthenticated ? (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Current User</Typography>
                <Typography><strong>ID:</strong> {user?.id}</Typography>
                <Typography><strong>Username:</strong> {user?.username}</Typography>
                <Typography><strong>Email:</strong> {user?.email}</Typography>
                <Typography><strong>Role:</strong> {user?.role}</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  JWT Token stored in localStorage for subsequent requests
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Alert severity="info">
              Please log in to view user information
            </Alert>
          )}
        </TabPanel>
      </Paper>

      {/* Status Messages */}
      {authError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {authError}
        </Alert>
      )}
      
      {authSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {authSuccess}
        </Alert>
      )}
    </Container>
  );
}

export default AdvancedGraphQLPage;

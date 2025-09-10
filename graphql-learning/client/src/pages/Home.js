import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Paper,
  Divider
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Home() {
  // List of key GraphQL concepts demonstrated in the app
  const concepts = [
    { title: 'Basic Queries', description: 'Fetching data with simple queries' },
    { title: 'Mutations', description: 'Creating, updating, and deleting data' },
    { title: 'Relationships', description: 'Working with related data (Books, Authors, etc.)' },
    { title: 'Filtering & Pagination', description: 'Limiting and filtering result sets' },
    { title: 'Subscriptions', description: 'Real-time updates with WebSockets' },
    { title: 'Advanced Queries', description: 'Custom parameters, dynamic filtering, and sorting' },
    { title: 'Error Handling', description: 'Managing errors in GraphQL operations' },
    { title: 'Optimization', description: 'Caching and performance optimizations' }
  ];

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: '#f5f9ff' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          GraphQL Learning App
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          A comprehensive reference implementation for learning GraphQL
        </Typography>
        <Typography paragraph>
          This application demonstrates GraphQL concepts from basics to advanced, using Apollo GraphQL with React on the frontend 
          and Express.js on the backend. Use this as a reference to understand how GraphQL works in real-world scenarios.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button 
            variant="contained" 
            color="primary" 
            component={RouterLink} 
            to="/books"
            sx={{ mr: 2 }}
          >
            Explore Books
          </Button>
          <Button 
            variant="outlined" 
            component={RouterLink} 
            to="/playground"
          >
            Try Query Playground
          </Button>
        </Box>
      </Paper>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6, mb: 4 }}>
        What You'll Learn
      </Typography>
      
      <Grid container spacing={3}>
        {concepts.map((concept, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardHeader title={concept.title} />
              <CardContent>
                <Typography>{concept.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6, mb: 4 }}>
        Getting Started
      </Typography>
      
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Explore Books and Authors" 
              secondary="Browse the basic entities to see how GraphQL handles relationships" 
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Try the Query Playground" 
              secondary="Execute different types of GraphQL operations and see the results" 
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Check Advanced Examples" 
              secondary="Explore pagination, filtering, sorting, and complex queries" 
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Experience Real-time Updates" 
              secondary="See GraphQL subscriptions in action with WebSockets" 
            />
          </ListItem>
        </List>
      </Paper>

      <Typography variant="h4" gutterBottom sx={{ mt: 6, mb: 2 }}>
        Technology Stack
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Frontend" />
            <CardContent>
              <List dense>
                <ListItem>
                  <ListItemText primary="React" secondary="UI library" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Apollo Client" secondary="GraphQL client for React" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Material UI" secondary="React component library" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="React Router" secondary="Navigation" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Backend" />
            <CardContent>
              <List dense>
                <ListItem>
                  <ListItemText primary="Node.js" secondary="JavaScript runtime" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Express" secondary="Web framework" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Apollo Server" secondary="GraphQL server" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="JSON files" secondary="Data storage" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;

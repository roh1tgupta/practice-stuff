import React, { useState, useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Chip,
} from '@mui/material';
import { 
  GET_BOOKS, 
  BOOK_ADDED_SUBSCRIPTION,
  REVIEW_ADDED_SUBSCRIPTION,
  BOOK_UPDATED_SUBSCRIPTION
} from '../graphql/queries';

import { GET_REVIEWS } from '../graphql/reviewQueries';
function SubscriptionsPage() {
  const [notifications, setNotifications] = useState([]);
  
  // Query initial data
  const { data: booksData, loading: booksLoading } = useQuery(GET_BOOKS);
  const { data: reviewsData, loading: reviewsLoading } = useQuery(GET_REVIEWS);
  
  // Book added subscription
  const { data: bookAddedData } = useSubscription(BOOK_ADDED_SUBSCRIPTION);
  
  // Review added subscription
  const { data: reviewAddedData } = useSubscription(REVIEW_ADDED_SUBSCRIPTION);
  
  // Book updated subscription
  const { data: bookUpdatedData } = useSubscription(BOOK_UPDATED_SUBSCRIPTION);
  
  // Handle book added subscription
  useEffect(() => {
    console.log(bookAddedData, "...bookAddedData before");
    if (bookAddedData) {
      console.log(bookAddedData, "...bookAddedData");
      const book = bookAddedData.bookAdded;
      setNotifications(prev => [
        {
          id: Date.now(),
          type: 'BOOK_ADDED',
          message: `New book added: "${book.name}" by ${book.author.name}`,
          timestamp: new Date().toLocaleTimeString(),
          data: book
        },
        ...prev
      ]);
    }
  }, [bookAddedData]);
  
  // Handle review added subscription
  useEffect(() => {
    if (reviewAddedData) {
      const review = reviewAddedData.reviewAdded;
      setNotifications(prev => [
        {
          id: Date.now(),
          type: 'REVIEW_ADDED',
          message: `New review added for "${review.book.name}" by ${review.user.username}`,
          timestamp: new Date().toLocaleTimeString(),
          data: review
        },
        ...prev
      ]);
    }
  }, [reviewAddedData]);
  
  // Handle book updated subscription
  useEffect(() => {
    if (bookUpdatedData) {
      const book = bookUpdatedData.bookUpdated;
      setNotifications(prev => [
        {
          id: Date.now(),
          type: 'BOOK_UPDATED',
          message: `Book updated: "${book.name}"`,
          timestamp: new Date().toLocaleTimeString(),
          data: book
        },
        ...prev
      ]);
    }
  }, [bookUpdatedData]);
  
  // Loading state
  const isLoading = booksLoading || reviewsLoading;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        GraphQL Subscriptions
      </Typography>
      
      <Typography paragraph>
        This page demonstrates real-time updates using GraphQL Subscriptions. Add or update books and add reviews 
        through the Books and Authors pages to see real-time notifications appear here.
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card>
            <CardHeader title="Real-time Notifications" />
            <Divider />
            <CardContent>
              {notifications.length === 0 ? (
                <Alert severity="info">
                  No notifications yet. Try adding a book or a review to see real-time updates.
                </Alert>
              ) : (
                <List>
                  {notifications.map((notification) => (
                    <ListItem 
                      key={notification.id} 
                      divider 
                      className="subscription-notification"
                      sx={{ 
                        backgroundColor: notification.type === 'BOOK_ADDED' 
                          ? '#e3f2fd' 
                          : notification.type === 'REVIEW_ADDED'
                            ? '#f1f8e9'
                            : '#fff3e0' 
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {notification.message}
                            <Chip 
                              label={notification.type.replace('_', ' ')} 
                              size="small" 
                              color={
                                notification.type === 'BOOK_ADDED' 
                                  ? 'primary' 
                                  : notification.type === 'REVIEW_ADDED'
                                    ? 'success'
                                    : 'warning'
                              }
                            />
                          </Box>
                        }
                        secondary={`Received at: ${notification.timestamp}`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={5}>
          <Card sx={{ mb: 3 }}>
            <CardHeader title="Subscription Types" />
            <Divider />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Book Added
              </Typography>
              <Typography paragraph>
                Triggered when a new book is created. Test this by adding a book on the Books page.
              </Typography>
              
              <Typography variant="h6" gutterBottom>
                Review Added
              </Typography>
              <Typography paragraph>
                Triggered when a new review is created. Test this by adding a review through the Books page.
              </Typography>
              
              <Typography variant="h6" gutterBottom>
                Book Updated
              </Typography>
              <Typography paragraph>
                Triggered when a book is updated. Test this by updating a book's information.
              </Typography>
            </CardContent>
          </Card>
          
          <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
            <Typography variant="h6" gutterBottom>
              How Subscriptions Work
            </Typography>
            <Typography paragraph>
              GraphQL subscriptions use WebSockets to maintain a persistent connection between the client and server. 
              When data changes on the server, it pushes updates to connected clients in real-time.
            </Typography>
            <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
{`subscription BookAdded {
  bookAdded {
    id
    name
    genre
    author {
      name
    }
  }
}`}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SubscriptionsPage;

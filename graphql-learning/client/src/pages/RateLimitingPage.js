/**
 * Rate Limiting Demo Page
 * 
 * This component demonstrates GraphQL rate limiting by making requests in two ways:
 * 1. Single requests: Uses Apollo Client (client.query)
 *    - Good for normal GraphQL operations
 *    - Benefits from Apollo's caching and request optimization
 * 
 * 2. Burst requests: Uses fetch API
 *    - Bypasses Apollo Client's optimizations
 *    - Ensures each request is independent
 *    - Better for demonstrating rate limiting
 */

import React, { useState } from 'react';
import { Box, Typography, Button, Paper, LinearProgress, Alert } from '@mui/material';
import { useApolloClient, gql } from '@apollo/client';

const SIMPLE_QUERY = gql`
query SimpleQuery {
  books {
    id
    name
  }
}`;

export default function RateLimitingPage() {
  const client = useApolloClient();
  const [rateLimit, setRateLimit] = useState({ limit: 100, remaining: 100, reset: 0 });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to make a GraphQL request
  const makeRequest = async () => {
    try {
      setLoading(true);
      const result = await client.query({
        query: SIMPLE_QUERY,
        context: {
          headers: {
            'x-client-id': 'demo-user' // Identify client for rate limiting
          }
        }
      });

      // Update rate limit info from response
      const rateLimitInfo = result.extensions?.rateLimits;
      if (rateLimitInfo) {
        setRateLimit(rateLimitInfo);
      }

      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Makes multiple parallel GraphQL requests to demonstrate rate limiting.
   * 
   * Important Note: We're using fetch() instead of Apollo Client's client.query() because:
   * 1. Apollo Client has built-in request batching - it may combine similar requests
   * 2. Apollo Client deduplicates identical requests within a short time window
   * 3. Apollo Client's in-memory cache might serve cached results instead of making real requests
   * 
   * For our rate limiting demo, we need:
   * - Each request to be truly independent
   * - No request batching or combining
   * - No caching or deduplication
   * - Real network calls for each request
   * 
   * That's why we use the raw fetch API - it gives us complete control over the network requests
   * and ensures each request is treated separately by both client and server.
   */
  const makeMultipleRequests = async () => {
    try {
      setLoading(true);
      
      // Create the query payload
      const queryPayload = {
        query: `
          query SimpleQuery {
            books {
              id
              name
            }
          }
        `,
        variables: {}
      };

      // Create 20 independent fetch requests
      const promises = Array.from({ length: 20 }, () => 
        fetch('http://localhost:4000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-client-id': 'demo-user'
          },
          body: JSON.stringify(queryPayload)
        })
        .then(async res => {
          const data = await res.json();
          
          // Handle GraphQL errors
          if (data.errors) {
            const error = data.errors[0];
            console.log('GraphQL Error:', error);  // For debugging
            
            // Update rate limit info if available
            if (error.extensions?.code === 'RATE_LIMIT_EXCEEDED') {
              setRateLimit({
                limit: error.extensions.limit || 100,
                remaining: 0,
                reset: error.extensions.timeToReset || 60
              });
            }
            
            // Throw error with the GraphQL error message
            throw new Error(error.message);
          }
          
          return data;
        })
      );

      console.log('Executing 20 parallel queries...');
      // Execute all 20 queries in parallel
      const results = await Promise.all(promises);
      console.log('All queries completed:', results.length);
      
      // Update rate limit info from the last response
      const lastResult = results[results.length - 1];
      if (lastResult?.extensions?.rateLimits) {
        setRateLimit(lastResult.extensions.rateLimits);
      }

      setError(null);
    } catch (err) {
      console.error('Error in batch requests:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Calculate progress percentage
  const progressPercentage = ((rateLimit.limit - rateLimit.remaining) / rateLimit.limit) * 100;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Rate Limiting Demo</Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Rate Limit Status</Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Requests made in current window: {rateLimit.limit - rateLimit.remaining}
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={progressPercentage} 
            sx={{ height: 10, borderRadius: 1 }}
          />
        </Box>
        <Typography variant="body2" gutterBottom>
          • Limit: {rateLimit.limit} requests per minute
        </Typography>
        <Typography variant="body2" gutterBottom>
          • Remaining: {rateLimit.remaining} requests
        </Typography>
        {rateLimit.reset > 0 && (
          <Typography variant="body2" gutterBottom>
            • Window resets in: {rateLimit.reset} seconds
          </Typography>
        )}
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Test Rate Limiting</Typography>
        <Box sx={{ mb: 2 }}>
          <Button 
            variant="contained" 
            onClick={makeRequest}
            disabled={loading}
            sx={{ mr: 2 }}
          >
            Make Single Request
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={makeMultipleRequests}
            disabled={loading}
          >
            Burst (20 Requests)
          </Button>
        </Box>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>How It Works</Typography>
        <Typography variant="body1" paragraph>
          This demo implements a sliding window rate limiter that:
        </Typography>
        <Typography component="div" variant="body2">
          • Limits each client to 100 requests per minute<br/>
          • Uses a sliding window to track request counts<br/>
          • Returns rate limit info in response headers:<br/>
          &nbsp;&nbsp;- X-RateLimit-Limit: Maximum requests allowed<br/>
          &nbsp;&nbsp;- X-RateLimit-Remaining: Requests remaining<br/>
          &nbsp;&nbsp;- X-RateLimit-Reset: Seconds until window resets<br/>
          • Blocks requests when limit is exceeded<br/>
          • Identifies clients by 'x-client-id' header
        </Typography>
      </Paper>
    </Box>
  );
}

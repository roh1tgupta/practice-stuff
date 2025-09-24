import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
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
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { ExpandMore, Speed, Security, Storage, NetworkCheck } from '@mui/icons-material';
import { useApolloClient } from '@apollo/client';
import { lastExtensionsVar } from '../apollo-client';
import { DEMO_QUERIES } from '../graphql/persistedQueriesDemo';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`persisted-tabpanel-${index}`}
      aria-labelledby={`persisted-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function PersistedQueriesPage() {
  const apolloClient = useApolloClient();
  const [tabValue, setTabValue] = useState(0);
  const [persistedQueriesEnabled, setPersistedQueriesEnabled] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('simple');
  const [selectedQuery, setSelectedQuery] = useState(0);
  const [metrics, setMetrics] = useState({
    requestSize: 0,
    responseTime: 0,
    cacheHit: false,
    cacheSize: 0,
    executionCount: 0
  });
  const [executionHistory, setExecutionHistory] = useState([]);
  const [resultData, setResultData] = useState(null);
  const [executing, setExecuting] = useState(false);
  const [errorState, setErrorState] = useState(null);

  // Current query is derived at execution time based on selectedCategory/selectedQuery

  let startTime = 0;

  useEffect(() => {
    // Set persisted queries flag in localStorage
    localStorage.setItem('disablePersistedQueries', (!persistedQueriesEnabled).toString());
  }, [persistedQueriesEnabled]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedQuery(0);
  };

  const handleQueryChange = (event) => {
    setSelectedQuery(event.target.value);
  };

  const updateMetrics = (responseTime, cacheHit, actualRequestSize = null) => {
    
    const currentQueryObj = DEMO_QUERIES[selectedCategory]?.[selectedQuery];
    if (!currentQueryObj) {
      console.error('No query found for category/index:', selectedCategory, selectedQuery);
      return;
    }
    
    const queryString = currentQueryObj.query.loc.source.body || '';
    const fullQuerySize = new Blob([queryString]).size;
    
    // Use actual request size if provided, otherwise calculate based on cache hit
    let requestSize;
    if (actualRequestSize !== null) {
      requestSize = actualRequestSize;
    } else if (persistedQueriesEnabled && cacheHit) {
      requestSize = 64; // Only hash sent for cache hits
    } else {
      requestSize = fullQuerySize; // Full query sent
    }
    
    // Format response time to max 3 digits
    const formattedResponseTime = responseTime > 999 ? 999 : responseTime;
    
  
    setMetrics(prev => {
      const newMetrics = {
        ...prev,
        requestSize,
        responseTime: formattedResponseTime,
        cacheHit,
        executionCount: prev.executionCount + 1
      };
      console.log('New metrics state:', newMetrics);
      return newMetrics;
    });

    // Add to execution history
    const execution = {
      timestamp: new Date().toLocaleTimeString(),
      query: currentQueryObj.name,
      requestSize,
      responseTime: formattedResponseTime,
      cacheHit,
      persistedEnabled: persistedQueriesEnabled
    };
    
    
    setExecutionHistory(prev => {
      const newHistory = [execution, ...prev.slice(0, 9)];
      return newHistory;
    });
  };

  const executeSelectedQuery = async () => {
    startTime = Date.now();
    const currentQuery = DEMO_QUERIES[selectedCategory][selectedQuery];
    
    if (currentQuery) {
      try {
        setExecuting(true);
        setErrorState(null);

        // Execute via apolloClient.query to get { data, extensions }
        const result = await apolloClient.query({
          query: currentQuery.query,
          variables: currentQuery.variables,
          fetchPolicy: 'network-only',
          context: {
            headers: {
              'x-force-refresh': Date.now().toString(),
              'x-persisted-enabled': persistedQueriesEnabled.toString()
            }
          }
        });

        const { data, extensions } = result;
        setResultData(data);

        // Compute metrics (read extensions from reactive mailbox to be bulletproof)
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        const mailboxExtensions = lastExtensionsVar();
        const effectiveExtensions = mailboxExtensions || extensions;
        const persistedQueryInfo = effectiveExtensions?.persistedQuery;
        const cacheHit = persistedQueryInfo?.cacheHit || false;
        const actualRequestSize = persistedQueryInfo?.actualRequestSize;
        updateMetrics(responseTime, cacheHit, actualRequestSize);

      } catch (error) {
        console.error('Query execution failed:', error);
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        updateMetrics(responseTime, false);
        setErrorState(error);
      } finally {
        setExecuting(false);
      }
    } else {
      console.error('No current query found');
    }
  };

  const clearHistory = () => {
    setExecutionHistory([]);
    setMetrics(prev => ({ ...prev, executionCount: 0 }));
  };

  const getPayloadReduction = () => {
    if (!persistedQueriesEnabled || !metrics.cacheHit) return 0;
    const originalSize = metrics.requestSize;
    const hashedSize = 64; // SHA256 hash size
    return originalSize > 0 ? Math.round(((originalSize - hashedSize) / originalSize) * 100) : 0;
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" component="h1" gutterBottom>
        Persisted Queries Performance Demo
      </Typography>
      
      <Typography variant="body1" paragraph>
        Experience the power of GraphQL Persisted Queries! See real-time performance improvements, 
        payload size reductions, and caching benefits in action.
      </Typography>

      <Paper sx={{ width: '100%', mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Interactive Demo" />
            <Tab label="Concept Explanation" />
            <Tab label="Performance Metrics" />
          </Tabs>
        </Box>

        {/* Interactive Demo Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={4}>
            {/* Controls Section */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Demo Controls
                  </Typography>
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={persistedQueriesEnabled}
                        onChange={(e) => setPersistedQueriesEnabled(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Enable Persisted Queries"
                    sx={{ mb: 2 }}
                  />

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Query Category</InputLabel>
                    <Select
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      label="Query Category"
                    >
                      <MenuItem value="simple">Simple Queries</MenuItem>
                      <MenuItem value="medium">Medium Complexity</MenuItem>
                      <MenuItem value="complex">Complex Queries</MenuItem>
                      <MenuItem value="extreme">Extreme Complexity</MenuItem>
                      <MenuItem value="comparison">Size Comparison</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Select Query</InputLabel>
                    <Select
                      value={selectedQuery}
                      onChange={handleQueryChange}
                      label="Select Query"
                    >
                      {DEMO_QUERIES[selectedCategory]?.map((query, index) => (
                        <MenuItem key={index} value={index}>
                          {query.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={executeSelectedQuery}
                    disabled={executing}
                    sx={{ mb: 2 }}
                  >
                    {executing ? <CircularProgress size={24} /> : 'Execute Query'}
                  </Button>

                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={clearHistory}
                    size="small"
                  >
                    Clear History
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Real-time Metrics */}
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Real-time Performance Metrics
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={6} md={3}>
                      <Box textAlign="center">
                        <Typography variant="h4" color="primary">
                          {metrics.requestSize}B
                        </Typography>
                        <Typography variant="body2">Request Size</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Box textAlign="center">
                        <Typography variant="h4" color="secondary">
                          {metrics.responseTime}ms
                        </Typography>
                        <Typography variant="body2">Response Time</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Box textAlign="center">
                        <Chip 
                          label={metrics.cacheHit ? 'HIT' : 'MISS'} 
                          color={metrics.cacheHit ? 'success' : 'warning'}
                          size="large"
                        />
                        <Typography variant="body2">Cache Status</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Box textAlign="center">
                        <Typography variant="h4" color="info.main">
                          {getPayloadReduction()}%
                        </Typography>
                        <Typography variant="body2">Payload Reduction</Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  {persistedQueriesEnabled && (
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="body2" gutterBottom>
                        Payload Size Reduction
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={getPayloadReduction()} 
                        sx={{ height: 10, borderRadius: 5 }}
                      />
                    </Box>
                  )}
                </CardContent>
              </Card>

              {/* Execution History */}
              <Card sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Execution History
                  </Typography>
                  
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Time</TableCell>
                          <TableCell>Query</TableCell>
                          <TableCell>Size</TableCell>
                          <TableCell>Response</TableCell>
                          <TableCell>Cache</TableCell>
                          <TableCell>Mode</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {executionHistory.map((execution, index) => (
                          <TableRow key={index}>
                            <TableCell>{execution.timestamp}</TableCell>
                            <TableCell>{execution.query}</TableCell>
                            <TableCell>{execution.requestSize}B</TableCell>
                            <TableCell>{execution.responseTime}ms</TableCell>
                            <TableCell>
                              <Chip 
                                label={execution.cacheHit ? 'HIT' : 'MISS'} 
                                color={execution.cacheHit ? 'success' : 'warning'}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={execution.persistedEnabled ? 'Persisted' : 'Regular'} 
                                color={execution.persistedEnabled ? 'primary' : 'default'}
                                size="small"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  
                  {executionHistory.length === 0 && (
                    <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ py: 2 }}>
                      Execute queries to see performance history
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Query Results */}
          {resultData && (
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Query Results</Typography>
                <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                  <pre style={{ fontSize: '12px', whiteSpace: 'pre-wrap' }}>
                    {JSON.stringify(resultData, null, 2)}
                  </pre>
                </Box>
              </CardContent>
            </Card>
          )}

          {errorState && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Query Error: {errorState.message}
            </Alert>
          )}
        </TabPanel>

        {/* Concept Explanation Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h5" gutterBottom>
            Understanding Persisted Queries
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Speed color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">What are Persisted Queries?</Typography>
                  </Box>
                  <Typography variant="body2" paragraph>
                    Persisted Queries are a GraphQL optimization technique where queries are 
                    pre-stored on the server and referenced by a hash instead of sending the 
                    full query string with each request.
                  </Typography>
                  <Typography variant="body2">
                    Instead of sending a 2KB query, you send a 64-byte hash - that's a 97% reduction!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <NetworkCheck color="secondary" sx={{ mr: 1 }} />
                    <Typography variant="h6">How It Works</Typography>
                  </Box>
                  <Typography variant="body2" paragraph>
                    <strong>First Request:</strong> Client sends query + hash, server caches it
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Subsequent Requests:</strong> Client sends only hash, server retrieves cached query
                  </Typography>
                  <Typography variant="body2">
                    <strong>Result:</strong> Massive bandwidth savings and faster requests
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Key Benefits
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Speed color="success" sx={{ mr: 1 }} />
                    <Typography variant="h6">Performance</Typography>
                  </Box>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="80-95% payload reduction" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Faster network requests" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Reduced parsing overhead" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Security color="warning" sx={{ mr: 1 }} />
                    <Typography variant="h6">Security</Typography>
                  </Box>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="Query whitelisting" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Prevents malicious queries" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Attack surface reduction" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Storage color="info" sx={{ mr: 1 }} />
                    <Typography variant="h6">Caching</Typography>
                  </Box>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="Server-side query cache" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="CDN-friendly GET requests" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Better cache hit rates" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Implementation Details
          </Typography>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>Client-Side Implementation</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                Apollo Client automatically handles persisted queries with the 
                <code>createPersistedQueryLink</code> from <code>@apollo/client/link/persisted-queries</code>.
              </Typography>
              <Box component="pre" sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, fontSize: '12px' }}>
{`import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { sha256 } from 'crypto-hash';

const persistedQueriesLink = createPersistedQueryLink({
  sha256,
  useGETForHashedQueries: true
});`}
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>Server-Side Implementation</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                Apollo Server supports persisted queries out of the box. We've implemented 
                an in-memory cache for this demo, but production systems typically use Redis.
              </Typography>
              <Box component="pre" sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, fontSize: '12px' }}>
{`const persistedQueryCache = new Map();

// Plugin handles caching automatically
if (sha256Hash && !request.query) {
  const cachedQuery = persistedQueryCache.get(sha256Hash);
  if (cachedQuery) {
    request.query = cachedQuery; // Cache HIT
  }
}`}
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>Production Considerations</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                For production deployments, consider these optimizations:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Redis Cache" 
                    secondary="Use Redis for distributed caching across multiple server instances"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Query Registry" 
                    secondary="Pre-generate query hashes during build time for maximum security"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="CDN Integration" 
                    secondary="Use GET requests with query hashes for better CDN caching"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Monitoring" 
                    secondary="Track cache hit rates and query performance metrics"
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </TabPanel>

        {/* Performance Metrics Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h5" gutterBottom>
            Performance Analysis
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Payload Size Comparison
                  </Typography>
                  <Typography variant="body2" paragraph>
                    See the dramatic difference in request sizes between regular and persisted queries:
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2">Regular Query (Full GraphQL)</Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={100} 
                      sx={{ height: 20, borderRadius: 10, bgcolor: 'error.light' }}
                    />
                    <Typography variant="caption">~2048 bytes</Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2">Persisted Query (Hash Only)</Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={3} 
                      sx={{ height: 20, borderRadius: 10, bgcolor: 'success.light' }}
                    />
                    <Typography variant="caption">~64 bytes (97% reduction)</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Cache Performance
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Total executions: {metrics.executionCount}
                  </Typography>
                  
                  {executionHistory.length > 0 && (
                    <Box>
                      <Typography variant="body2">
                        Cache Hit Rate: {
                          Math.round((executionHistory.filter(e => e.cacheHit).length / executionHistory.length) * 100)
                        }%
                      </Typography>
                      <Typography variant="body2">
                        Average Response Time: {
                          Math.round(executionHistory.reduce((sum, e) => sum + e.responseTime, 0) / executionHistory.length)
                        }ms
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Real-World Impact
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" color="primary" gutterBottom>
                    <strong>Mobile Networks</strong>
                  </Typography>
                  <Typography variant="body2">
                    97% less data usage means faster loading on slow connections and 
                    reduced mobile data costs for users.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" color="secondary" gutterBottom>
                    <strong>Server Resources</strong>
                  </Typography>
                  <Typography variant="body2">
                    Reduced parsing overhead and smaller request processing leads to 
                    better server performance and lower costs.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" color="success.main" gutterBottom>
                    <strong>User Experience</strong>
                  </Typography>
                  <Typography variant="body2">
                    Faster queries mean snappier applications and better user satisfaction, 
                    especially on repeat visits.
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </TabPanel>
      </Paper>
    </Container>
  );
}

export default PersistedQueriesPage;

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Chip,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Divider,
  Tab,
  Tabs
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Security as SecurityIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  PlayArrow as PlayArrowIcon,
  Code as CodeIcon
} from '@mui/icons-material';
// Sample queries for demonstration
const SAMPLE_QUERIES = {
  safe: {
    title: "Safe Query (No Aliases)",
    description: "A normal query without aliases - should work fine",
    query: `query GetBooks {
  books {
    id
    name
    genre
    author {
      id
      name
      country
    }
  }
}`
  },
  
  moderate: {
    title: "Moderate Aliases (Safe)",
    description: "Query with a reasonable number of aliases - should work fine",
    query: `query GetBooksWithAliases {
  fictionBooks: books {
    bookId: id
    bookTitle: name
    bookGenre: genre
    bookAuthor: author {
      authorId: id
      authorName: name
      authorCountry: country
    }
  }
  
  allAuthors: authors {
    id
    name
  }
}`
  },
  
  abusive: {
    title: "Alias Abuse (Will be Rejected)",
    description: "Query with excessive aliases - should be rejected by the server",
    query: `query AliasAbuseExample {
  books1: books { id1: id, name1: name, genre1: genre }
  books2: books { id2: id, name2: name, genre2: genre }
  books3: books { id3: id, name3: name, genre3: genre }
  books4: books { id4: id, name4: name, genre4: genre }
  books5: books { id5: id, name5: name, genre5: genre }
  books6: books { id6: id, name6: name, genre6: genre }
  books7: books { id7: id, name7: name, genre7: genre }
  books8: books { id8: id, name8: name, genre8: genre }
  books9: books { id9: id, name9: name, genre9: genre }
  books10: books { id10: id, name10: name, genre10: genre }
  books11: books { id11: id, name11: name, genre11: genre }
  books12: books { id12: id, name12: name, genre12: genre }
  books13: books { id13: id, name13: name, genre13: genre }
  books14: books { id14: id, name14: name, genre14: genre }
  books15: books { id15: id, name15: name, genre15: genre }
  books16: books { id16: id, name16: name, genre16: genre }
  books17: books { id17: id, name17: name, genre17: genre }
  books18: books { id18: id, name18: name, genre18: genre }
}`
  },
  
  deepNested: {
    title: "Deep Nested Aliases (Will be Rejected)",
    description: "Query with deeply nested aliases - should be rejected for depth",
    query: `query DeepNestedExample {
  books {
    level1: author {
      level2: books {
        level3: author {
          level4: books {
            level5: author {
              level6: books {
                level7: author {
                  level8: books {
                    level9: author {
                      level10: books {
                        level11: author {
                          deepId: id
                          deepName: name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`
  }
};


function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function AliasAbusePreventionPage() {
  const [currentQuery, setCurrentQuery] = useState(SAMPLE_QUERIES.safe.query);
  const [queryResult, setQueryResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const executeTestQuery = async () => {
    setIsLoading(true);
    setQueryResult(null);
    
    try {
      // We'll use a direct fetch to test the actual query string
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: currentQuery
        })
      });
      
      const result = await response.json();
      
      if (result.errors) {
        setQueryResult({
          success: false,
          error: result.errors[0].message,
          extensions: result.errors[0].extensions || {},
          message: 'Query was rejected by alias abuse prevention!'
        });
      } else {
        setQueryResult({
          success: true,
          data: result.data,
          message: 'Query executed successfully!'
        });
      }
    } catch (error) {
      setQueryResult({
        success: false,
        error: error.message,
        message: 'Network error or server unavailable'
      });
    }
    
    setIsLoading(false);
  };

  const loadSampleQuery = (queryKey) => {
    setCurrentQuery(SAMPLE_QUERIES[queryKey].query);
    setQueryResult(null);
  };

  const analyzeQuery = (query) => {
    const aliasMatches = query.match(/\w+:/g) || [];
    const aliasCount = aliasMatches.length;
    const depth = (query.match(/{/g) || []).length;
    
    return {
      aliasCount,
      depth,
      isLikelyAbusive: aliasCount > 15 || depth > 10
    };
  };

  const queryAnalysis = analyzeQuery(currentQuery);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <SecurityIcon color="primary" fontSize="large" />
          Alias Abuse Prevention
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Learn how GraphQL alias abuse prevention protects your server from malicious queries
        </Typography>
      </Box>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Interactive Demo" />
        <Tab label="How It Works" />
        <Tab label="Security Details" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {/* Query Input Section */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CodeIcon />
                  GraphQL Query Tester
                </Typography>
                
                {/* Sample Query Buttons */}
                <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {Object.entries(SAMPLE_QUERIES).map(([key, sample]) => (
                    <Button
                      key={key}
                      variant="outlined"
                      size="small"
                      onClick={() => loadSampleQuery(key)}
                      color={key === 'abusive' || key === 'deepNested' ? 'error' : 'primary'}
                    >
                      {sample.title}
                    </Button>
                  ))}
                </Box>

                <TextField
                  fullWidth
                  multiline
                  rows={12}
                  value={currentQuery}
                  onChange={(e) => setCurrentQuery(e.target.value)}
                  variant="outlined"
                  placeholder="Enter your GraphQL query here..."
                  sx={{ mb: 2, fontFamily: 'monospace' }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button
                    variant="contained"
                    onClick={executeTestQuery}
                    disabled={isLoading}
                    startIcon={<PlayArrowIcon />}
                  >
                    {isLoading ? 'Executing...' : 'Execute Query'}
                  </Button>
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip 
                      label={`${queryAnalysis.aliasCount} aliases`}
                      color={queryAnalysis.aliasCount > 15 ? 'error' : 'default'}
                      size="small"
                    />
                    <Chip 
                      label={`Depth: ${queryAnalysis.depth}`}
                      color={queryAnalysis.depth > 10 ? 'error' : 'default'}
                      size="small"
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Results Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Query Analysis & Results
                </Typography>
                
                {queryAnalysis.isLikelyAbusive && (
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    This query may be rejected due to excessive aliases or depth
                  </Alert>
                )}

                {queryResult && (
                  <Box sx={{ mt: 2 }}>
                    <Alert 
                      severity={queryResult.success ? 'success' : 'error'}
                      icon={queryResult.success ? <CheckCircleIcon /> : <ErrorIcon />}
                    >
                      {queryResult.message}
                    </Alert>
                    
                    {!queryResult.success && queryResult.extensions && (
                      <Paper sx={{ p: 2, mt: 2, bgcolor: 'grey.50' }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Error Details:
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          Code: {queryResult.extensions.code}
                        </Typography>
                        {queryResult.extensions.aliasCount && (
                          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                            Aliases Found: {queryResult.extensions.aliasCount}
                          </Typography>
                        )}
                        {queryResult.extensions.maxAllowed && (
                          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                            Max Allowed: {queryResult.extensions.maxAllowed}
                          </Typography>
                        )}
                      </Paper>
                    )}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              How Alias Abuse Prevention Works
            </Typography>
            
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">1. Query Analysis</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography paragraph>
                  When a GraphQL query is received, the alias abuse prevention middleware analyzes the query's Abstract Syntax Tree (AST) to:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="Count the total number of aliases used in the query" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Measure the maximum depth of nested fields" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Detect suspicious patterns like repetitive field aliasing" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Track field usage frequency to identify potential abuse" />
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">2. Validation Rules</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography paragraph>
                  The middleware applies several validation rules:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Maximum Aliases Limit" 
                      secondary="Rejects queries with more than 15 aliases (configurable)"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Maximum Depth Limit" 
                      secondary="Rejects queries deeper than 10 levels (configurable)"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Repetitive Pattern Detection" 
                      secondary="Flags queries that alias the same field many times"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Deep Nested Alias Detection" 
                      secondary="Identifies aliases used in deeply nested structures"
                    />
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">3. Error Response</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography paragraph>
                  When a query violates the rules, the server responds with:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Clear Error Message" 
                      secondary="Explains why the query was rejected"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Detailed Extensions" 
                      secondary="Provides analysis data for debugging"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="HTTP 400 Status" 
                      secondary="Standard bad request response"
                    />
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Security Benefits & Attack Prevention
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="error">
                      <WarningIcon sx={{ mr: 1 }} />
                      Attacks Prevented
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText 
                          primary="DoS via Resource Exhaustion" 
                          secondary="Prevents queries that consume excessive server resources"
                        />
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemText 
                          primary="Memory Consumption Attacks" 
                          secondary="Limits queries that could cause memory overflow"
                        />
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemText 
                          primary="CPU Intensive Queries" 
                          secondary="Blocks queries with excessive computational complexity"
                        />
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemText 
                          primary="Database Overload" 
                          secondary="Prevents queries that could overwhelm the database"
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="success.main">
                      <CheckCircleIcon sx={{ mr: 1 }} />
                      Security Features
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText 
                          primary="Configurable Limits" 
                          secondary="Adjust thresholds based on your server capacity"
                        />
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemText 
                          primary="Real-time Analysis" 
                          secondary="Analyzes queries before execution"
                        />
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemText 
                          primary="Detailed Logging" 
                          secondary="Logs suspicious patterns for monitoring"
                        />
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemText 
                          primary="Zero Performance Impact" 
                          secondary="Lightweight analysis with minimal overhead"
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <Alert severity="info">
                <Typography variant="h6" gutterBottom>
                  Best Practices
                </Typography>
                <Typography paragraph>
                  • Set alias limits based on your legitimate use cases<br/>
                  • Monitor rejected queries to identify potential attacks<br/>
                  • Combine with other security measures like rate limiting<br/>
                  • Regularly review and adjust thresholds as needed<br/>
                  • Consider implementing query complexity analysis alongside alias prevention
                </Typography>
              </Alert>
            </Box>
          </Grid>
        </Grid>
      </TabPanel>
    </Container>
  );
}

export default AliasAbusePreventionPage;

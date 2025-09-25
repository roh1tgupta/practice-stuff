import React, { useMemo, useState } from 'react';
import { Box, Tabs, Tab, Typography, Stack, Button, Paper, TextField, Divider, Alert } from '@mui/material';
import QueryComplexityExplanation from './QueryComplexityExplanation';
import { gql, useApolloClient } from '@apollo/client';

const EXAMPLE_QUERIES = {
  simple: {
    name: 'Simple Query (~30 points)',
    query: `# Simple query with basic fields and one relation
query SimpleQuery {
  books {                    # 10 × 2 (list) = 20 points
    id                       # 1 point
    name                     # 1 point
    genre                    # 1 point
    author {                 # 5 points
      id                     # 1 point
      name                   # 1 point
    }
  }
}`
  },
  moderate: {
    name: 'Moderate Query (~200 points)',
    query: `# Moderate complexity with multiple relations and lists
query ModerateQuery {
  books {                    # 10 × 2 = 20 points
    id name genre            # 3 points
    author {                 # 5 × 1.5 (nested) = 7.5 points
      id name country       # 3 points
      books {               # 10 × 2 × 1.5 = 30 points
        id name            # 2 points
      }
    }
    reviews {               # 8 × 2 × 1.5 = 24 points
      id rating comment     # 3 points
      user {               # 3 × 1.5 = 4.5 points
        id username        # 2 points
      }
    }
  }
  
  # Additional operations
  authorStatistics(id: "1") {  # 50 points
    totalBooks              # 1 point
    averageBookRating      # 1 point
    mostPopularGenre       # 1 point
  }
  
  searchBooks(query: "fantasy") {  # 30 × 2 = 60 points
    id name genre           # 3 points
  }
}`
  },
  complex: {
    name: 'Complex Query (>1000 points, will be rejected)',
    query: `# Complex query that exceeds the 1000 point limit
query ComplexQuery {
  # Multiple expensive statistics queries
  stats1: authorStatistics(id: "1") { totalBooks averageBookRating mostPopularGenre }  # 50 points
  stats2: authorStatistics(id: "2") { totalBooks averageBookRating mostPopularGenre }  # 50 points
  stats3: authorStatistics(id: "3") { totalBooks averageBookRating mostPopularGenre }  # 50 points
  stats4: authorStatistics(id: "4") { totalBooks averageBookRating mostPopularGenre }  # 50 points
  stats5: authorStatistics(id: "5") { totalBooks averageBookRating mostPopularGenre }  # 50 points
  
  # Multiple admin stats (very expensive)
  adminStats {             # 75 points
    totalUsers
    totalBooks
    totalAuthors
    totalReviews
    usersByRole { role count }
  }
  
  # Deep nested query with large pagination
  paginatedBooks(pagination: { limit: 100 }) {  # 20 × 2 × 10 (limit multiplier) = 400 points
    books {
      id name genre
      author {            # Deep nesting multiplier: 1.5^depth
        books {
          reviews {
            user {
              reviews {
                book {
                  author {
                    books {  # Very deep nesting
                      id name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    totalCount
    hasNextPage
  }
  
  # Multiple search operations
  search1: searchBooks(query: "fantasy") { id name genre author { name } }  # 30 × 2 = 60
  search2: searchBooks(query: "mystery") { id name genre author { name } }  # 30 × 2 = 60
  search3: searchBooks(query: "scifi") { id name genre author { name } }   # 30 × 2 = 60
}`
  }
};

const DEFAULT_QUERY = EXAMPLE_QUERIES.simple.query;

function ModeRunner({ modeLabel, headerValue }) {
  const client = useApolloClient();
  const [queryText, setQueryText] = useState(DEFAULT_QUERY);
  const [variablesText, setVariablesText] = useState('{}');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const parsedVariables = useMemo(() => {
    try { return JSON.parse(variablesText || '{}'); } catch { return {}; }
  }, [variablesText]);

  const runQuery = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const doc = gql`${queryText}`;
      const res = await client.query({
        query: doc,
        variables: parsedVariables,
        fetchPolicy: 'no-cache',
        context: {
          headers: {
            'x-demo-mode': 'complexity',
            ...(headerValue ? { 'x-complexity-mode': headerValue } : {})
          }
        },
      });
      setResult(res);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={2}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">Mode: {modeLabel}</Typography>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>Example Queries:</Typography>
          <Stack direction="row" spacing={1}>
            {Object.entries(EXAMPLE_QUERIES).map(([key, { name }]) => (
              <Button
                key={key}
                size="small"
                variant="outlined"
                onClick={() => setQueryText(EXAMPLE_QUERIES[key].query)}
              >
                {name}
              </Button>
            ))}
          </Stack>
        </Box>
      </Box>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Paper sx={{ p: 2, flex: 1, minWidth: 300 }}>
          <Typography variant="caption" color="text.secondary">GraphQL Query</Typography>
          <TextField
            multiline
            minRows={10}
            maxRows={24}
            fullWidth
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            placeholder="Enter GraphQL query"
          />
        </Paper>
        <Paper sx={{ p: 2, width: { xs: '100%', md: 320 } }}>
          <Typography variant="caption" color="text.secondary">Variables (JSON)</Typography>
          <TextField
            multiline
            minRows={10}
            maxRows={24}
            fullWidth
            value={variablesText}
            onChange={(e) => setVariablesText(e.target.value)}
            placeholder="{}"
          />
        </Paper>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={runQuery} disabled={loading}>
          {loading ? 'Running...' : 'Run Query'}
        </Button>
        {headerValue ? (
          <Typography variant="body2" color="text.secondary">
            Sending header x-complexity-mode: <b>{headerValue}</b>
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No header set. Both analyzers may run (auto mode)
          </Typography>
        )}
      </Stack>
      <Divider />
      {error?.graphQLErrors?.some(e => e.extensions?.code === 'QUERY_COMPLEXITY_TOO_HIGH') && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Query complexity exceeded the limit of 1000 points. Try a simpler query or break it into multiple queries.
        </Alert>
      )}
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle2">Result</Typography>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
          {error
            ? JSON.stringify(
                {
                  message: error.message,
                  graphQLErrors: error.graphQLErrors?.map((g) => ({
                    message: g.message,
                    extensions: g.extensions,
                  })),
                },
                null,
                2
              )
            : JSON.stringify(result, null, 2)}
        </pre>
      </Paper>
    </Stack>
  );
}

export default function QueryComplexityPage() {
  const [tab, setTab] = useState(0);
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Query Complexity</Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Compare custom (manual) complexity analysis vs package-based (graphql-query-complexity). Use the tabs below to run the same query in different modes.
      </Typography>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="Manual (Custom)" />
        <Tab label="Package (graphql-query-complexity)" />
        <Tab label="No header (Auto)" />
        <Tab label="Understanding Complexity" />
      </Tabs>
      {tab === 0 && <ModeRunner modeLabel="manual (custom plugin)" headerValue="manual" />}
      {tab === 1 && <ModeRunner modeLabel="package (graphql-query-complexity)" headerValue="package" />}
      {tab === 2 && <ModeRunner modeLabel="auto (no header)" headerValue={undefined} />}
      {tab === 3 && <QueryComplexityExplanation />}
    </Box>
  );
}

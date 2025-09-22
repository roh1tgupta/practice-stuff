import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';

export default function QueryComplexityExplanation() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>Understanding Query Complexity Analysis</Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>1. Package Approach (graphql-query-complexity)</Typography>
        <Typography variant="body1" paragraph>
          The package provides two ways to calculate complexity:
        </Typography>

        <Typography variant="subtitle1" gutterBottom color="primary">Without Schema Annotations:</Typography>
        <Typography variant="body1" component="div" sx={{ mb: 2 }}>
          • Uses simpleEstimator with defaultComplexity: 1<br/>
          • Every field counts as 1 point<br/>
          • No special treatment for lists, nested queries, or expensive operations<br/>
          • Example:
          <Box component="pre" sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
{`query {
  books {        # 1 point
    id          # 1 point
    name        # 1 point
    author {    # 1 point
      name     # 1 point
    }
  }
}
Total: 5 points`}
          </Box>
        </Typography>

        <Typography variant="subtitle1" gutterBottom color="primary">With Schema Annotations:</Typography>
        <Typography variant="body1" component="div" sx={{ mb: 2 }}>
          • Uses fieldExtensionsEstimator<br/>
          • Explicit complexity values in schema<br/>
          • Example:
          <Box component="pre" sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
{`type Query {
  books: [Book!]! @complexity(value: 10)
  searchBooks: [Book!]! @complexity(value: 30)
  adminStats: AdminStats! @complexity(value: 75)
}`}
          </Box>
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>2. Custom Implementation</Typography>
        <Typography variant="body1" paragraph>
          Our custom implementation uses a more sophisticated approach:
        </Typography>

        <Typography variant="subtitle1" gutterBottom color="primary">Base Weights:</Typography>
        <Typography variant="body1" component="div" sx={{ mb: 2 }}>
          • Basic fields (id, name, etc.): 1 point<br/>
          • Single relations (author, user): 3-5 points<br/>
          • List relations (books, reviews): 8-10 points<br/>
          • Complex operations (search, stats): 30-75 points<br/>
          <Box component="pre" sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
{`const DEFAULT_FIELD_COMPLEXITIES = {
  // Basic fields
  'id': 1, 'name': 1, 'email': 1,
  // Relations
  'author': 5, 'book': 3,
  // Lists
  'books': 10, 'reviews': 8,
  // Complex operations
  'searchBooks': 30,
  'adminStats': 75
}`}
          </Box>
        </Typography>

        <Typography variant="subtitle1" gutterBottom color="primary">Multipliers:</Typography>
        <Typography variant="body1" component="div">
          • Lists: 2x base cost<br/>
          • Nested queries: 1.5x per level<br/>
          • Arguments: 1.2x<br/>
          • Example calculation:
          <Box component="pre" sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
{`query {
  books {                    # 10 × 2 (list) = 20
    author {                # 5 × 1.5 (nested) = 7.5
      books {              # 10 × 2 × 1.5 = 30
        reviews           # 8 × 2 × 1.5 = 24
      }
    }
  }
}
Total: ~81.5 points`}
          </Box>
        </Typography>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>3. Key Differences</Typography>
        
        <Typography variant="subtitle1" gutterBottom color="primary">Package Approach:</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          • Simpler, schema-driven complexity<br/>
          • Requires annotations for accurate scoring<br/>
          • No built-in support for multipliers<br/>
          • Better for schema-first design<br/>
          • Industry standard approach
        </Typography>

        <Typography variant="subtitle1" gutterBottom color="primary">Custom Implementation:</Typography>
        <Typography variant="body1">
          • More sophisticated scoring system<br/>
          • Automatic handling of lists and nesting<br/>
          • Built-in multipliers and penalties<br/>
          • No schema modifications needed<br/>
          • More predictable scoring
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom color="primary">When to Use What:</Typography>
        <Typography variant="body1">
          Use Package Approach when:<br/>
          • You want explicit complexity in schema<br/>
          • Your complexity rules are field-specific<br/>
          • You prefer industry standard tools<br/>
          <br/>
          Use Custom Implementation when:<br/>
          • You need automatic complexity calculation<br/>
          • You want consistent rules across all queries<br/>
          • You need fine-grained control over scoring
        </Typography>
      </Paper>
    </Box>
  );
}

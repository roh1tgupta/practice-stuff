import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Box } from '@mui/material';

// Import components and pages
import Header from './components/Header';
import Home from './pages/Home';
import BooksPage from './pages/BooksPage';
import AuthorsPage from './pages/AuthorsPage';
import QueryPlayground from './pages/QueryPlayground';
import AdvancedExamplesPage from './pages/AdvancedExamplesPage';
import AdvancedGraphQLPage from './pages/AdvancedGraphQLPage';
import QueryComplexityPage from './pages/QueryComplexityPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import AliasAbusePreventionPage from './pages/AliasAbusePreventionPage';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/authors" element={<AuthorsPage />} />
          <Route path="/playground" element={<QueryPlayground />} />
          <Route path="/advanced" element={<AdvancedExamplesPage />} />
          <Route path="/advanced-graphql" element={<AdvancedGraphQLPage />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
          <Route path="/alias-abuse-prevention" element={<AliasAbusePreventionPage />} />
          <Route path="/query-complexity" element={<QueryComplexityPage />} />
        </Routes>
      </Container>
      <Box component="footer" sx={{ py: 3, bgcolor: 'background.paper' }}>
        <Container maxWidth="sm">
          <Box textAlign="center">
            GraphQL Learning Project &copy; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default App;

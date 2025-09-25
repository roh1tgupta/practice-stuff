import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// Grouped navigation (categories -> subpages)
const navCategories = [
  {
    name: 'Basics',
    items: [
      { name: 'Home', path: '/' },
      { name: 'Books', path: '/books' },
      { name: 'Authors', path: '/authors' },
      { name: 'Query Playground', path: '/playground' },
    ],
  },
  {
    name: 'Advanced',
    items: [
      { name: 'Advanced Examples', path: '/advanced' },
      { name: 'Advanced GraphQL', path: '/advanced-graphql' },
      { name: 'Subscriptions', path: '/subscriptions' },
    ],
  },
  {
    name: 'Security',
    items: [
      { name: 'Alias Abuse Prevention', path: '/alias-abuse-prevention' },
      { name: 'Query Complexity', path: '/query-complexity' },
      { name: 'Rate Limiting', path: '/rate-limiting' },
    ],
  },
  {
    name: 'Performance',
    items: [
      { name: 'Persisted Queries', path: '/persisted-queries' },
    ],
  },
];

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorCat, setAnchorCat] = useState({ el: null, idx: null });

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleOpenCategory = (event, idx) => {
    setAnchorCat({ el: event.currentTarget, idx });
  };

  const handleCloseCategory = () => {
    setAnchorCat({ el: null, idx: null });
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for larger screens */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GraphQL Learning
          </Typography>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <List>
                  {navCategories.map((cat) => (
                    <Box key={cat.name} sx={{ mb: 1 }}>
                      <ListItem>
                        <ListItemText primary={cat.name} primaryTypographyProps={{ fontWeight: 600 }} />
                      </ListItem>
                      {cat.items.map((item) => (
                        <ListItem key={item.name} disablePadding sx={{ pl: 2 }}>
                          <ListItemButton component={RouterLink} to={item.path}>
                            <ListItemText primary={item.name} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </Box>
                  ))}
                </List>
              </Box>
            </Drawer>
          </Box>

          {/* Logo for mobile screens */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GraphQL Learning
          </Typography>

          {/* Desktop menu: show categories with dropdowns */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {navCategories.map((cat, idx) => (
              <Box key={cat.name}>
                <Button
                  onClick={(e) => handleOpenCategory(e, idx)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {cat.name}
                </Button>
                <Menu
                  anchorEl={anchorCat.el}
                  open={anchorCat.idx === idx}
                  onClose={handleCloseCategory}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                >
                  {cat.items.map((item) => (
                    <MenuItem
                      key={item.name}
                      component={RouterLink}
                      to={item.path}
                      onClick={handleCloseCategory}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;

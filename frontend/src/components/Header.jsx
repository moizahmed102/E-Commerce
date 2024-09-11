// src/components/Header.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, InputBase, Modal, Card, CardContent, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Login from './Login'; // Import the Login component
import Signup from './Signup'; // Import the Signup component

const Header = () => {
  const theme = useTheme(); // Get the theme
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  const handleOpenSignup = () => setOpenSignup(true);
  const handleCloseSignup = () => setOpenSignup(false);

  return (
    <>
      <AppBar 
        position="fixed" // Change to fixed for always visible navbar
        sx={{ 
          top: 0, 
          left: 0, 
          right: 0, 
          backgroundColor: theme.palette.primary.main, 
          color: theme.palette.common.white,
          boxShadow: theme.shadows[1],
          zIndex: theme.zIndex.appBar, // Ensure it stays above other elements
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', padding: '0 16px' }}> {/* Adjust padding if necessary */}
          {/* Left: Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            color="inherit"
            sx={{ 
              textDecoration: 'none', 
              fontWeight: 'bold', 
              color: theme.palette.common.white
            }}
          >
            Ecommerce
          </Typography>

          {/* Right: Search bar, Icons, Signup/Login */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Search bar */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: theme.palette.background.default,
                borderRadius: 1,
                padding: '0 8px',
                minWidth: '150px',
                maxWidth: '250px',
                mr: 2,
              }}
            >
              <InputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                sx={{ flex: 1, color: theme.palette.text.primary }}
              />
              <IconButton type="submit" sx={{ p: '8px' }} aria-label="search">
                <SearchIcon sx={{ color: theme.palette.text.primary }} />
              </IconButton>
            </Box>

            {/* Cart Icon */}
            <IconButton color="inherit" component={Link} to="/cart" sx={{ mx: 1 }}>
              <ShoppingCartIcon sx={{ color: theme.palette.common.white }} />
            </IconButton>

            {/* Profile Icon */}
            <IconButton color="inherit" component={Link} to="/profile" sx={{ mx: 1 }}>
              <AccountCircleIcon sx={{ color: theme.palette.common.white }} />
            </IconButton>

            {/* Signup/Login Buttons */}
            <Button color="inherit" onClick={handleOpenSignup} sx={{ mx: 0.5, fontSize: '0.9rem' }}>
              Signup
            </Button>
            <Button color="inherit" onClick={handleOpenLogin} sx={{ fontSize: '0.9rem' }}>
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Spacer to prevent the next component from being overlapped by the AppBar */}
      <Box sx={{ height: '64px' }}></Box> {/* Adjust height as needed */}

      {/* Signup Modal */}
      <Modal open={openSignup} onClose={handleCloseSignup}>
        <Card sx={{ width: 400, margin: 'auto', marginTop: '5%', padding: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Sign Up
            </Typography>
            <Signup />
          </CardContent>
        </Card>
      </Modal>

      {/* Login Modal */}
      <Modal open={openLogin} onClose={handleCloseLogin}>
        <Card sx={{ width: 400, margin: 'auto', marginTop: '10%', padding: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Login
            </Typography>
            <Login />
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default Header;

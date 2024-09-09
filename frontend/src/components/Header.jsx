import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="lg">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MyApp
          </Typography>
          <Button color="inherit" component={Link} to="/signup">
            Signup
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/profile">
            Profile
          </Button>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

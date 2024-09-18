import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileAsync, logout } from '../features/slices/authSlice';
import { getOrdersByUserAsync, resetOrders } from '../features/slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box, CircularProgress, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import { PersonOutline, Login, AppRegistration, Logout } from '@mui/icons-material';
import { styled } from '@mui/system';

const ProfileCard = styled(Card)(({ theme }) => ({
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  marginBottom: theme.spacing(3),
}));

const OrderListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  marginBottom: theme.spacing(1),
}));

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated, loading: authLoading } = useSelector((state) => state.auth);
  const { orders, loading: ordersLoading } = useSelector((state) => state.orders);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getProfileAsync());
      dispatch(getOrdersByUserAsync());
    } else {
      navigate('/login');
    }
  }, [dispatch, isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logout()); // Clear user data from auth slice
    dispatch(resetOrders()); // Clear orders from order slice
    navigate('/'); // Redirect to home
  };

  if (authLoading || ordersLoading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading your profile and orders...
        </Typography>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <PersonOutline sx={{ fontSize: 60, color: 'gray' }} /> 
        <Typography variant="h6" sx={{ mb: 2 }}>
          No user data found. Please log in or sign up.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/login')}
          sx={{ mt: 2, borderRadius: 20 }}
          startIcon={<Login />} 
        >
          Login
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate('/signup')}
          sx={{ mt: 2, ml: 2, borderRadius: 20 }}
          startIcon={<AppRegistration />} 
        >
          Sign Up
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, maxWidth: 800, mx: 'auto' }}>
      <ProfileCard>
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            Welcome {user.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Email:</strong> {user.email}
          </Typography>
        </CardContent>
      </ProfileCard>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Order History
      </Typography>
      {orders.length === 0 ? (
        <Typography variant="body1">You have not placed any orders yet.</Typography>
      ) : (
        <List>
          {orders.map((order) => (
            <OrderListItem key={order._id}>
              <ListItemText
                primary={`Order #${order._id} - Total: $${order.totalPrice.toFixed(2)}`}
                secondary={`Status: ${order.status}, Placed on: ${new Date(order.order_date).toLocaleDateString()}`}
              />
            </OrderListItem>
          ))}
        </List>
      )}

      <Button
        onClick={handleLogout}
        variant="contained"
        color="primary"
        sx={{ mt: 3, borderRadius: 20 }}
        startIcon={<Logout />} 
      >
        Logout
      </Button>
    </Box>
  );
};

export default Profile;

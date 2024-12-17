import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileAsync, logout } from '../features/slices/authSlice';
import { resetCart } from "../features/slices/cartSlice";
import { getOrdersByUserAsync, resetOrders } from '../features/slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box, CircularProgress, Card, CardContent, List, ListItem, ListItemText, Divider, Collapse } from '@mui/material';
import { PersonOutline, Login, AppRegistration, Logout, ExpandMore, ExpandLess } from '@mui/icons-material';
import { styled } from '@mui/system';

const ProfileCard = styled(Card)(({ theme }) => ({
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  marginBottom: theme.spacing(3),
}));

const OrderCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[1],
}));

const OrderHeader = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: theme.spacing(1),
}));

const OrderDetails = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const OrderListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  marginBottom: theme.spacing(1),
}));

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status: authStatus } = useSelector((state) => state.auth);
  const { orders, status: orderStatus } = useSelector((state) => state.orders);
  const [openOrderId, setOpenOrderId] = React.useState(null);

  useEffect(() => {
    dispatch(getProfileAsync());
    dispatch(getOrdersByUserAsync());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(resetOrders());
    dispatch(logout());
    dispatch(resetCart());
    navigate('/');
  };

  const handleToggleOrderDetails = (orderId) => {
    setOpenOrderId(openOrderId === orderId ? null : orderId);
  };

  if (authStatus === 'loading' || orderStatus === 'loading') {
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
        <PersonOutline sx={{ fontSize: 120, color: 'gray' }} /> 
        <Typography variant="h6" sx={{ mb: 3 }}>
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
            {user.name}'s Profile
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
        orders.map((order) => (
          <OrderCard key={order._id}>
            <OrderHeader>
              <Typography variant="h6">
                Order #{order._id.slice(0, 8)}
              </Typography>
              <Button onClick={() => handleToggleOrderDetails(order._id)}>
                {openOrderId === order._id ? <ExpandLess /> : <ExpandMore />}
              </Button>
            </OrderHeader>
            <Collapse in={openOrderId === order._id}>
              <OrderDetails>
                <Typography variant="body1" gutterBottom>
                  <strong>Total:</strong> ${order.totalPrice}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Status:</strong> {order.status}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Placed on:</strong> {new Date(order.order_date).toLocaleDateString()}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" gutterBottom>
                  <strong>Items:</strong>
                </Typography>
                <List>
  {order.orderItems.map((item) => (
    <OrderListItem key={item._id}>
      <ListItemText
        primary={`Product: ${item.product ? item.product.title : 'Product not found'}`}
        secondary={`Quantity: ${item.quantity}`}
      />
    </OrderListItem>
  ))}
</List>

              </OrderDetails>
            </Collapse>
          </OrderCard>
        ))
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

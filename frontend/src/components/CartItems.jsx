import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeItemFromCart } from '../features/slices/cartSlice';
import { Container, Typography, Box, Button, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';

const CartItems = () => {
  const dispatch = useDispatch();
  const { cart, status, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeItemFromCart(productId));
  };

  if (status === 'loading') return <CircularProgress />;
  if (status === 'failed') return <Alert severity="error">{error}</Alert>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cart && cart.orderItems.length === 0 ? (
        <Typography variant="h6">Your cart is empty</Typography>
      ) : (
        <List>
          {cart?.orderItems.map((item) => (
            <ListItem key={item.product._id}>
              <ListItemText
                primary={item.product.title}
                secondary={`Quantity: ${item.quantity} - $${item.product.price}`}
              />
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemove(item.product._id)}
              >
                Remove
              </Button>
            </ListItem>
          ))}
          <Box mt={2}>
            <Typography variant="h6">
              Total Price: ${cart?.totalPrice.toFixed(2)}
            </Typography>
          </Box>
        </List>
      )}
    </Container>
  );
};

export default CartItems;

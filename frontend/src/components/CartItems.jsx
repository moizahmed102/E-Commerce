import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeItemFromCart } from "../features/slices/cartSlice";
import {
  Container,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Paper,
  Divider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, status, error } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  const handleRemove = (productId) => {
    dispatch(removeItemFromCart(productId));
  };

  if (status === "loading") return <CircularProgress sx={{ display: "block", margin: "0 auto" }} />;
  if (status === "failed") return <Alert severity="error">{error || "An error occurred"}</Alert>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" mt={4}>
        Your Cart
      </Typography>

      <Box display="flex" justifyContent="center" mb={2}>
        <ShoppingCartIcon 
          sx={{ 
            fontSize: (cart && cart.orderItems && cart.orderItems.length === 0) ? 80 : 40, 
            color: 'primary.main' 
          }} 
        />
      </Box>

      {!isAuthenticated ? (
        <Box textAlign="center" mt={4} mb={4}>
          <Typography variant="h6" color="textSecondary">
            Please <Link to="/login">Login</Link> or{" "}
            <Link to="/signup">Signup</Link> to view your cart and proceed to checkout.
          </Typography>
        </Box>
      ) : (
        <>
          {!cart || (cart && cart.orderItems.length === 0) ? (
            <Typography variant="h6" align="center">
              Your Cart is empty, add items to your cart to view them here and checkout.
            </Typography>
          ) : (
            <Paper elevation={3} sx={{ padding: 3 }}>
              <List>
                {cart.orderItems.map((item) => (
                  <React.Fragment key={item.product._id}>
                    <ListItem>
                      <ListItemText
                        primary={item.product.title}
                        secondary={`Quantity: ${item.quantity} - $${item.product.price}`}
                      />
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleRemove(item.product._id)}
                        sx={{ ml: 2 }}
                      >
                        Remove
                      </Button>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>

              <Box mt={2} textAlign="center">
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Total Price: <strong>${cart.totalPrice.toFixed(2)}</strong>
                </Typography>
              </Box>
            </Paper>
          )}

          {cart && cart.orderItems && cart.orderItems.length > 0 && (
            <Box mt={4} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/checkout")}
                sx={{
                  padding: "12px 24px",
                  fontSize: "18px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default CartItems;

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
  CardMedia,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CartItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, status, error } = useSelector((state) => state.cart);
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchCart());
    }
  }, [dispatch, token]);

  const handleRemove = (productId) => {
    dispatch(removeItemFromCart(productId));
  };

  if (status === "loading")
    return <CircularProgress sx={{ display: "block", margin: "0 auto", color: "primary.main" }} />;
  if (status === "failed")
    return <Alert severity="error">{error || "An error occurred"}</Alert>;

  return (
    <Container maxWidth="md">
      <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
        <ShoppingCartIcon
          sx={{
            fontSize: cart && cart.orderItems && cart.orderItems.length === 0 ? 60 : 60,
            color: "primary.main",
            mr: 2,
          }}
        />
        <Typography variant="h4" mt={2} gutterBottom>
          Your Cart
        </Typography>
      </Box>

      {!isAuthenticated ? (
        <Box textAlign="center" mb={10} mt={10}>
          <Typography variant="h6" color="textSecondary">
            Please <Link to="/login">Login</Link> or{" "}
            <Link to="/signup">Signup</Link> to view your cart and proceed to checkout.
          </Typography>
        </Box>
      ) : (
        <>
          {!cart || cart.orderItems.length === 0 ? (
            <Box textAlign="center" mb={10} mt={10}>
              <Typography variant="h6">
                Your Cart is empty. Add items to your cart to view them here and checkout.
              </Typography>
            </Box>
          ) : (
            <Paper elevation={4} sx={{ padding: 3, borderRadius: 2 }}>
              <List>
                {cart.orderItems.map((item) => (
                  <React.Fragment key={item.product._id}>
                    <ListItem
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: 100, height: 100, objectFit: "cover", marginRight: 2 }}
                        image={`http://localhost:4000${item.product.image}`}
                        alt={item.product.title}
                      />
                      <ListItemText
                        primary={item.product.title}
                        secondary={`Quantity: ${item.quantity} - $${item.product.price ? item.product.price.toFixed(2) : '0.00'}`}
                      />
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleRemove(item.product._id)}
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
                  Total Price: <strong>${cart.totalPrice ? cart.totalPrice.toFixed(2) : '0.00'}</strong>
                </Typography>
              </Box>
            </Paper>
          )}

          {cart && cart.orderItems.length > 0 && (
            <Box mt={4} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/checkout")}
                sx={{
                  padding: "12px 24px",
                  fontSize: "16px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
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

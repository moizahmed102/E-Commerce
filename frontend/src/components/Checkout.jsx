import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../features/slices/cartSlice";
import { createOrderAsync } from "../features/slices/orderSlice";
import {
  Container,
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, status, error } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [orderSuccessful, setOrderSuccessful] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(fetchCart());
    }
  }, [isAuthenticated, dispatch, navigate]);

  const validate = () => {
    let errors = {};
    const phoneRegex = /^03\d{9}$/;
    if (!address) errors.address = "Address is required";
    if (!phone) {
      errors.phone = "Phone number is required";
    } else if (!phoneRegex.test(phone)) {
      errors.phone = "Phone number must be in the format 03123456789";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOrder = async () => {
    if (!validate()) return;

    if (!isAuthenticated) {
      toast.error('You must be logged in to place an order.');
      return;
    }

    if (cart?.orderItems.length === 0 || cart?.totalPrice <= 0) {
      toast.error('Your cart is empty. Add items to your cart before placing an order.');
      return;
    }

    setLoading(true);
    setOrderError(null);
    try {
      const orderData = { address, phone };
      await dispatch(createOrderAsync(orderData)).unwrap();
      setOrderSuccessful(true);
      toast.success('We have received your order!');

      dispatch(fetchCart());
    } catch (err) {
      setOrderError('Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading")
    return <CircularProgress sx={{ display: "block", margin: "0 auto", color: "primary.main" }} />;

  if (status === "failed") return <Alert severity="error">{error}</Alert>;

  if (orderSuccessful) {
    return (
      <Container maxWidth="sm">
        <Box textAlign="center"  mb={10} mt={10}>
          <Typography variant="h4"  gutterBottom>
            Thank you for shopping with us!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/products")}
            sx={{ padding: "12px 24px", fontSize: "16px" }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <ShoppingCart sx={{ fontSize: 60, color: "primary.main", mr: 2 }} />
          <Typography variant="h4" mt={2} gutterBottom>
            Checkout
          </Typography>
        </Box>
      <Paper elevation={3} sx={{ padding: 3, mb: 4 }}>
        <List>
          {cart?.orderItems.map((item) => (
            <ListItem key={item.product._id} sx={{ borderBottom: "1px solid #ddd" }}>
              <ListItemText
                primary={item.product.title}
                secondary={`Quantity: ${item.quantity} - $${item.product.price.toFixed(2)}`}
              />
            </ListItem>
          ))}
        </List>
        <Box mt={2}>
          <Typography variant="h6" align="center">
            Total Price: ${cart?.totalPrice.toFixed(2)}
          </Typography>
        </Box>
      </Paper>
      <Box textAlign="center" mb={2}>
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          margin="normal"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          error={!!formErrors.address}
          helperText={formErrors.address}
          sx={{ maxWidth: "500px", margin: "10px" }}
        />
        <TextField
          label="Phone"
          variant="outlined"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={!!formErrors.phone}
          helperText={formErrors.phone}
          sx={{ maxWidth: "500px", margin: "0 auto" }}
        />
      </Box>
      <Typography variant="body1" align="center" mb={2}>
        Payment Method: Cash on Delivery
      </Typography>
      {orderError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {orderError}
        </Alert>
      )}
      <Box textAlign="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleOrder}
          disabled={loading}
          sx={{ padding: "12px 24px", fontSize: "16px" }}
        >
          {loading ? "Processing..." : "Order Now"}
        </Button>
      </Box>
    </Container>
  );
};

export default Checkout;

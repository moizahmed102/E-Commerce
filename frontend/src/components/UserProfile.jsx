import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAsync, logout } from "../features/slices/authSlice";
import { getOrdersByUserAsync } from "../features/slices/orderSlice";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { styled } from "@mui/system";
import { toast } from "react-toastify";  

const ProfileCard = styled(Card)(({ theme }) => ({
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  marginBottom: theme.spacing(3),
}));

const OrderListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  marginBottom: theme.spacing(1),
}));

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status: authStatus, error: authError } = useSelector((state) => state.auth);
  const { orders, status: orderStatus, error: orderError } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getProfileAsync());
    dispatch(getOrdersByUserAsync());
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      toast.error(authError);
    }
    if (orderError) {
      toast.error(orderError);
    }
  }, [authError, orderError]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (authStatus === "loading" || orderStatus === "loading") {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading your profile and orders...
        </Typography>
      </Box>
    );
  }

  if (!user) {
    return <Typography variant="body1">Loading User data....</Typography>;
  }

  return (
    <>
      <Box sx={{ p: 2, maxWidth: 800, mx: "auto" }}>
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
        {orders && orders.length === 0 ? (
          <Typography variant="body1">You have not placed any orders yet.</Typography>
        ) : (
          <List>
            {orders && orders.map((order) => (
              <OrderListItem key={order._id}>
                <ListItemText
                  primary={`Order #${order._id} - Total: $${order.totalPrice}`}
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
    </>
  );
};

export default UserProfile;

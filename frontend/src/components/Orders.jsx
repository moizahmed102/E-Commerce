import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders } from '../features/slices/adminSlice';
import {
  Typography,
  List,
  Divider,
  Card,
  CardContent,
  Box,
  Stack,
  Pagination,
} from '@mui/material';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.admin);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; // Number of orders to display per page

  useEffect(() => {
    dispatch(fetchAllOrders()).unwrap().catch((error) => {
      console.error('Error fetching orders:', error);
    });
  }, [dispatch]);

  // Sort orders by date (latest first)
  const sortedOrders = [...(orders || [])].sort(
    (a, b) => new Date(b.order_date) - new Date(a.order_date)
  );

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const renderOrderItems = (orderItems) => {
    return orderItems.map((item) => {
      return (
        <Typography key={item._id} variant="body2" sx={{ marginLeft: 2 }}>
          {item.product?.title} (x{item.quantity}) - ${item.product?.price * item.quantity}
        </Typography>
      );
    });
  };
  
  const renderOrder = (order) => {
    return (
      <Card key={order._id} sx={{ marginBottom: 2, padding: 2 }}>
        <CardContent>
          <Typography variant="h6">Order ID: {order._id}</Typography>
          <Typography variant="subtitle1">User: {order.user.name} ({order.user.email})</Typography>
          <Typography variant="subtitle2">
            Date: {new Date(order.order_date).toLocaleDateString()}
          </Typography>
          <Typography variant="subtitle2">Total Price: ${order.totalPrice}</Typography>
          <Typography variant="subtitle2">Address: {order.address}</Typography>
          <Typography variant="subtitle2">Phone: {order.phone}</Typography>
          <Typography variant="subtitle2">Status: {order.status}</Typography>
          <Typography variant="h6" sx={{ marginTop: 2 }}>Order Items:</Typography>
          {renderOrderItems(order.orderItems)}
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Orders Management
      </Typography>
      {status === 'loading' && <Typography variant="body1">Loading...</Typography>}
      {status === 'failed' && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
      {status === 'succeeded' && orders.length === 0 && (
        <Typography variant="body1">No orders available</Typography>
      )}
      <List>
        {status === 'succeeded' && currentOrders.map((order) => (
          <div key={order._id}>
            {renderOrder(order)}
            <Divider />
          </div>
        ))}
      </List>
      <Stack spacing={2} direction="row" justifyContent="center" sx={{ marginTop: 3 }}>
        <Pagination
          count={Math.ceil(orders.length / ordersPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          variant="outlined"
          color="primary"
        />
      </Stack>
    </Box>
  );
};

export default Orders;

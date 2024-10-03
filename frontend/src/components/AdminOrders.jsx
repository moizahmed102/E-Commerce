import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, changeOrderStatus } from "../features/slices/adminSlice";
import {
  CircularProgress,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.admin);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [showOrdersTable, setShowOrdersTable] = useState(false); 
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, status) => {
    setUpdatingOrderId(orderId);
    dispatch(changeOrderStatus({ orderId, status }))
      .unwrap()
      .then(() => {
        dispatch(fetchOrders());
        toast.success("Order status updated");
        setUpdatingOrderId(null);
      })
      .catch((error) => {
        toast.error(error.message || "Failed to update order status");
        setUpdatingOrderId(null);
      });
  };


  const handleShowOrders = () => {
    setShowOrdersTable(true);
  };

  const handleCloseOrdersTable = () => {
    setShowOrdersTable(false);
  };

  const filteredOrders = orders.filter((order) => 
    order._id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="h6" color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f4f5f7' }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: 4 }}>
        Admin Order Management
      </Typography>

      {!showOrdersTable ? (
        <Card onClick={handleShowOrders} sx={{ maxWidth: 300, margin: "auto", cursor: "pointer" }}>
          <CardContent>
            <Typography variant="h5" align="center" color="primary">
              Total Orders: {orders.length}
            </Typography>
            <Typography variant="body1" align="center">
              Click to view all orders
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <>
          <TextField
            label="Search by Order ID"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          {filteredOrders.length === 0 ? (
            <Typography>No orders found</Typography>
          ) : (
            <>
              <TableContainer component={Paper} className="orders-table">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><Typography variant="subtitle1">Order ID</Typography></TableCell> 
                      <TableCell><Typography variant="subtitle1">User Name</Typography></TableCell>
                      <TableCell><Typography variant="subtitle1">User Email</Typography></TableCell>
                      <TableCell><Typography variant="subtitle1">Products</Typography></TableCell>
                      <TableCell><Typography variant="subtitle1">Total Price</Typography></TableCell>
                      <TableCell><Typography variant="subtitle1">Status</Typography></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell>{order._id.slice(0, 8)}</TableCell>
                        <TableCell>{order.user ? order.user.name || "Unknown User" : "Unknown User"}</TableCell>
                        <TableCell>{order.user ? order.user.email || "Unknown Email" : "Unknown Email"}</TableCell>
                        <TableCell>
                          {order.orderItems.length > 0 ? (
                            order.orderItems.map((item) => (
                              <Typography key={item.product ? item.product._id : item._id}>
                                {item.product ? item.product.title : "Unknown Product"} (Qty: {item.quantity})
                              </Typography>
                            ))
                          ) : (
                            <Typography>No products found</Typography>
                          )}
                        </TableCell>
                        <TableCell>${order.totalPrice}</TableCell>
                        <TableCell>
                          {updatingOrderId === order._id ? (
                            <CircularProgress size={24} />
                          ) : (
                            <Select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            >
                              <MenuItem value="pending">Pending</MenuItem>
                              <MenuItem value="shipped">Shipped</MenuItem>
                              <MenuItem value="delivered">Delivered</MenuItem>
                            </Select>
                          )}
                        </TableCell>
                      
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Button variant="contained" color="secondary" onClick={handleCloseOrdersTable} sx={{ marginTop: 2 }}>
                Close Orders
              </Button>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default AdminOrders;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, changeOrderStatus, removeOrder } from "../features/slices/adminSlice";
import {
  CircularProgress,
  Select,
  MenuItem,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.admin);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, status) => {
    setUpdatingOrderId(orderId);
    dispatch(changeOrderStatus({ orderId, status }))
      .unwrap()
      .then((updatedOrder) => {
        dispatch(fetchOrders()); 
        toast.success("Order status updated");
        setUpdatingOrderId(null);
      })
      .catch((error) => {
        toast.error(error.message || "Failed to update order status");
        setUpdatingOrderId(null);
      });
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(removeOrder(orderId))
      .unwrap()
      .then(() => toast.success("Order deleted"))
      .catch((error) => toast.error(error.message || "Failed to delete order"));
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="h6" color="error">{error}</Typography>;

  return (
    <div className="admin-orders-container">
      <Typography variant="h4" gutterBottom>
        All Orders
      </Typography>
      {orders.length === 0 ? (
        <Typography>No orders found</Typography>
      ) : (
        <TableContainer component={Paper} className="orders-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="subtitle1">User Name</Typography></TableCell>
                <TableCell><Typography variant="subtitle1">User Email</Typography></TableCell>
                <TableCell><Typography variant="subtitle1">Products</Typography></TableCell>
                <TableCell><Typography variant="subtitle1">Total Price</Typography></TableCell>
                <TableCell><Typography variant="subtitle1">Status</Typography></TableCell>
                <TableCell><Typography variant="subtitle1">Actions</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
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
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteOrder(order._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default AdminOrders;

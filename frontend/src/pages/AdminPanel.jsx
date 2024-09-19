import React from "react";
import {  Container, Typography, Paper } from "@mui/material";
import AdminOrders from "../components/AdminOrders";
import ProductForm from "../components/AdminProducts";

const AdminPanel = () => {
  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Admin Panel
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          Manage Orders
        </Typography>
        <AdminOrders />
      </Paper>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          Add New Product
        </Typography>
        <ProductForm />
      </Paper>
    </Container>
  );
};

export default AdminPanel;

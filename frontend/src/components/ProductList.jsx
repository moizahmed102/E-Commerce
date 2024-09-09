import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/slices/productSlice";
import { Container, Grid2, Card, CardMedia, CardContent, Typography, CircularProgress, Alert } from "@mui/material";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Products
      </Typography>
      <Grid2 container spacing={3}>
        {products.map((product) => (
          <Grid2 item xs={12} sm={6} md={4} key={product._id}>
            <Card>
              <CardMedia
                component="img"
                height="175"
                image={`http://localhost:4000${product.image}`}
                alt={product.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default ProductList;

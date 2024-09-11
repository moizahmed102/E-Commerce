import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/slices/productSlice";
import { addItemToCart } from "../features/slices/cartSlice";
import {
  Container,
  Grid2,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Drawer,
  Divider
} from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import Category from "./Category";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const queryParams = {
      category: selectedCategory,
      sort: sort || undefined,
    };
    dispatch(fetchProducts(queryParams));
  }, [dispatch, selectedCategory, sort]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  const handleAddToCart = (productId, quantity) => {
    dispatch(addItemToCart({ productId, quantity }));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      <Box display="flex" alignItems="center" mb={2}>
        <IconButton onClick={() => setDrawerOpen(true)} color="primary">
          <FilterListIcon />
        </IconButton>
        <Typography variant="h6" component="div" ml={1}>
          Filters
        </Typography>
      </Box>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box p={2} width="250px" role="presentation">
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>
          <Divider />
          <Box mb={2}>
            <Typography variant="subtitle1" gutterBottom>
              Selected Category: {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
            </Typography>
          </Box>
          <Category onFilterChange={(category) => setSelectedCategory(category)} />
          <TextField
            select
            label="Sort by:"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="low">Price Low to High</MenuItem>
            <MenuItem value="high">Price High to Low</MenuItem>
          </TextField>
        </Box>
      </Drawer>

      <Grid2 container spacing={3}>
        {products.map((product) => (
          <Grid2 item xs={12} sm={6} md={4} key={product._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3, transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
              <CardMedia
                component="img"
                image={`http://localhost:4000${product.image}`}
                alt={product.title}
                sx={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" gutterBottom>
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${product.price}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => handleAddToCart(product._id, 1)} // Adjust quantity as needed
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default ProductList;

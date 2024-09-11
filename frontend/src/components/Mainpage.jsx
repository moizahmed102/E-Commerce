import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Button, Box, Grid2, Card, CardMedia, CardContent, Container, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { fetchProducts } from "../features/slices/productSlice"; // Assuming you have this action in your productSlice

const MainPage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const theme = useTheme(); // Get the theme

  useEffect(() => {
    dispatch(fetchProducts()); // Fetch all products or filter based on the logic you prefer
  }, [dispatch]);

  const featuredProducts = products.slice(0, 4); // Use the first 4 products for the featured section

  return (
    <Container maxWidth="lg" sx={{ padding: 0, marginTop: 0 }}>
      {/* Text and Image Section */}
      <Box 
        mb={5} 
        sx={{ 
          width: '100%', 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          alignItems: 'center', 
          justifyContent: 'space-between',
          backgroundColor: theme.palette.background.paper, // Use theme background color
          borderRadius: '8px',
          padding: 2, // Add padding around the content
          color: theme.palette.text.primary, // Text color for better contrast
          boxSizing: 'border-box' // Ensure padding and border are included in the element's total width and height
        }}
      >
        <Box sx={{ flex: 1, paddingRight: { md: 2 }, textAlign: { xs: 'center', md: 'left' } }}>
          <Typography variant="h4" gutterBottom>
            “Perfume is like a new dress; it makes you quite simply marvelous.” – Estée Lauder
          </Typography>
          <Button variant="contained" color="primary" size="large" component={Link} to="/products">
            Explore Products
          </Button>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', paddingLeft: { md: 2 } }}>
          <img 
            src="/Img7.jpg" 
            alt="Promotion" 
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} // Max width set to 100% and auto height
          />
        </Box>
      </Box>

      {/* Promotion / Sale Section */}
      <Box mb={5} textAlign="center" sx={{ backgroundColor: theme.palette.background.default, padding: '2rem', borderRadius: '8px' }}>
        <Typography variant="h4" gutterBottom>
          Big Sale! Up to 50% off on selected items
        </Typography>
        <Button variant="contained" color="secondary" size="large" component={Link} to="/products">
          Shop Now
        </Button>
      </Box>

      {/* Featured Products Section */}
      <Typography variant="h4" gutterBottom textAlign="center">
        Featured Products
      </Typography>
      <Grid2 container spacing={4}>
        {featuredProducts.map((product) => (
          <Grid2 item xs={12} sm={6} md={3} key={product._id}>
            <Card
              sx={{ 
                boxShadow: 3, 
                transition: '0.3s', 
                '&:hover': { 
                  boxShadow: 6, 
                  transform: 'scale(1.05)' // Enlarge card on hover
                }, 
                cursor: 'pointer', 
                height: '100%' // Ensure cards take up full height of the grid cell
              }}
              component={Link}
              to={`/products/${product._id}`} // Link to product details page
            >
              <CardMedia
                component="img"
                height="200"
                image={`http://localhost:4000${product.image}`} // Ensure the image path is correct
                alt={product.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">{product.title}</Typography>
                <Typography variant="body1" color="primary">${product.price}</Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {/* Link to Products Page */}
      <Box textAlign="center" mt={5}>
        <Button variant="contained" color="primary" size="large" component={Link} to="/products">
          View All Products
        </Button>
      </Box>
    </Container>
  );
};

export default MainPage;

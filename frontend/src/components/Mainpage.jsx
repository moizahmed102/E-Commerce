import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Button,
  Box,
  Grid2,
  Card,
  CardMedia,
  CardContent,
  Container,
  useTheme,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import { fetchProducts } from "../features/slices/productSlice";
import ProductModal from "./ProductModal";

const MainPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const theme = useTheme();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const featuredProducts = products.slice(0, 4);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: 0,
        marginTop: 0,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        mb={5}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: theme.palette.background.paper,
          borderRadius: "8px",
          padding: 2,
          color: theme.palette.text.primary,
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            flex: 1,
            paddingRight: { md: 2 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography variant="h3" gutterBottom>
            Enhance your fragrance journey with our finest perfumes.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Discover our exclusive range of fragrances, designed to bring out
            your inner charm.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/products"
            sx={{
              backgroundColor: theme.palette.primary.main,
              "&:hover": { backgroundColor: theme.palette.primary.dark },
            }}
          >
            Explore Products
          </Button>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            paddingLeft: { md: 2 },
          }}
        >
          <img
            src="/bg2.jpg"
            alt="Promotion"
            style={{
              maxWidth: "100%",
              height: "420px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>

      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h5" sx={{ color: theme.palette.primary.dark }}>
          “Perfume is like a new dress; it makes you quite simply marvelous.” –
          Estée Lauder
        </Typography>
      </Box>

      <Typography variant="h4" gutterBottom textAlign="center">
        Featured Products
      </Typography>
      <Grid2 container spacing={3} sx={{ flexGrow: 1 }}>
        {featuredProducts.map((product) => (
          <Grid2
            item
            xs={12}
            sm={6}
            md={3}
            key={product._id}
            sx={{ display: "flex" }}
          >
            <Card
              sx={{
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": {
                  boxShadow: 6,
                  transform: "scale(1.05)",
                  backgroundColor: theme.palette.background.default,
                },
                cursor: "pointer",
                height: "100%",
                width: "100%",
              }}
              onClick={() => openModal(product)}
            >
              <CardMedia
                component="img"
                height="375px"
                image={`http://localhost:4000${product.image}`}
                alt={product.title}
              />
              <CardContent>
                <Typography variant="h6" component="div" noWrap>
                  {product.title}
                </Typography>
                <Typography variant="body1" color="primary" noWrap>
                  ${product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          open={modalOpen}
          onClose={closeModal}
        />
      )}
    </Container>
  );
};

export default MainPage;

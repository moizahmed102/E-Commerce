import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/slices/productSlice";
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
  TextField,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import ProductModal from "./ProductModal";
import SortIcon from "@mui/icons-material/Sort";

const ProductList = ({ category }) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [sort, setSort] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const queryParams = {
      category,
      sort: sort || undefined,
    };
    dispatch(fetchProducts(queryParams));
  }, [dispatch, category, sort]);

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
    <Container>
      <Box mb={2} display="flex" justifyContent="flex-end" mr={3} mt={2}>
        <TextField
          select
          label="Sort by:"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          variant="outlined"
          sx={{ width: 200 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SortIcon />
                </InputAdornment>
              ),
            },
          }}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="low">Price Low to High</MenuItem>
          <MenuItem value="high">Price High to Low</MenuItem>
        </TextField>
      </Box>

      <Grid2 container spacing={3}>
        {products.map((product) => (
          <Grid2 item xs={12} sm={6} md={4} key={product._id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: 3,
                cursor: "pointer",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
              }}
              onClick={() => openModal(product)}
            >
              <CardMedia
                component="img"
                image={`http://localhost:4000${product.image}`}
                alt={product.title}
                sx={{ width: "100%", height: "370px", objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" gutterBottom noWrap>
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

export default ProductList;

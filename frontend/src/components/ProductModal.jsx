import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  Button,
  Grid2,
  CardMedia,
  TextField,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../features/slices/cartSlice";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

const ProductModal = ({ product, open, onClose }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.info("Please log in to add items to the cart.");
      return;
    }

    try {
      await dispatch(
        addItemToCart({ productId: product._id, quantity })
      ).unwrap();
      toast.success("Item added to cart successfully!");
    } catch (error) {
      toast.error("Failed to add item to cart.");
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="product-modal-title"
      aria-describedby="product-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "text.primary",
          }}
        >
          <CloseIcon />
        </IconButton>
        <Grid2 container spacing={2}>
          <Grid2 item xs={12} sm={6}>
            <CardMedia
              component="img"
              image={`http://localhost:4000${product.image}`}
              alt={product.title}
              sx={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
          </Grid2>
          <Grid2 item xs={12} sm={6}>
            <Typography
              id="product-modal-title"
              variant="h5"
              component="h2"
              gutterBottom
            >
              {product.title}
            </Typography>
            <Typography
              id="product-modal-description"
              variant="body1"
              gutterBottom
            >
              {product.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Category: {product.category.name}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              ${product.price}
            </Typography>
            <Box mt={2}>
              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value)))
                }
                sx={{ mb: 2, width: "100px" }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Modal>
  );
};

export default ProductModal;

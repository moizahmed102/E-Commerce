import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  fetchProducts,
  editProduct,
  removeProduct,
} from "../features/slices/productSlice";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const ProductForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false); 
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

  const dispatch = useDispatch();
  const { loading, error, totalProducts, products } = useSelector(
    (state) => state.products
  );
    // Filter products based on search query
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
  const categories = [
    { id: "66d9868811e6a96f67e13aa5", name: "Men" },
    { id: "66dadedff305f99c187d26f7", name: "Women" },
    { id: "66dadeedf305f99c187d26f9", name: "Kids" },
  ];

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !categoryId || !price) {
      toast.error("Please fill all the fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("categoryId", categoryId);
    formData.append("price", price);

    if (image) {
      formData.append("image", image);
    }

    if (editingProduct) {
      dispatch(
        editProduct({ productId: editingProduct._id, productData: formData })
      )
        .unwrap()
        .then(() => {
          toast.success("Product updated successfully!");
          dispatch(fetchProducts());
          resetForm();
        })
        .catch((error) =>
          toast.error(error.message || "Failed to update product")
        );
    } else {
      dispatch(addProduct(formData))
        .unwrap()
        .then(() => {
          toast.success("Product created successfully!");
          dispatch(fetchProducts());
          resetForm();
        })
        .catch((error) =>
          toast.error(error.message || "Failed to create product")
        );
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategoryId("");
    setPrice("");
    setImage(null);
    setShowForm(false); 
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setTitle(product.title);
    setDescription(product.description);
    setCategoryId(product.categoryId);
    setPrice(product.price);
    setShowForm(true); 
    setEditingProduct(product);
  };

  const handleDeleteClick = (productId) => {
    setProductToDelete(productId);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    dispatch(removeProduct(productToDelete))
      .unwrap()
      .then(() => toast.success("Product deleted successfully"))
      .catch((error) =>
        toast.error(error.message || "Failed to delete product")
      )
      .finally(() => {
        setOpenDeleteDialog(false);
        setProductToDelete(null);
      });
  };
  const handleCancel = () => {
    resetForm(); 
    setShowForm(false); 

  };
  return (
    <Box sx={{ padding: 3, backgroundColor: "#f4f5f7" }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: 4 }}>
        Admin Product Management
      </Typography>

      <Box sx={{ display: "flex", gap: 3 }}>
        <Card
          sx={{
            width: 250,
            backgroundColor: "#fff",
            borderRadius: 3,
            boxShadow: 4,
          }}
        >
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Total Products
            </Typography>
            <Typography variant="h3" color="primary">
              {totalProducts || 0}
            </Typography>
            <Button
  variant="contained"
  color="primary"
  sx={{ marginTop: 3 }}
  onClick={() => {
    setShowForm(true); 
    setEditingProduct(null); 
  }}
  startIcon={<AddCircleOutlineIcon />}
>
  Add Product
</Button>

          </CardContent>
        </Card>
      </Box>

      <Dialog open={showForm} onClose={handleCancel}>
        <DialogTitle>
          {editingProduct ? "Edit Product" : "Create a New Product"}
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            sx={{ mt: 2 }}
          >
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={3}
              required
              sx={{ marginBottom: 2 }}
            />
            <FormControl fullWidth required sx={{ marginBottom: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryId || ""}
                onChange={(e) => setCategoryId(e.target.value)}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              required
              sx={{ marginBottom: 2 }}
            />
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ marginBottom: 2 }}
            >
              Upload Image
              <input type="file" hidden onChange={handleImageChange} />
            </Button>
            {image && (
              <Typography variant="body2" sx={{ marginBottom: 2 }}>
                Selected Image: {image.name}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              {loading
                ? editingProduct
                  ? "Updating..."
                  : "Creating..."
                : editingProduct
                ? "Update Product"
                : "Create Product"}
            </Button>
            {error && (
              <Typography
                variant="body2"
                color="error"
                align="center"
                sx={{ marginTop: 2 }}
              >
                {error}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 4, marginTop: 4 }}>
  <TextField
    label="Search by Title"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)} 
    fullWidth
    sx={{ maxWidth: 400 }}
  />
</Box>

      <Box sx={{ marginTop: 4 }}>
        {filteredProducts.map((product) => (
          <Card
            key={product._id}
            sx={{
              marginBottom: 2,
              backgroundColor: "#fff",
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <CardContent>
            <CardMedia
                component="img"
                image={`http://localhost:4000${product.image}`}
                alt={product.title}
                sx={{ width: 100, height: 100, objectFit: "cover", marginRight: 2 }}
              />
              <Typography variant="h6">{product.title}</Typography>
              <Typography>{product.description}</Typography>
              <Typography>{`Category: ${product.category.name}`}</Typography>
              <Typography>{`Price: $${product.price}`}</Typography>
              <Box
                sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
              >
                <IconButton color="primary" onClick={() => handleEdit(product)}>
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => handleDeleteClick(product._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this product?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductForm;

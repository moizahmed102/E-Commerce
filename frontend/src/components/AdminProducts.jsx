import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, fetchProducts, editProduct, removeProduct } from "../features/slices/productSlice";
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
  IconButton,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const ProductForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  const dispatch = useDispatch();
  const { loading, error, totalProducts, products } = useSelector((state) => state.products);

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
      dispatch(editProduct({ productId: editingProduct._id, productData: formData }))
        .unwrap()
        .then(() => {
          toast.success("Product updated successfully!");
          setEditingProduct(null);
        })
        .catch((error) => toast.error(error.message || "Failed to update product"));
    } else {
      dispatch(addProduct(formData))
        .unwrap()
        .then(() => {
          toast.success("Product created successfully!");
        })
        .catch((error) => toast.error(error.message || "Failed to create product"));
    }
    
    resetForm();
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

  const handleDelete = (productId) => {
    dispatch(removeProduct(productId))
      .unwrap()
      .then(() => toast.success("Product deleted successfully"))
      .catch((error) => toast.error(error.message || "Failed to delete product"));
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f4f5f7' }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: 4 }}>
        Admin Product Management
      </Typography>
      
      <Box sx={{ display: "flex", gap: 3 }}>
        <Card sx={{ width: 250, backgroundColor: '#fff', borderRadius: 3, boxShadow: 4 }}>
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
              onClick={() => setShowForm(!showForm)}
              startIcon={<AddCircleOutlineIcon />}
            >
              {showForm ? "Hide Form" : "Add Product"}
            </Button>
          </CardContent>
        </Card>

        {showForm && (
          <Box
            component="form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            sx={{
              flex: 1,
              padding: 3,
              backgroundColor: '#fff',
              borderRadius: 3,
              boxShadow: 4,
            }}
          >
            <Typography variant="h5" align="center" gutterBottom>
              {editingProduct ? "Edit Product" : "Create a New Product"}
            </Typography>

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
            <Button variant="outlined" component="label" fullWidth sx={{ marginBottom: 2 }}>
              Upload Image
              <input type="file" hidden onChange={handleImageChange} />
            </Button>
            {image && <Typography variant="body2" sx={{ marginBottom: 2 }}>Selected Image: {image.name}</Typography>}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              {loading ? (editingProduct ? "Updating..." : "Creating...") : (editingProduct ? "Update Product" : "Create Product")}
            </Button>
            {error && (
              <Typography variant="body2" color="error" align="center" sx={{ marginTop: 2 }}>
                {error}
              </Typography>
            )}
          </Box>
        )}
      </Box>

      <Box sx={{ marginTop: 4 }}>
        {products.map((product) => (
          <Card key={product._id} sx={{ marginBottom: 2, backgroundColor: '#fff', borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">{product.title}</Typography>
              <Typography>{product.description}</Typography>
              <Typography>{`Price: $${product.price}`}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <IconButton color="primary" onClick={() => handleEdit(product)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(product._id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ProductForm;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../features/slices/productSlice";
import { toast } from "react-toastify";
import { Box, Button, TextField, Select, MenuItem, InputLabel, FormControl, Typography, CircularProgress } from "@mui/material";

const ProductForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.products);

  const categories = [
    { id: "66d9868811e6a96f67e13aa5", name: "Men" },
    { id: "66dadedff305f99c187d26f7", name: "Women" },
    { id: "66dadeedf305f99c187d26f9", name: "Kids" },
  ];

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !categoryId || !price || !image) {
      toast.error("Please fill all the fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("categoryId", categoryId);
    formData.append("price", price);
    formData.append("image", image);

    dispatch(addProduct(formData))
      .unwrap()
      .then(() => {
        toast.success("Product created successfully!");
        setTitle("");
        setDescription("");
        setCategoryId("");
        setPrice("");
        setImage(null);
      })
      .catch((error) => toast.error(error.message || "Failed to create product"));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      sx={{ 
        maxWidth: 500, 
        margin: "auto", 
        padding: 2, 
        display: "flex", 
        flexDirection: "column", 
        gap: 2, 
        backgroundColor: "#f9f9f9", 
        borderRadius: 2,
        boxShadow: 3 
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Create a New Product
      </Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={3}
        required
      />
      <FormControl fullWidth required>
        <InputLabel>Category</InputLabel>
        <Select
          value={categoryId}
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
      />
      <Button
        variant="contained"
        component="label"
        fullWidth
      >
        Upload Image
        <input type="file" hidden onChange={handleImageChange} />
      </Button>
      {image && <Typography variant="body2">Selected Image: {image.name}</Typography>}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
        startIcon={loading && <CircularProgress size={20} />}
      >
        {loading ? "Creating..." : "Create Product"}
      </Button>
      {error && (
        <Typography variant="body2" color="error" align="center" sx={{ marginTop: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default ProductForm;

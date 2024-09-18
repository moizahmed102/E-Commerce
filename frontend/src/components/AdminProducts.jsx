import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, modifyProduct, removeProduct } from '../features/slices/adminSlice';
import { Button, TextField, List, ListItem, ListItemText } from '@mui/material';

const AdminProduct = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.admin);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  const handleAddProduct = () => {
    dispatch(addProduct({ title, description, category, price }));
    setTitle('');
    setDescription('');
    setCategory('');
    setPrice('');
  };

  const handleUpdateProduct = () => {
    if (editing) {
      dispatch(modifyProduct({ productId: editing._id, productData: { title, description, category, price } }));
      setEditing(null);
      setTitle('');
      setDescription('');
      setCategory('');
      setPrice('');
    }
  };

  const handleDeleteProduct = (productId) => {
    dispatch(removeProduct(productId));
  };

  return (
    <div>
      <h2>Admin Product Management</h2>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
      />
      <TextField
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
      />
      <TextField
        label="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        fullWidth
        type="number"
      />
      <Button onClick={editing ? handleUpdateProduct : handleAddProduct}>
        {editing ? 'Update Product' : 'Add Product'}
      </Button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <List>
        {products.map((product) => (
          <ListItem key={product._id}>
            <ListItemText primary={product.title} secondary={`Price: $${product.price}`} />
            <Button onClick={() => setEditing(product)}>Edit</Button>
            <Button onClick={() => handleDeleteProduct(product._id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default AdminProduct;

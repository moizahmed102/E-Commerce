import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../features/slices/authSlice';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }
    dispatch(signup(formData));
  };

  if (isAuthenticated) {
    navigate('/profile');
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        type="text"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
      <TextField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Sign Up
      </Button>
    </form>
  );
};

export default Signup;

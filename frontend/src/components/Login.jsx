import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/slices/authSlice';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  if (isAuthenticated) {
    navigate('/profile');
  }

  return (
    <form onSubmit={handleSubmit}>
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
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Login
      </Button>
    </form>
  );
};

export default Login;

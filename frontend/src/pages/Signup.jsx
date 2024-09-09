import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../features/slices/authSlice';
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
      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;

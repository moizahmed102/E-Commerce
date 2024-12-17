import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, clearError } from "../features/slices/authSlice";
import { TextField, Button, Container, Typography, Box, Link } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, error } = useSelector((state) => state.auth);

  const redirectPath = location.state?.from?.pathname || "/products";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[a-zA-Z\s]+$/;

  const validateField = (name, value) => {
    let tempErrors = { ...errors };

    switch (name) {
      case "name":
        tempErrors.name = !value ? "Name is required" : !nameRegex.test(value) ? "Name must contain only letters" : "";
        break;
      case "email":
        tempErrors.email = !value ? "Email is required" : !emailRegex.test(value) ? "Invalid email format" : "";
        break;
      case "password":
        tempErrors.password = !value ? "Password is required" : value.length < 6 ? "Password must be at least 6 characters" : "";
        break;
      case "confirmPassword":
        tempErrors.confirmPassword = value !== formData.password ? "Passwords do not match" : "";
        break;
      default:
        break;
    }
    setErrors(tempErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateForm = () => {
    let tempErrors = {};

    if (!formData.name) tempErrors.name = "Name is required";
    else if (!nameRegex.test(formData.name)) tempErrors.name = "Name must contain only letters";

    if (!formData.email) tempErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) tempErrors.email = "Invalid email format";

    if (!formData.password) tempErrors.password = "Password is required";
    else if (formData.password.length < 6) tempErrors.password = "Password must be at least 6 characters";

    if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = "Passwords do not match";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await dispatch(signup(formData)).unwrap();
      toast.success("Signup successful!");
    } catch (err) {
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate(redirectPath, { replace: true });
  }, [isAuthenticated, navigate, redirectPath]);

  useEffect(() => {
    if (error) {
      toast.error(error, { autoClose: 2000 });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 4, borderRadius: 2, boxShadow: 3, mt: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>Sign Up</Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            onChange={handleChange}
            value={formData.name}
            error={!!errors.name}
            helperText={errors.name}
            FormHelperTextProps={{ style: { color: errors.name ? "red" : "green" } }}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            onChange={handleChange}
            value={formData.email}
            error={!!errors.email}
            helperText={errors.email}
            FormHelperTextProps={{ style: { color: errors.email ? "red" : "green" } }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            onChange={handleChange}
            value={formData.password}
            error={!!errors.password}
            helperText={errors.password}
            FormHelperTextProps={{ style: { color: errors.password ? "red" : "green" } }}
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            margin="normal"
            onChange={handleChange}
            value={formData.confirmPassword}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            FormHelperTextProps={{ style: { color: errors.confirmPassword ? "red" : "green" } }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Sign Up</Button>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" align="center">Already have an account? <Link href="/login">Login</Link></Typography>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;

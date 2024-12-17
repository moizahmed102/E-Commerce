import React from "react";
import { useSelector } from "react-redux";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (token) {
    return children;
  }

  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h6" mb={2}>
        You need to be logged in to access this page.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/signup")}
        sx={{ mx: 1 }}
      >
        Sign Up
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
    </Box>
  );
};

export default PrivateRoute;

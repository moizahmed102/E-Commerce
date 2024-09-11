import React from "react";
import { useSelector } from "react-redux";
import { Button, Typography, Box } from "@mui/material";

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  if (token) {
    return children;
  }

  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h6" mb={2}>
        You need to be logged in to access this page. Sign Up now to order.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => (window.location.href = "/")}
      >
        Create an Account
      </Button>
    </Box>
  );
};

export default PrivateRoute;

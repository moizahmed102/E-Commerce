import React from "react";
import { AppBar, Toolbar, Button, Box, IconButton, useTheme, Badge } from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";

const Header = () => {
  const theme = useTheme();
  const { cart } = useSelector((state) => state.cart);

  // Ensure that cart.orderItems is an array, even if it's undefined or null
  const totalItems = cart?.orderItems?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
          boxShadow: theme.shadows[1],
          zIndex: theme.zIndex.appBar,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", padding: "0 16px" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <img
                src="/logo.png"
                alt="Logo"
                style={{ height: "45px", marginRight: "16px", borderRadius: "10px" }}
              />
            </Box>

            <Button
              component={Link}
              to="/products"
              sx={{
                color: theme.palette.common.white,
                textTransform: "none",
                marginRight: "16px",
              }}
            >
              Products
            </Button>

            <Button
              component={Link}
              to="/men"
              sx={{
                color: theme.palette.common.white,
                textTransform: "none",
                marginRight: "16px",
              }}
            >
              Men
            </Button>
            <Button
              component={Link}
              to="/women"
              sx={{
                color: theme.palette.common.white,
                textTransform: "none",
                marginRight: "16px",
              }}
            >
              Women
            </Button>
            <Button
              component={Link}
              to="/kids"
              sx={{
                color: theme.palette.common.white,
                textTransform: "none",
                marginRight: "16px",
              }}
            >
              Kids
            </Button>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              component={Link}
              to="/cart"
              sx={{ mx: 1 }}
            >
              {/* Ensure the badge displays 0 if there are no items */}
              <Badge badgeContent={totalItems || 0} color="secondary" showZero>
                <ShoppingCartIcon sx={{ color: theme.palette.common.white }} />
              </Badge>
            </IconButton>

            <IconButton
              color="inherit"
              component={Link}
              to="/profile"
              sx={{ mx: 1 }}
            >
              <AccountCircleIcon sx={{ color: theme.palette.common.white }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ height: "64px" }}></Box>
    </>
  );
};

export default Header;

// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#003366", // Dark blue color
    },
    secondary: {
      main: "#ffffff", // White color for background or secondary elements
    },
    background: {
      default: "#ffffff", // White background for the entire app
      paper: "#ffffff", // White background for paper components like Card
    },
    text: {
      primary: "#000000", // Black text color for readability
      secondary: "#666666", // Dark gray text color for secondary text
    },
    // You can add more customizations here
  },
  typography: {
    // Customize typography as needed
    h6: {
      fontWeight: "bold",
    },
  },
  components: {
    // Example: customize the AppBar component
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#003366", // Dark blue color
          color: "#ffffff",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Light shadow for subtle depth
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff", // White background for cards
        },
      },
    },
  },
});

export default theme;

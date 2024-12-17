import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#003366",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#666666",
    },
  },
  typography: {
    h6: {
      fontWeight: "bold",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
        },
      },
    },
  },
});

export default theme;

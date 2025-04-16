import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Blue
    },
    warning: {
      main: "#ffa000", // Orange
    },
    error: {
      main: "#d32f2f", // red
    },
    success: {
      main: "#388e3c", // green
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;

import { CircularProgress, Box, Typography } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box textAlign="center">
        <CircularProgress size={50} color="primary" />
        <Typography variant="h6" marginTop={2}>
          Loading...
        </Typography>
      </Box>
    </Box>
  );
};

export default LoadingSpinner;

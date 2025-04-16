import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Link,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink } from "react-router-dom";
import { registerUser } from "../../api/users"; // Assuming you have a register function in the api/user file
import { useState } from "react";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

type FormData = z.infer<typeof schema>;

const RegisterPage = () => {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await registerUser(data);

      if (response.name) {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setApiError("Error: " + (error as Error).message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2} direction="column">
          {/* Show error message from the catch block */}
          {apiError && <Alert severity="error">{apiError}</Alert>}

          <TextField
            label="Name"
            fullWidth
            {...formRegister("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            required
            sx={{ minWidth: "400px" }}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            {...formRegister("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            required
            sx={{ minWidth: "400px" }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            {...formRegister("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            required
            sx={{ minWidth: "400px" }}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Register
          </Button>
        </Grid>
      </form>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Already have an account?{" "}
        <Link component={RouterLink} to="/login">
          Login here
        </Link>
      </Typography>
    </Container>
  );
};

export default RegisterPage;

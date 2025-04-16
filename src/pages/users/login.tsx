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
import { loginUser } from "../../api/users";
import { useContext, useState } from "react";
import { AuthContext } from "../../auth/context/auth.context";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

type FormData = z.infer<typeof schema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [apiError, setApiError] = useState<string | null>(null);

  const { login } = useContext(AuthContext)!;

  const onSubmit = async (data: FormData) => {
    try {
      const response = await loginUser(data);
      console.log(response);
      if (response.token) {
        login(response.token, "/tasks");
      }
    } catch (error) {
      console.error("Login error:", error);
      setApiError("Error: " + (error as Error).message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2} direction="column">
          {/* Show error message from the catch block */}
          {apiError && <Alert severity="error">{apiError}</Alert>}

          <TextField
            label="Email"
            type="email"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            required
            sx={{ minWidth: "400px" }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            required
            sx={{ minWidth: "400px" }}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Login
          </Button>
        </Grid>
      </form>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don't have an account?{" "}
        <Link component={RouterLink} to="/register">
          Register here
        </Link>
      </Typography>
    </Container>
  );
};

export default LoginPage;

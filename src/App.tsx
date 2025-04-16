import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Suspense, lazy } from "react"; // Import Suspense and lazy
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { AuthProvider } from "./auth/context/auth.provider";
import LoadingSpinner from "./components/loading-spinner";
import ProfilePage from "./pages/users/profile";

// Lazy load your components
const LoginPage = lazy(() => import("./pages/users/login"));
const RegisterPage = lazy(() => import("./pages/users/register"));
const TasksPage = lazy(() => import("./pages/tasks/main"));

// Define your router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/tasks",
    element: <TasksPage />,
  },
]);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <RouterProvider router={router} />
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

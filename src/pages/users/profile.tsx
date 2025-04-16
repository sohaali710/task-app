import { useEffect, useState } from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import { User } from "../../types/users";
import { getUserData } from "../../api/users";

const ProfilePage = () => {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData(); // this should return a User object
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Container sx={{ mt: 5, height: "100vh" }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 5 }}>
        User Profile
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mt: 2, textAlign: "left" }}>
        {userData ? (
          <Box>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Name: {userData.name}
            </Typography>

            <Typography variant="h6">Email: {userData.email}</Typography>
          </Box>
        ) : (
          <Typography variant="body1" color="error">
            No user information found.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ProfilePage;

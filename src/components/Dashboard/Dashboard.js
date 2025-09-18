import React from "react";
import { Container, Box, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("mm_currentUser"); // remove logged-in user
    navigate("/"); // go back to login
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Welcome! Choose an option below:
        </Typography>

        <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => navigate("/songs")}
            >
              Song List
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              onClick={() => navigate("/add-song")}
            >
              Add Song
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

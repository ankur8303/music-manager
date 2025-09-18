import React from "react";
import { Container, Box, Typography, Grid, Card, CardContent, CardActionArea } from "@mui/material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("mm_currentUser");
    navigate("/");
  };

  const user = JSON.parse(localStorage.getItem("mm_currentUser"));

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        p: 4,
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            textAlign: "center",
            mb: 6,
            color: "#fff",
            textShadow: "1px 1px 6px rgba(0,0,0,0.3)",
          }}
        >
          <Typography variant="h3" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="h6">
            Welcome {user?.email || "User"}! Choose an option below:
          </Typography>
        </Box>

        <Grid container spacing={5} justifyContent="center">
          {/* Song List */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                textAlign: "center",
                p: 3,
                borderRadius: 3,
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": { transform: "translateY(-5px)", boxShadow: "0 12px 40px rgba(0,0,0,0.35)" },
              }}
            >
              <CardActionArea onClick={() => navigate("/songs")}>
                <LibraryMusicIcon sx={{ fontSize: 70, color: "#4fc3f7" }} />
                <CardContent>
                  <Typography variant="h6" sx={{ color: "#fff" }}>
                    Song List
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* Add Song */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                textAlign: "center",
                p: 3,
                borderRadius: 3,
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": { transform: "translateY(-5px)", boxShadow: "0 12px 40px rgba(0,0,0,0.35)" },
              }}
            >
              <CardActionArea onClick={() => navigate("/add-song")}>
                <AddCircleIcon sx={{ fontSize: 70, color: "#81c784" }} />
                <CardContent>
                  <Typography variant="h6" sx={{ color: "#fff" }}>
                    Add Song
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* Logout */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                textAlign: "center",
                p: 3,
                borderRadius: 3,
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": { transform: "translateY(-5px)", boxShadow: "0 12px 40px rgba(0,0,0,0.35)" },
              }}
            >
              <CardActionArea onClick={handleLogout}>
                <LogoutIcon sx={{ fontSize: 70, color: "#f06292" }} />
                <CardContent>
                  <Typography variant="h6" sx={{ color: "#fff" }}>
                    Logout
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

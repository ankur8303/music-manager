import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("mm_currentUser"));
    if (currentUser) navigate("/dashboard");
  }, [navigate]);

  const handleSubmit = () => {
    const users = JSON.parse(localStorage.getItem("mm_users") || "[]");
    const user = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (!user) {
      alert("Invalid credentials. Please sign up first or try dummy login.");
      return;
    }

    dispatch(login({ email: user.email }));
    localStorage.setItem("mm_currentUser", JSON.stringify({ email: user.email }));

    navigate("/dashboard");
  };

  const handleDummyLogin = () => {

    const dummyUser = { email: "test@example.com", password: "123456" };
    dispatch(login({ email: dummyUser.email }));
    localStorage.setItem("mm_currentUser", JSON.stringify({ email: dummyUser.email }));
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        minHeight: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        p: 2,
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backdropFilter: "blur(15px)",
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: 4,
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          p: 4,
          color: "#fff",
        }}
      >
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3 }}>
          Login
        </Typography>

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{ style: { color: "#fff" } }}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{ style: { color: "#fff" } }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, backgroundColor: "#4fc3f7" }}
          onClick={handleSubmit}
        >
          Login
        </Button>

        <Button
          variant="outlined"
          fullWidth
          sx={{ mt: 1, borderColor: "#fff", color: "#fff" }}
          onClick={() => navigate("/signup")}
        >
          Create Account
        </Button>

        <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.3)" }}>or</Divider>

        <Button
          variant="contained"
          fullWidth
          sx={{ backgroundColor: "#81c784" }}
          onClick={handleDummyLogin}
        >
          Login as Dummy User
        </Button>
      </Container>
    </Box>
  );
}

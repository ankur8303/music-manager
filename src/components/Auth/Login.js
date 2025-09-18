import React, { useState } from "react";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    // get registered users from localStorage
    const users = JSON.parse(localStorage.getItem("mm_users") || "[]");
    const user = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (!user) {
      alert("Invalid credentials or user not found. Please sign up first.");
      return;
    }

    // store logged-in user in Redux + localStorage
    dispatch(login({ email: user.email }));
    navigate("/songs"); // redirect to Song List page
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Login
        </Button>

        <Button
          variant="text"
          fullWidth
          sx={{ mt: 1 }}
          onClick={() => navigate("/signup")}
        >
          Create account
        </Button>
      </Box>
    </Container>
  );
}

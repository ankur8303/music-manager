import React, { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

export default function SignUp() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!form.email || !form.password) return alert("All fields required!");
    localStorage.setItem("user", JSON.stringify(form));
    dispatch(login(form));
  };

  return (
    <Container maxWidth="xs">
      <h2>Sign Up</h2>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <Button fullWidth variant="contained" onClick={handleSubmit}>
        Sign Up
      </Button>
    </Container>
  );
}

import React, { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { addSong } from "../../redux/songSlice";

export default function AddSong() {
  const [song, setSong] = useState({ id: Date.now(), title: "", singer: "", year: "" });
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!song.title || !song.singer) return alert("Fill all details!");
    dispatch(addSong(song));
  };

  return (
    <Container maxWidth="sm">
      <h2>Add New Song</h2>
      <TextField label="Title" fullWidth margin="normal" onChange={(e) => setSong({ ...song, title: e.target.value })}/>
      <TextField label="Singer" fullWidth margin="normal" onChange={(e) => setSong({ ...song, singer: e.target.value })}/>
      <TextField label="Year" type="number" fullWidth margin="normal" onChange={(e) => setSong({ ...song, year: e.target.value })}/>
      <Button variant="contained" fullWidth onClick={handleSubmit}>Save</Button>
    </Container>
  );
}

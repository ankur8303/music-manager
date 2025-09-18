import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addSong, editSong } from "../../redux/songSlice";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddSong() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("mm_currentUser"));
  const editingSong = location.state?.song;

  const [song, setSong] = useState(
    editingSong || { id: Date.now(), title: "", singer: "", year: "" }
  );

  const handleSubmit = () => {
    if (!song.title || !song.singer || !song.year)
      return alert("Please fill all fields!");

    const newSong = { ...song, owner: currentUser.email };
    if (editingSong) {
      dispatch(editSong(newSong));
      const allSongs = JSON.parse(localStorage.getItem("mm_songs") || "[]");
      const updatedSongs = allSongs.map((s) =>
        s.id === newSong.id ? newSong : s
      );
      localStorage.setItem("mm_songs", JSON.stringify(updatedSongs));
    } else {
      dispatch(addSong(newSong));

      const allSongs = JSON.parse(localStorage.getItem("mm_songs") || "[]");
      allSongs.push(newSong);
      localStorage.setItem("mm_songs", JSON.stringify(allSongs));
    }

    navigate("/songs");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box
        sx={{
          backdropFilter: "blur(15px)",
          backgroundColor: "rgba(255,255,255,0.1)",
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          {editingSong ? "Edit Song" : "Add New Song"}
        </Typography>

        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={song.title}
          onChange={(e) => setSong({ ...song, title: e.target.value })}
        />

        <TextField
          label="Singer"
          fullWidth
          margin="normal"
          value={song.singer}
          onChange={(e) => setSong({ ...song, singer: e.target.value })}
        />

        <TextField
          label="Year"
          type="number"
          fullWidth
          margin="normal"
          value={song.year}
          onChange={(e) => setSong({ ...song, year: e.target.value })}
        />
        <TextField
          type="file"
          fullWidth
          margin="normal"
          inputProps={{ accept: "audio/*" }}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const url = URL.createObjectURL(file); // temporary URL
              setSong({ ...song, url });
            }
          }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          {editingSong ? "Update Song" : "Save Song"}
        </Button>
      </Box>
    </Container>
  );
}

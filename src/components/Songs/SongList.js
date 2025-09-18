import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteSong } from "../../redux/songSlice";
import {TextField, Container, Grid } from "@mui/material";
import SongCard from "./SongCard";

export default function SongList() {
  const songs = useSelector((state) => state.songs.list);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const filteredSongs = songs.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <h2>My Songs</h2>
      <TextField
        label="Search by Title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
      />
      <Grid container spacing={2}>
        {filteredSongs.map((song) => (
          <Grid item xs={12} sm={6} md={4} key={song.id}>
            <SongCard
              song={song}
              onDelete={() => dispatch(deleteSong(song.id))}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

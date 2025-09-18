import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";

export default function SongCard({ song, onDelete, onEdit }) {
  return (
    <Card
      sx={{
        p: 2,
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255,255,255,0.1)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography variant="h6">{song.title}</Typography>
        <Typography>Singer: {song.singer}</Typography>
        <Typography>Year: {song.year}</Typography>
      </CardContent>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button size="small" variant="outlined" onClick={onEdit} sx={{ color: "#4fc3f7", borderColor: "#4fc3f7" }}>
          Edit
        </Button>
        <Button size="small" variant="contained" color="error" onClick={onDelete}>
          Delete
        </Button>
      </Box>
    </Card>
  );
}

import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
  TablePagination,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteSong } from "../../redux/songSlice";
import { useNavigate } from "react-router-dom";

export default function SongList() {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(15); // max 15 items per page
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("mm_currentUser"));

  useEffect(() => {
    // Load user's songs from localStorage
    const allSongs = JSON.parse(localStorage.getItem("mm_songs") || "[]");
    const userSongs = allSongs.filter((s) => s.owner === currentUser.email);
    setSongs(userSongs);
  }, []);

  const handleDelete = (id) => {
    const updatedSongs = songs.filter((s) => s.id !== id);
    setSongs(updatedSongs);

    // Update Redux
    dispatch(deleteSong(id));

    // Update localStorage
    const allSongs = JSON.parse(localStorage.getItem("mm_songs") || "[]");
    const remainingSongs = allSongs.filter((s) => s.id !== id);
    localStorage.setItem("mm_songs", JSON.stringify(remainingSongs));
  };

  const handleEdit = (song) => {
    navigate("/add-song", { state: { song } });
  };

  const filteredSongs = songs.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        p: 4,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          backdropFilter: "blur(15px)",
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          p: 4,
          color: "#fff",
        }}
      >
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <Typography variant="h4">My Songs</Typography>
        </Box>

        <TextField
          label="Search by Title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{
            mb: 3,
            input: { color: "#fff" },
            label: { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "rgba(255,255,255,0.5)" },
              "&:hover fieldset": { borderColor: "#81c784" },
              "&.Mui-focused fieldset": { borderColor: "#4fc3f7" },
            },
          }}
        />

        <TableContainer
          component={Paper}
          sx={{
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255,255,255,0.1)",
            color: "#fff",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>#</TableCell>
                <TableCell sx={{ color: "#fff" }}>Title</TableCell>
                <TableCell sx={{ color: "#fff" }}>Singer</TableCell>
                <TableCell sx={{ color: "#fff" }}>Year</TableCell>
                <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSongs
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((song, index) => (
                  <TableRow key={song.id} hover>
                    <TableCell sx={{ color: "#fff" }}>{index + 1 + page * rowsPerPage}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{song.title}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{song.singer}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{song.year}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(song)} sx={{ color: "#4fc3f7" }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(song.id)} sx={{ color: "#f06292" }}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredSongs.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
          sx={{
            color: "#fff",
            mt: 2,
            "& .MuiTablePagination-toolbar": { color: "#fff" },
          }}
        />
      </Container>
    </Box>
  );
}

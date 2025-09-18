import { createSlice } from "@reduxjs/toolkit";

const songSlice = createSlice({
  name: "songs",
  initialState: { list: [] },
  reducers: {
    addSong: (state, action) => { state.list.push(action.payload); },
    editSong: (state, action) => {
      const index = state.list.findIndex(s => s.id === action.payload.id);
      if (index >= 0) state.list[index] = action.payload;
    },
    deleteSong: (state, action) => {
      state.list = state.list.filter(s => s.id !== action.payload);
    },
  },
});

export const { addSong, editSong, deleteSong } = songSlice.actions;
export default songSlice.reducer;

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import SongList from "./components/Songs/SongList";
import AddSong from "./components/Songs/AddSong";
import { isLoggedIn } from "./components/utils/auth";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import Layout from "./Layout/Layout";

// 🔹 Seed dummy user + songs into localStorage
const seedDummyData = () => {
  // Dummy user
  const users = JSON.parse(localStorage.getItem("mm_users") || "[]");
  if (users.length === 0) {
    users.push({ email: "test@example.com", password: "123456" });
    localStorage.setItem("mm_users", JSON.stringify(users));
  }

  // Dummy songs
  const songs = JSON.parse(localStorage.getItem("mm_songs") || "[]");
  if (songs.length === 0) {
    localStorage.setItem(
      "mm_songs",
      JSON.stringify([
        {
          id: "1",
          title: "Shape of You",
          singer: "Ed Sheeran",
          year: 2017,
          url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          owner: "test@example.com",
        },
        {
          id: "2",
          title: "Blinding Lights",
          singer: "The Weeknd",
          year: 2019,
          url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          owner: "test@example.com",
        },
      ])
    );
  }
};
seedDummyData();

function App() {
  console.log("isLoggedIn::", isLoggedIn());
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}

          <Route
            path="/"
            element={
              <Layout>
                {isLoggedIn() ? <Navigate to="/dashboard" /> : <Login />}
              </Layout>
            }
          />
          <Route
            path="/signup"
            element={
              <Layout>
                {isLoggedIn() ? <Navigate to="/dashboard" /> : <SignUp />}
              </Layout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/songs"
            element={
              <ProtectedRoute>
                <Layout>
                  <SongList />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-song"
            element={
              <ProtectedRoute>
                <Layout>
                  <AddSong />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
export default App;

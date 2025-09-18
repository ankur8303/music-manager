// components/Layout/Layout.js
import React from "react";
import { Box, Container } from "@mui/material";

export default function Layout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(253, 250, 250, 0.96)",
          zIndex: 0,
        },
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 1,
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: 4,
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          p: 4,
        }}
      >
        {children}
      </Container>
    </Box>
  );
}

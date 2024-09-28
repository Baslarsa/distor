import express from "express";
import songRoutes from "./routes/songRoutes";
import playlistRoutes from "./routes/playlistRoutes";
import audioRoutes from "./routes/audioRoutes";
import artistRoutes from "./routes/artistRoutes";
import cors from "cors";

const app = express();
app.use(express.json());
// CORS options

// Use CORS with options for all routes
app.use(cors());

// Use the imported routes
app.use("/api", songRoutes);
app.use("/api", playlistRoutes);
app.use("/api", audioRoutes);
app.use("/api", artistRoutes);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

server.keepAliveTimeout = 120000; // 120 seconds
server.headersTimeout = 120000; // 120 seconds

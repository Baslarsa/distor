import express from "express";
import songRoutes from "./routes/songRoutes";
import playlistRoutes from "./routes/playlistRoutes";
import audioRoutes from "./routes/audioRoutes";
import cors from "cors";

const app = express();
app.use(express.json());
// CORS options
const corsOptions = {
  origin: "http://localhost:3000", // Allow only your frontend origin
};

// Use CORS with options for all routes
app.use(cors(corsOptions));

// Use the imported routes
app.use(songRoutes);
app.use(playlistRoutes);
app.use(audioRoutes);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

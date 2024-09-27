import express from "express";
import songRoutes from "./routes/songRoutes";
import playlistRoutes from "./routes/playlistRoutes";
import audioRoutes from "./routes/audioRoutes";
import artistRoutes from "./routes/artistRoutes";
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
app.use("/api", songRoutes);
app.use("/api", playlistRoutes);
app.use("/api", audioRoutes);
app.use("/api", artistRoutes);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

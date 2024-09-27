import { Artist, Song } from "@prisma/client";
import axiosClient from "../apiClient";
import { SongAndArtist } from "../../types";

export async function getSongs(
  onError: (message: string) => void
): Promise<{ songs: SongAndArtist[] }> {
  try {
    const response = await axiosClient.get("/api/songs");
    // Process response if necessary
    return response.data; // Assuming the songs are directly in data
  } catch (error) {
    console.error("Failed to fetch songs:", error);
    onError("Could not fetch songs");
    // Optionally, re-throw or handle the error based on your error handling strategy
    throw error;
  }
}

export async function createSong(
  data: Song,
  onError: (message: string) => void
): Promise<any> {
  try {
    const response = await axiosClient.post("/api/song", data); // axiosClient should handle JSON.stringify internally
    // Process response if necessary
    return response.data;
  } catch (error) {
    console.error("Failed to create song:", error);
    onError("Could not create song");
    // Handle or re-throw the error as needed
    throw error;
  }
}

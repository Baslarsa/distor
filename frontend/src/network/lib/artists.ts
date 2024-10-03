//Get artists

import { Artist } from "@prisma/client";
import { getPlaylists } from "./playlist";
import axiosClient from "../apiClient";

export async function getArtists(
  onError: (message: string) => void
): Promise<{ artists: Artist[] }> {
  try {
    const response = await axiosClient.get("/api/artists");
    // Process response if necessary
    return response.data; // Assuming the artists are directly in data
  } catch (error) {
    console.error("Failed to fetch artists:", error);
    onError("Could not fetch artists");
    // Optionally, re-throw or handle the error based on your error handling strategy
    throw error;
  }
}

export async function createArtist(
  { name }: { name: string },
  onError: (message: string) => void
) {
  try {
    const response = await axiosClient.post("/api/artist", { name });
    return response.data;
  } catch (error) {
    console.error("Failed to create artist:", error);
    onError("Could not create artist");
  }
}

// Add song to playlist

import { Playlist } from "@prisma/client";
import axiosClient from "../apiClient";
import { toast } from "react-toastify";
import { PlaylistAndSongs } from "../../types";

export async function addSongToPlaylist(
  playlistId: string,
  songIds: string,
  onError: (message: string) => void
): Promise<Playlist> {
  try {
    const response = await axiosClient.post(
      `/api/playlist-songs/${playlistId}`,
      {
        songIds: [songIds],
      }
    );
    // Process response if necessary
    if (!response.data.playlist) {
      throw new Error("Failed to add song to playlist");
    } else {
      toast.success(
        `Song added to the playlist: ${response.data.playlist.name}`
      );
    }
    return response.data.playlist;
  } catch (error) {
    onError("Could not add song to playlist");
    throw error;
  }
}

//Get playlists

export async function getPlaylists(
  onError: (message: string) => void
): Promise<{ playlists: PlaylistAndSongs[] }> {
  try {
    const response = await axiosClient.get("/api/playlists");
    // Process response if necessary
    return response.data; // Assuming the playlists are directly in data
  } catch (error) {
    console.error("Failed to fetch playlists:", error);
    onError("Could not fetch playlists");
    // Optionally, re-throw or handle the error based on your error handling strategy
    throw error;
  }
}

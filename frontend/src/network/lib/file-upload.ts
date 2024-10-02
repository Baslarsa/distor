import { AxiosError } from "axios";
import axiosClient from "../apiClient";

export async function uploadCoverArt(
  file: File,
  onError: (message: string) => void
): Promise<string | undefined> {
  const formData = new FormData();
  formData.append("coverArt", file); // Ensure the key matches what the server expects

  try {
    const response = await axiosClient.post("/api/upload-cover-art", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Required for file uploads
      },
    });

    // The backend should return the public URL of the uploaded image
    return response.data; // Assuming the public URL is returned in response.data
  } catch (error) {
    const axiosError = error as any;
    console.error("Failed to upload cover art:", axiosError);
    onError(
      axiosError?.response?.data?.message || "Could not upload cover art"
    );
    // Rethrow the error to handle it further if needed
    throw axiosError;
  }
}

export async function uploadAudioFile(
  file: File,
  onError: (message: string) => void
): Promise<string | undefined> {
  const formData = new FormData();
  formData.append("audioFile", file); // Ensure the key matches what the server expects for audio

  try {
    const response = await axiosClient.post("/upload-audio", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Required for file uploads
      },
    });

    // Assuming the backend returns the public URL of the uploaded audio
    return response.data; // The URL returned by your API
  } catch (error) {
    const axiosError = error as any;
    console.error("Failed to upload audio file:", axiosError);
    onError(
      axiosError?.response?.data?.message || "Could not upload audio file"
    );
    throw axiosError;
  }
}

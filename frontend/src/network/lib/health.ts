import axiosClient from "../apiClient";

export async function getBackendStatus(
  onError: (message: string) => void
): Promise<any> {
  try {
    const response = await axiosClient.get("/api/health");
    // Process response if necessary
    return response; // Assuming the songs are directly in data
  } catch (error) {
    console.error("Failed to fetch status:", error);
    onError("Could not fetch status");
    // Optionally, re-throw or handle the error based on your error handling strategy
    throw error;
  }
}

const fetchWithTimeout = (
  url: string,
  options = {},
  timeout = 5000
): Promise<Response> => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Request timed out"));
    }, timeout);

    fetch(url, options)
      .then((response) => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
};

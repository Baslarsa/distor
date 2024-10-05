# Streaming App for the web

Monorepo containing a frontend and backend service to play, view and create songs and playlists.
Frontend, Dockerized Node.js Backend

**Frontend**
Frontend app with audio player

- Fetching songs from the backend service using docker and postgres with Apollo
- Playing audio and displaying waveforms using wavesurfer.js and react-audio-visualizer
- Add UI to create a new song by uploading a file, cover-art and Artist
-  UI to display artists and playlists
- UI To create a playlist
- Hosted on Vercel

**Backend**
Backend app serving audio files and data reading and creation

- Storage using firebase for storing audio files
- Endpoints for uploading audio files, getting and creating playlists and songs.
- Dockerized
- Hosted on Render

<img width="1501" alt="Skärmavbild 2024-10-05 kl  22 24 59" src="https://github.com/user-attachments/assets/a2afaa03-8c52-48e4-a8c3-ef783a42595c">


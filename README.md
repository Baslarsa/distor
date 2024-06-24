# Streaming App for the web

Monorepo containing a frontend and backend service to play, view and create songs and playlists.
Frontend, Backend and Postgres-DB is dockerized in separate containers using docker-compose.

**Frontend**
WIP Frontend app with audio player

- Fetching songs from the backend service using docker and postgres with Apollo
- Playing audio and displaying waveforms using wavesurfer.js and react-audio-visualizer
- TODO: Add UI to create a new song by uploading a file (Backend ready)
- TODO: Implement UI to display artists and playlists
- TODO: UI To create a playlist

**Backend**
WIP Backend app serving audio files and data reading and creation

- Storage using firebase for storing audio files
- Endpoints for uploading audio files, getting and creating playlists and songs.

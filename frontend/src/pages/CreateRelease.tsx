import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import DefaultButton from "../components/ui-components/DefaultButton";
import { HiOutlineUpload, HiOutlineX } from "react-icons/hi";
import CreateReleaseForm from "../components/createRelease/CreateReleaseForm";
import FileUpload from "../components/ui-components/FileUpload";
import { uploadCoverArt } from "../network/lib/file-upload";
import { OrbitProgress } from "react-loading-indicators";
import CoverArtFileUpload from "../components/createRelease/CoverArtUpload";
import AudioFileUpload from "../components/createRelease/AudioFileUpload";
import { createSong } from "../network/lib/song";
import { useError } from "../ErrorContext";
import { useContentContext } from "../ContentContext";
import { createArtist } from "../network/lib/artists";
import { toast } from "react-toastify";
import { Song } from "@prisma/client";

const CreateRelease = () => {
  const { showError } = useError();
  const { artists, handleGetData } = useContentContext();
  const [songName, setSongName] = useState<string>("");
  const [artistName, setArtistName] = useState<string>("");
  const [coverArt, setCoverArt] = useState<File | null>();
  const [audioFile, setAudioFile] = useState<File | null>();
  const [coverArtUploadStatus, setCoverArtUploadStatus] = useState<string>("");
  const [uploadedCoverArtUrl, setUploadedCoverArtUrl] = useState<string>("");
  const [audioFileUploadStatus, setAudioFileUploadStatus] =
    useState<string>("");
  const [uploadedAudioUrl, setUploadedAudioUrl] = useState<string>("");
  const handleCoverArtUploadError = (message: string) => {
    setCoverArtUploadStatus(message);
  };
  const handleAudioFileUploadError = (message: string) => {
    setAudioFileUploadStatus(message);
  };

  const handleSongNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSongName(e.target.value);
  };
  const handleArtistNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setArtistName(e.target.value);
  };

  const handleCoverArtUpload = async () => {
    if (!coverArt) {
      return;
    }

    try {
      setCoverArtUploadStatus("loading");
      const url = await uploadCoverArt(coverArt, handleCoverArtUploadError);
      if (url) {
        setUploadedCoverArtUrl(url);
        setCoverArtUploadStatus("succeeded");
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleAudioFileUpload = async () => {
    if (!audioFile) {
      return;
    }

    try {
      setAudioFileUploadStatus("loading");
      const url = await uploadCoverArt(audioFile, handleAudioFileUploadError);
      if (url) {
        setUploadedAudioUrl(url);
        setAudioFileUploadStatus("succeeded");
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  useEffect(() => {
    if (coverArt && coverArtUploadStatus !== "loading") {
      handleCoverArtUpload();
    }
  }, [coverArt]);

  useEffect(() => {
    if (audioFile && audioFileUploadStatus !== "loading") {
      handleAudioFileUpload();
    }
  }, [audioFile]);

  const handleClearCoverArt = () => {
    setCoverArt(null);
    setUploadedCoverArtUrl("");
  };
  const handleClearAudioFile = () => {
    setAudioFile(null);
    setUploadedAudioUrl("");
  };

  const handleClearData = () => {
    setSongName("");
    setArtistName("");
    setCoverArt(null);
    setUploadedCoverArtUrl("");
    setAudioFile(null);
    setUploadedAudioUrl("");
  };

  const handleCreateRelease = async () => {
    if (!songName || !artistName || !uploadedAudioUrl || !uploadedCoverArtUrl) {
      return;
    }
    let artistId: string = "";
    const artistExists = artists.find((artist) => artist.name === artistName);

    if (artistExists) {
      artistId = artistExists.id;
    } else {
      const artistCreate = await createArtist({ name: artistName }, showError);
      artistId = artistCreate.id;
    }

    const songData: Partial<Song> = {
      name: songName,
      artistId,
      audio_src: uploadedAudioUrl,
      cover_art_src: uploadedCoverArtUrl,
    };

    const release = await createSong(songData, showError);
    if (release) {
      toast.success("Release created successfully");
      handleGetData();
      handleClearData();
    }
  };

  return (
    <div className="w-full">
      <PageTitle title="Create new release" />
      <div className="p-4 w-full max-w-2xl">
        <CoverArtFileUpload
          handleClearCoverArt={handleClearCoverArt}
          isUploading={coverArtUploadStatus === "loading"}
          setCoverArt={setCoverArt}
          uploadedCoverArtUrl={uploadedCoverArtUrl}
        />
        <AudioFileUpload
          handleClearAudioFile={handleClearAudioFile}
          isUploading={audioFileUploadStatus === "loading"}
          setAudioFile={setAudioFile}
          uploadedAudioFileUrl={uploadedAudioUrl}
        />
        <CreateReleaseForm
          onArtistNameChange={handleArtistNameChange}
          onSongNameChange={handleSongNameChange}
          artistName={artistName}
          songName={songName}
        />
        <DefaultButton className="w-full border" onClick={handleCreateRelease}>
          Create
        </DefaultButton>
      </div>
    </div>
  );
};

export default CreateRelease;

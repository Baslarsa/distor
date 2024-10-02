import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import DefaultButton from "../components/ui-components/DefaultButton";
import { HiOutlineUpload, HiOutlineX } from "react-icons/hi";
import CreateReleaseForm from "../components/createRelease/CreateReleaseForm";
import FileUpload from "../components/ui-components/FileUpload";
import { uploadCoverArt } from "../network/lib/file-upload";
import { OrbitProgress } from "react-loading-indicators";

const CreateRelease = () => {
  const [coverArt, setCoverArt] = useState<File | null>();
  const [coverArtUploadStatus, setCoverArtUploadStatus] = useState<string>("");
  const [uploadedCoverArtUrl, setUploadedCoverArtUrl] = useState<string>("");
  const [selectedAudio, setSelectedAudio] = useState<File | null>(null);
  const [audioFileUploadStatus, setAudioFileUploadStatus] =
    useState<string>("");
  const [uploadedAudioUrl, setUploadedAudioUrl] = useState<string>("");
  const handleCoverArtUploadError = (message: string) => {
    setCoverArtUploadStatus(message);
  };

  const isUploading =
    coverArtUploadStatus === "Uploading..." ||
    audioFileUploadStatus === "Uploading...";

  const handleCoverArtUpload = async () => {
    if (!coverArt) {
      setCoverArtUploadStatus("Please select an image to upload.");
      return;
    }

    try {
      setCoverArtUploadStatus("Uploading...");
      const url = await uploadCoverArt(coverArt, handleCoverArtUploadError);
      if (url) {
        setUploadedCoverArtUrl(url);
        setCoverArtUploadStatus("Upload successful!");
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  useEffect(() => {
    if (coverArt && coverArtUploadStatus !== "Uploading...") {
      handleCoverArtUpload();
    }
  }, [coverArt]);

  const handleClearCoverArt = () => {
    setCoverArt(null);
    setUploadedCoverArtUrl("");
  };
  return (
    <div className="w-full">
      <PageTitle title="Create new release" />
      <div className="p-4">
        <div className="flex gap-6">
          <div className="h-72 w-72 relative overflow-hidden flex justify-center items-center">
            {isUploading ? (
              <OrbitProgress
                variant="disc"
                color="white"
                size="small"
                text="Loading..."
                textColor="white"
              />
            ) : (
              <>
                {uploadedCoverArtUrl && (
                  <div
                    className="absolute top-0 right-0 h-10 w-10 hover:h-12 hover:w-12 transition-all bg-white p-2 cursor-pointer"
                    onClick={handleClearCoverArt}
                  >
                    <HiOutlineX className="text-black h-full w-full" />
                  </div>
                )}
                {uploadedCoverArtUrl ? (
                  <img
                    src={uploadedCoverArtUrl}
                    className="h-full object-cover"
                  ></img>
                ) : (
                  <FileUpload
                    onChange={(e) => {
                      if (e.target.files) setCoverArt(e.target.files[0]);
                    }}
                  />
                )}
              </>
            )}
          </div>
          <CreateReleaseForm />
        </div>
      </div>
    </div>
  );
};

export default CreateRelease;

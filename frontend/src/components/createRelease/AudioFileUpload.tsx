import { HiOutlineCheck, HiOutlineX } from "react-icons/hi";
import SmallFileUpload from "../ui-components/SmallFileUpload";
import { OrbitProgress } from "react-loading-indicators";

type AudioFileUploadProps = {
  isUploading: boolean;
  uploadedAudioFileUrl: string;
  handleClearAudioFile: () => void;
  setAudioFile: (value: File) => void;
};

const AudioFileUpload = ({
  isUploading,
  uploadedAudioFileUrl,
  handleClearAudioFile,
  setAudioFile,
}: AudioFileUploadProps) => {
  return (
    <div className="flex gap-6 justify-between pb-12">
      <p>Upload Audio File</p>
      <div className="flex items-center">
        <div className="h-12 w-12 flex justify-center items-center p-2">
          {isUploading && (
            <OrbitProgress variant="disc" color="white" textColor="white" />
          )}

          {uploadedAudioFileUrl && (
            <HiOutlineCheck className="text-green-300 h-full w-full" />
          )}
        </div>
        <SmallFileUpload
          acceptType="audio/mp3"
          onChange={(e) => {
            if (e.target.files) setAudioFile(e.target.files[0]);
          }}
        />
        {uploadedAudioFileUrl && (
          <div
            className="h-12 w-12 flex items-center justify-center p-4"
            onClick={handleClearAudioFile}
          >
            <HiOutlineX className="text-white w-full h-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioFileUpload;

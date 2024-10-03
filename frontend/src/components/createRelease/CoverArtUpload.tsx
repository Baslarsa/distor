import { HiOutlineX } from "react-icons/hi";
import { OrbitProgress } from "react-loading-indicators";
import FileUpload from "../ui-components/FileUpload";

type CoverArtUploadProps = {
  isUploading: boolean;
  uploadedCoverArtUrl: string;
  handleClearCoverArt: () => void;
  setCoverArt: (value: File) => void;
};
const CoverArtFileUpload = ({
  isUploading,
  uploadedCoverArtUrl,
  handleClearCoverArt,
  setCoverArt,
}: CoverArtUploadProps) => {
  return (
    <div className="flex gap-6 justify-between pb-12">
      <p>Upload Cover Art</p>
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
                acceptType="image/*"
                onChange={(e) => {
                  if (e.target.files) setCoverArt(e.target.files[0]);
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default CoverArtFileUpload;

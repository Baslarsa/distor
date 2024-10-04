import { ChangeEventHandler } from "react";

type FileUploadProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  acceptType: string;
};
const SmallFileUpload = ({ acceptType, onChange }: FileUploadProps) => {
  return (
    <div>
      <input
        className="block w-72 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="default_size"
        type="file"
        onChange={onChange}
        accept={acceptType}
      />
    </div>
  );
};

export default SmallFileUpload;

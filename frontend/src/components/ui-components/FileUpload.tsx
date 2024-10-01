import { ChangeEventHandler } from "react";

type FileUploadProps = {
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};
const FileUpload = ({ label, onChange }: FileUploadProps) => {
  return (
    <div>
      <div>
        <p>{label}</p>
      </div>
      <div>
        <input type="file" onChange={onChange} />
      </div>
    </div>
  );
};

export default FileUpload;

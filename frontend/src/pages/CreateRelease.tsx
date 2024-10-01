import { ChangeEvent, useState } from "react";
import PageTitle from "../components/PageTitle";
import DefaultButton from "../components/ui-components/DefaultButton";
import { HiOutlineUpload } from "react-icons/hi";
import CreateReleaseForm from "../components/createRelease/CreateReleaseForm";
import FileUpload from "../components/ui-components/FileUpload";

const CreateRelease = () => {
  const [coverArt, setCoverArt] = useState<File>();

  return (
    <div className="w-full">
      <PageTitle title="Create new release" />
      <div className="p-4">
        <div className="flex gap-6">
          <div className="border border-white/50 h-72 w-72">
            {coverArt ? (
              <img src="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex justify-center items-center"></div>
            )}
          </div>
          <CreateReleaseForm />
        </div>
      </div>
    </div>
  );
};

export default CreateRelease;

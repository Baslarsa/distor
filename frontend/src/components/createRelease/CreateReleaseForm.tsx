import { ChangeEvent, useState } from "react";
import TextInput from "../ui-components/TextInput";
import FileUpload from "../ui-components/FileUpload";

type CreateReleaseState = {
  songName: string;
  artistName: string;
};
const CreateReleaseForm = () => {
  const [createReleaseState, setCreateReleaseState] =
    useState<CreateReleaseState>({
      songName: "",
      artistName: "",
    });
  const handleSongNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCreateReleaseState({ ...createReleaseState, songName: e.target.value });
  };
  return (
    <div>
      <TextInput
        onChange={handleSongNameChange}
        value={createReleaseState.songName}
        label="Song name"
      />
    </div>
  );
};

export default CreateReleaseForm;

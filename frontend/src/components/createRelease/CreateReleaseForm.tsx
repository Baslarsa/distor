import { ChangeEventHandler } from "react";
import TextInput from "../ui-components/TextInput";

type CreateReleaseFormProps = {
  onSongNameChange: ChangeEventHandler<HTMLInputElement>;
  onArtistNameChange: ChangeEventHandler<HTMLInputElement>;
  songName: string;
  artistName: string;
};
const CreateReleaseForm = ({
  onSongNameChange,
  onArtistNameChange,
  artistName,
  songName,
}: CreateReleaseFormProps) => {
  return (
    <div>
      <div className="flex gap-6 justify-between items-center pb-12">
        <p>Song name</p>
        <TextInput
          onChange={onSongNameChange}
          value={songName}
          className="w-72"
        />
      </div>
      <div className="flex gap-6 justify-between items-center pb-12">
        <p>Artist Name</p>
        <TextInput
          onChange={onArtistNameChange}
          value={artistName}
          className="w-72"
        />
      </div>
    </div>
  );
};

export default CreateReleaseForm;

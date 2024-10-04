import { useState } from "react";
import DefaultButton from "./ui-components/DefaultButton";
import DefaultDialog from "./ui-components/DefaultDialog";
import TextInput from "./ui-components/TextInput";
import TextArea from "./ui-components/TextArea";
import { createPlaylist } from "../network/lib/playlist";
import { useError } from "../ErrorContext";
import { toast } from "react-toastify";
import { useContentContext } from "../ContentContext";

const CreatePlaylistModal = () => {
  const { showError } = useError();
  const { setPlaylists } = useContentContext();
  const [showDialog, setShowDialog] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [description, setDescription] = useState("");
  const handleClose = () => setShowDialog(false);

  const handleCreatePlaylist = async () => {
    const response = await createPlaylist(
      { name: playlistName, description },
      showError
    );

    if (response) {
      handleClose();
      toast.success("Playlist created successfully");
      setPlaylists((prevPlaylists) => [...prevPlaylists, response.playlist]);
    }
  };
  return (
    <div className="text-white">
      <DefaultButton onClick={() => setShowDialog(true)}>
        Create Playlist
      </DefaultButton>
      <DefaultDialog onClose={handleClose} open={showDialog}>
        <p className="text-white">Create Playlist</p>
        <br />
        <TextInput
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          label="Playlist Name"
        />
        <br />
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
        />
        <br />
        <DefaultButton className="w-full" onClick={handleCreatePlaylist}>
          Create Playlist
        </DefaultButton>
      </DefaultDialog>
    </div>
  );
};

export default CreatePlaylistModal;

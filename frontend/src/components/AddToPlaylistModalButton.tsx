import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import DefaultDialog from "./ui-components/DefaultDialog";
import { addSongToPlaylist } from "../network/lib/playlist";
import { useError } from "../ErrorContext";
import { useContentContext } from "../ContentContext";
import { Button } from "@headlessui/react";

const AddToPlaylistModalButton = ({ songId }: { songId: string }) => {
  const { showError } = useError();
  const { playlists } = useContentContext();
  const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState(false);
  const onAddToPlaylist = async (playlistId: string, songId: string) => {
    await addSongToPlaylist(playlistId, songId, showError);
  };

  const handleShowAddToPlaylistModal = () => {
    setShowAddToPlaylistModal(true);
  };

  const onClose = () => {
    setShowAddToPlaylistModal(false);
  };

  return (
    <div>
      <PlusIcon onClick={handleShowAddToPlaylistModal} height={20} />
      {showAddToPlaylistModal && (
        <DefaultDialog onClose={onClose} open={showAddToPlaylistModal}>
          <div className="flex justify-center">
            <h4 className="text-xl font-semibold pb-4 text-white">
              Add to playlist
            </h4>
          </div>
          <div className="flex flex-col gap-2 bg-white/5 rounded-sm">
            {playlists.map((p) => (
              <div
                onClick={() => onAddToPlaylist(p.id, songId)}
                className="flex items-center justify-between cursor-pointer py-2 text-white hover:bg-white/5 px-4 transition-all rounded-sm"
              >
                {p.name}
                <PlusIcon height={20} />
              </div>
            ))}
          </div>
          <Button
            title="Add to playlist"
            onClick={onClose}
            className="w-full text-white border-white border p-2 mt-4 rounded-sm hover:bg-white/5 transition-all"
          >
            Close
          </Button>
        </DefaultDialog>
      )}
    </div>
  );
};

export default AddToPlaylistModalButton;

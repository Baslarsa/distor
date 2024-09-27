import { Artist } from "@prisma/client";
import ArtistRow from "./ArtistRow";

const ArtistsList = ({ artists }: { artists: Artist[] }) => {
  return (
    <div className="flex flex-col w-full">
      {artists.map((artist) => (
        <ArtistRow key={artist.id} artist={artist} />
      ))}
    </div>
  );
};

export default ArtistsList;

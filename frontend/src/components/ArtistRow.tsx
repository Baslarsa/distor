import { Artist } from "@prisma/client";

const ArtistRow = ({ artist }: { artist: Artist }) => {
  return (
    <div
      className={`w-full items-center cursor-pointer flex justify-between py-4 px-4 hover:bg-slate-100 hover:text-black bg-transparent border-b border-b-gray-100 transition-all`}
    >
      <p>{artist.name}</p>
    </div>
  );
};

export default ArtistRow;

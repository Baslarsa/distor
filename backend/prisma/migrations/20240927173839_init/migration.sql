/*
  Warnings:

  - You are about to drop the column `songId` on the `Genre` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_songId_fkey";

-- AlterTable
ALTER TABLE "Genre" DROP COLUMN "songId";

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "artistId" TEXT;

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GenreToSong" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToSong_AB_unique" ON "_GenreToSong"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToSong_B_index" ON "_GenreToSong"("B");

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToSong" ADD CONSTRAINT "_GenreToSong_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToSong" ADD CONSTRAINT "_GenreToSong_B_fkey" FOREIGN KEY ("B") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

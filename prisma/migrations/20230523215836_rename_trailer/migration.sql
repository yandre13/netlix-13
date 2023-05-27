/*
  Warnings:

  - You are about to drop the column `trailer` on the `Movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" RENAME COLUMN "trailer" TO "trailerUrl";


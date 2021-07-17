/*
  Warnings:

  - You are about to drop the column `image` on the `Slicer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Slicer" DROP COLUMN "image",
ADD COLUMN     "imageUrl" TEXT,
ALTER COLUMN "address" DROP NOT NULL;

/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Slicer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Slicer" DROP COLUMN "imageUrl",
ADD COLUMN     "attributes" JSONB[],
ADD COLUMN     "external_url" TEXT,
ADD COLUMN     "image" TEXT;

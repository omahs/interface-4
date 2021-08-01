/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Slicer` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Slicer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Slicer" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

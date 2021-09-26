/*
  Warnings:

  - You are about to drop the column `shortDescription` on the `Slicer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "shortDescription" TEXT;

-- AlterTable
ALTER TABLE "Slicer" DROP COLUMN "shortDescription";

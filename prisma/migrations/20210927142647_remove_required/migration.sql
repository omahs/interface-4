/*
  Warnings:

  - Made the column `config` on table `Slicer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sponsors` on table `Slicer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Slicer" ALTER COLUMN "config" SET NOT NULL,
ALTER COLUMN "sponsors" SET NOT NULL;

-- AlterTable
ALTER TABLE "Slicer" ADD COLUMN     "config" JSONB NOT NULL DEFAULT E'{"sponsors": true}';

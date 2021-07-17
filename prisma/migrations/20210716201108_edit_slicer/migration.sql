-- AlterTable
ALTER TABLE "Slicer" ADD COLUMN     "description" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "address" SET DATA TYPE TEXT;
DROP SEQUENCE "Slicer_id_seq";

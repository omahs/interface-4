-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_slicer_id_fkey";

-- AlterTable
ALTER TABLE "Slicer" ADD COLUMN     "tags" TEXT;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_slicer_id_fkey" FOREIGN KEY ("slicer_id") REFERENCES "Slicer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

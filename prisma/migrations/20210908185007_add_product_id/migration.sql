/*
  Warnings:

  - A unique constraint covering the columns `[product_id,slicer_id]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_id` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "productSlicer";

-- AlterTable
CREATE SEQUENCE "product_id_seq";
ALTER TABLE "Product" ADD COLUMN     "product_id" INTEGER NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('product_id_seq');
ALTER SEQUENCE "product_id_seq" OWNED BY "Product"."id";

-- CreateIndex
CREATE INDEX "productId" ON "Product"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "productSlicer" ON "Product"("product_id", "slicer_id");

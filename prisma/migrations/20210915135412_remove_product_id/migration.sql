/*
  Warnings:

  - You are about to drop the column `product_id` on the `Product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "productId";

-- DropIndex
DROP INDEX "productSlicer";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "product_id";

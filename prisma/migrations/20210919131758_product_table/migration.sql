/*
  Warnings:

  - You are about to drop the column `author` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Revert` table. All the data in the column will be lost.
  - Added the required column `creator` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "slicerNameVersion";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "author",
DROP COLUMN "version",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "creator" TEXT NOT NULL,
ADD COLUMN     "product_id" INTEGER,
ADD COLUMN     "tempProductHash" TEXT;

-- AlterTable
ALTER TABLE "Revert" DROP COLUMN "isDeleted",
ADD COLUMN     "isPending" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "productId" ON "Product"("product_id");

/*
  Warnings:

  - You are about to drop the column `merkleTree` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "merkleTree",
ADD COLUMN     "allowedAddresses" TEXT[];

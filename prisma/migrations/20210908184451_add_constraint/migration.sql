/*
  Warnings:

  - A unique constraint covering the columns `[id,slicer_id]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "slicerId" ON "Product"("slicer_id");

-- CreateIndex
CREATE UNIQUE INDEX "productSlicer" ON "Product"("id", "slicer_id");

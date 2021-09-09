-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "slicer_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "slicerId" ON "Product"("slicer_id");

-- CreateIndex
CREATE UNIQUE INDEX "productSlicer" ON "Product"("id", "slicer_id");

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("slicer_id") REFERENCES "Slicer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

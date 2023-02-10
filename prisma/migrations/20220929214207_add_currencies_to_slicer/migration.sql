-- CreateTable
CREATE TABLE "_CurrencyToSlicer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CurrencyToSlicer_AB_unique" ON "_CurrencyToSlicer"("A", "B");

-- CreateIndex
CREATE INDEX "_CurrencyToSlicer_B_index" ON "_CurrencyToSlicer"("B");

-- AddForeignKey
ALTER TABLE "_CurrencyToSlicer" ADD CONSTRAINT "_CurrencyToSlicer_A_fkey" FOREIGN KEY ("A") REFERENCES "Currency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CurrencyToSlicer" ADD CONSTRAINT "_CurrencyToSlicer_B_fkey" FOREIGN KEY ("B") REFERENCES "Slicer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "SlicerConfig" (
    "id" SERIAL NOT NULL,
    "customPath" TEXT,
    "slicerId" INTEGER NOT NULL,

    CONSTRAINT "SlicerConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SlicerConfig_customPath_key" ON "SlicerConfig"("customPath");

-- CreateIndex
CREATE UNIQUE INDEX "SlicerConfig_slicerId_key" ON "SlicerConfig"("slicerId");

-- AddForeignKey
ALTER TABLE "SlicerConfig" ADD CONSTRAINT "SlicerConfig_slicerId_fkey" FOREIGN KEY ("slicerId") REFERENCES "Slicer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

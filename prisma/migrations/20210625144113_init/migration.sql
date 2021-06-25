-- CreateTable
CREATE TABLE "Slicer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "address" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Revert" (
    "id" SERIAL NOT NULL,
    "hash" TEXT NOT NULL,
    "service" TEXT NOT NULL DEFAULT E'web3Storage',
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

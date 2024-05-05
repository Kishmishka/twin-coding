-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "language" TEXT NOT NULL,
    "codeRedactorDate" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

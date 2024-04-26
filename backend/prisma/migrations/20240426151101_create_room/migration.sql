-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'Java script',
    "editorContent" TEXT NOT NULL DEFAULT '',
    "seatsCount" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

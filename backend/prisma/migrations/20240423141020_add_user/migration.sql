-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "room" INTEGER NOT NULL,
    "cursorX" DECIMAL(65,30) NOT NULL,
    "cursorY" DECIMAL(65,30) NOT NULL,
    "textCursorColumn" INTEGER NOT NULL,
    "textCursorRow" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "seat" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

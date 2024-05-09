/*
  Warnings:

  - You are about to drop the column `seatsCount` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "seatsCount",
ALTER COLUMN "language" SET DEFAULT 'Java';

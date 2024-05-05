/*
  Warnings:

  - Added the required column `used` to the `Colors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Colors" ADD COLUMN     "used" BOOLEAN NOT NULL;

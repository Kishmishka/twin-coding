/*
  Warnings:

  - You are about to drop the column `codeRedactorDate` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `editorContent` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "codeRedactorDate",
ADD COLUMN     "editorContent" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";

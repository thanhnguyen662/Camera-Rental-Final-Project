/*
  Warnings:

  - You are about to drop the `Comments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_userCommentId_fkey";

-- AlterTable
ALTER TABLE "UserComment" ADD COLUMN     "content" TEXT,
ADD COLUMN     "rate" DOUBLE PRECISION;

-- DropTable
DROP TABLE "Comments";

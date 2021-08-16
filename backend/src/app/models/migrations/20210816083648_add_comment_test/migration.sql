/*
  Warnings:

  - You are about to drop the column `content` on the `UserComment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `UserComment` table. All the data in the column will be lost.
  - You are about to drop the column `rate` on the `UserComment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `UserComment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserComment" DROP COLUMN "content",
DROP COLUMN "createdAt",
DROP COLUMN "rate",
DROP COLUMN "updatedAt";

-- CreateTable
CREATE TABLE "Comments" (
    "id" SERIAL NOT NULL,
    "content" TEXT,
    "rate" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userCommentId" INTEGER,
    "authorId" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comments" ADD FOREIGN KEY ("userCommentId") REFERENCES "UserComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD FOREIGN KEY ("authorId") REFERENCES "Users"("firebaseId") ON DELETE SET NULL ON UPDATE CASCADE;

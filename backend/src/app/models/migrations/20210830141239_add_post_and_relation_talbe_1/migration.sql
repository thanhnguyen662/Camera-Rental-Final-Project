/*
  Warnings:

  - You are about to drop the column `comment` on the `Post` table. All the data in the column will be lost.
  - Made the column `like` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `add` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "comment",
ALTER COLUMN "like" SET NOT NULL,
ALTER COLUMN "like" SET DEFAULT 0,
ALTER COLUMN "add" SET NOT NULL,
ALTER COLUMN "add" SET DEFAULT 0;

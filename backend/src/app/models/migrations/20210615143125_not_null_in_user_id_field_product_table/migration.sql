/*
  Warnings:

  - Made the column `authorId` on table `Products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "authorId" SET NOT NULL;

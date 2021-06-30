/*
  Warnings:

  - Added the required column `address` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `favouriteGear` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasTag` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "favouriteGear" TEXT NOT NULL,
ADD COLUMN     "hasTag" TEXT NOT NULL,
ADD COLUMN     "rate" INTEGER NOT NULL;

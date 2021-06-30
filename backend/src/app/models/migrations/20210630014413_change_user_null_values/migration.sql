/*
  Warnings:

  - Made the column `firebaseId` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "age" DROP NOT NULL,
ALTER COLUMN "firebaseId" SET NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "favouriteGear" DROP NOT NULL,
ALTER COLUMN "hasTag" DROP NOT NULL,
ALTER COLUMN "rate" DROP NOT NULL;

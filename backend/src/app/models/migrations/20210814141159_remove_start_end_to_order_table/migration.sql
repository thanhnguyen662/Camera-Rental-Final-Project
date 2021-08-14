/*
  Warnings:

  - You are about to drop the column `rentalEndDate` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `rentalStartDate` on the `Orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "rentalEndDate",
DROP COLUMN "rentalStartDate";

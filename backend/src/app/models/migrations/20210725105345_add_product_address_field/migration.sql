/*
  Warnings:

  - You are about to drop the column `productAdress` on the `Products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "productAdress",
ADD COLUMN     "productAddress" TEXT;

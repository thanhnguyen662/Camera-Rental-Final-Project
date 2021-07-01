/*
  Warnings:

  - You are about to drop the column `photoURL` on the `Products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "photoURL";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "photoURL" TEXT;

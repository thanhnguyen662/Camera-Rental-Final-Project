/*
  Warnings:

  - You are about to drop the column `photoURL` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `test` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `test1` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "photoURL",
ADD COLUMN     "productPhotoURL" TEXT;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "test",
DROP COLUMN "test1";

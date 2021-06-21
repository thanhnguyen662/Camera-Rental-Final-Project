/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Products` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `Products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Products.slug_unique" ON "Products"("slug");

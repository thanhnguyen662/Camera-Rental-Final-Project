-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "categoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "Products" ADD FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Products" ADD FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

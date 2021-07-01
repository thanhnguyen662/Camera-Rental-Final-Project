-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "firebaseId" TEXT;

-- AddForeignKey
ALTER TABLE "Products" ADD FOREIGN KEY ("firebaseId") REFERENCES "Users"("firebaseId") ON DELETE SET NULL ON UPDATE CASCADE;

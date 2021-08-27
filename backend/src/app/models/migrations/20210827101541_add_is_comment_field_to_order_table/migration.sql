-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "isProductComment" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isShopComment" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isUserComment" BOOLEAN NOT NULL DEFAULT false;

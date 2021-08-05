-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "orderStatusId" INTEGER;

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "OrderStatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Orders" ADD FOREIGN KEY ("orderStatusId") REFERENCES "OrderStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

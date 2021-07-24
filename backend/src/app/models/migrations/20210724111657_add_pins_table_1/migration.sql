/*
  Warnings:

  - You are about to drop the `Pin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pin" DROP CONSTRAINT "Pin_productId_fkey";

-- DropTable
DROP TABLE "Pin";

-- CreateTable
CREATE TABLE "Pins" (
    "id" SERIAL NOT NULL,
    "lat" TEXT,
    "long" TEXT,
    "productId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pins" ADD FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

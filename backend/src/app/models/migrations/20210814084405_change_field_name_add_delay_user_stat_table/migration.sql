/*
  Warnings:

  - You are about to drop the column `notCome` on the `UserStat` table. All the data in the column will be lost.
  - You are about to drop the column `successRate` on the `UserStat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserStat" DROP COLUMN "notCome",
DROP COLUMN "successRate",
ADD COLUMN     "delay" DOUBLE PRECISION,
ADD COLUMN     "success" DOUBLE PRECISION;

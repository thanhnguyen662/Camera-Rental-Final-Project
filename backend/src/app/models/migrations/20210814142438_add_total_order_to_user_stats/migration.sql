/*
  Warnings:

  - You are about to drop the column `delay` on the `UserStat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserStat" DROP COLUMN "delay",
ADD COLUMN     "totalOrder" DOUBLE PRECISION,
ALTER COLUMN "come" SET DEFAULT 0,
ALTER COLUMN "success" SET DEFAULT 0;

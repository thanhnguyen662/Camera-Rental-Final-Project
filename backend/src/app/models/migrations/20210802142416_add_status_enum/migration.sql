-- CreateEnum
CREATE TYPE "Status" AS ENUM ('SUCCESS', 'PEDING', 'FAILURE');

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "status" "Status" NOT NULL DEFAULT E'PEDING';

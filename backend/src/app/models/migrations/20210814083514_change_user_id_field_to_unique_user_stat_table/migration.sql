/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserStat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserStat.userId_unique" ON "UserStat"("userId");

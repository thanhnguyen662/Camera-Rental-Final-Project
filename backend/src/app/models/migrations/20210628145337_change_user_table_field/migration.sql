/*
  Warnings:

  - You are about to drop the column `email` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[firebaseId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `age` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Users.email_unique";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "firebaseId" TEXT,
ADD COLUMN     "gender" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users.firebaseId_unique" ON "Users"("firebaseId");

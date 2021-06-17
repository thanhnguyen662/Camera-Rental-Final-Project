/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "password" TEXT,
    "refreshToken" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users.email_unique" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Products" ADD FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

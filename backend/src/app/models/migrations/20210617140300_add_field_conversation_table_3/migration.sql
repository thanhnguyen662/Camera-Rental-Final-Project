/*
  Warnings:

  - Added the required column `receiverEmail` to the `Conversations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Conversations" ADD COLUMN     "receiverEmail" TEXT NOT NULL;

/*
  Warnings:

  - You are about to drop the column `conversationId` on the `Messages` table. All the data in the column will be lost.
  - Added the required column `chatId` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_conversationId_fkey";

-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "conversationId",
ADD COLUMN     "chatId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Messages" ADD FOREIGN KEY ("chatId") REFERENCES "Conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

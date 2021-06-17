/*
  Warnings:

  - You are about to drop the `Messages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_chatId_fkey";

-- DropTable
DROP TABLE "Messages";

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "text" TEXT,
    "conversationId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD FOREIGN KEY ("conversationId") REFERENCES "Conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

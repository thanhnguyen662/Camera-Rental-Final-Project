/*
  Warnings:

  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_conversationId_fkey";

-- DropTable
DROP TABLE "Message";

-- CreateTable
CREATE TABLE "Messages" (
    "id" SERIAL NOT NULL,
    "sender" INTEGER NOT NULL,
    "text" TEXT,
    "conversationId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Messages" ADD FOREIGN KEY ("conversationId") REFERENCES "Conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

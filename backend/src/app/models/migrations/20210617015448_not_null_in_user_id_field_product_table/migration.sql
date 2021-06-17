-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "sender" INTEGER NOT NULL,
    "text" TEXT,
    "conversationId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD FOREIGN KEY ("conversationId") REFERENCES "Conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "ConversationBeta1" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberBeta1" (
    "id" SERIAL NOT NULL,
    "conversationId" INTEGER,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageBeta1" (
    "id" SERIAL NOT NULL,
    "content" TEXT,
    "userId" TEXT,
    "conversationId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MemberBeta1" ADD FOREIGN KEY ("conversationId") REFERENCES "ConversationBeta1"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberBeta1" ADD FOREIGN KEY ("userId") REFERENCES "Users"("firebaseId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageBeta1" ADD FOREIGN KEY ("conversationId") REFERENCES "ConversationBeta1"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageBeta1" ADD FOREIGN KEY ("userId") REFERENCES "Users"("firebaseId") ON DELETE SET NULL ON UPDATE CASCADE;

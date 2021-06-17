-- CreateTable
CREATE TABLE "Conversations" (
    "id" SERIAL NOT NULL,
    "members" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

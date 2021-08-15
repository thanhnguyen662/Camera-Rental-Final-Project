-- CreateTable
CREATE TABLE "UserComment" (
    "id" SERIAL NOT NULL,
    "content" TEXT,
    "userId" TEXT,
    "rate" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserComment" ADD FOREIGN KEY ("userId") REFERENCES "Users"("firebaseId") ON DELETE SET NULL ON UPDATE CASCADE;

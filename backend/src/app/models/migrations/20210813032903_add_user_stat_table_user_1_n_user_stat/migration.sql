-- CreateTable
CREATE TABLE "UserStat" (
    "id" SERIAL NOT NULL,
    "successRate" DOUBLE PRECISION,
    "userId" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserStat" ADD FOREIGN KEY ("userId") REFERENCES "Users"("firebaseId") ON DELETE SET NULL ON UPDATE CASCADE;

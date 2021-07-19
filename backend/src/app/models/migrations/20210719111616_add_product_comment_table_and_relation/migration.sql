-- CreateTable
CREATE TABLE "ProductComments" (
    "id" SERIAL NOT NULL,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" INTEGER,
    "authorId" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductComments" ADD FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductComments" ADD FOREIGN KEY ("authorId") REFERENCES "Users"("firebaseId") ON DELETE SET NULL ON UPDATE CASCADE;

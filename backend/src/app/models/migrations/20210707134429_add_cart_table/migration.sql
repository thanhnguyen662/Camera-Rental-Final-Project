-- CreateTable
CREATE TABLE "Carts" (
    "id" SERIAL NOT NULL,
    "firebaseId" TEXT,
    "productId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Carts" ADD FOREIGN KEY ("firebaseId") REFERENCES "Users"("firebaseId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carts" ADD FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

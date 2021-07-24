-- CreateTable
CREATE TABLE "Pin" (
    "id" SERIAL NOT NULL,
    "lat" TEXT,
    "long" TEXT,
    "productId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pin" ADD FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "products" (
    "id" INTEGER NOT NULL,
    "product_name" VARCHAR(100) NOT NULL,
    "product_desc" VARCHAR(150) NOT NULL,
    "product_category" VARCHAR(100) NOT NULL,
    "product_price" DECIMAL(65,30) NOT NULL,
    "product_quantity" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "usernameId" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_usernameId_fkey" FOREIGN KEY ("usernameId") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `username` on the `products` table. All the data in the column will be lost.
  - Added the required column `username_seller` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_username_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "username",
ADD COLUMN     "username_seller" VARCHAR(100) NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_username_seller_fkey" FOREIGN KEY ("username_seller") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

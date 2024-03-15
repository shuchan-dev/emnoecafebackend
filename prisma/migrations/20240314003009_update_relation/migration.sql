/*
  Warnings:

  - You are about to drop the column `usernameId` on the `products` table. All the data in the column will be lost.
  - Added the required column `username` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_usernameId_fkey";

-- AlterTable
CREATE SEQUENCE products_id_seq;
ALTER TABLE "products" DROP COLUMN "usernameId",
ADD COLUMN     "username" VARCHAR(100) NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('products_id_seq');
ALTER SEQUENCE products_id_seq OWNED BY "products"."id";

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_usernameId_fkey";

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "usernameId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_usernameId_fkey" FOREIGN KEY ("usernameId") REFERENCES "users"("username") ON DELETE SET NULL ON UPDATE CASCADE;

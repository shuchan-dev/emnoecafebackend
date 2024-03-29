import { Product, User } from "@prisma/client";
import { prisma } from "../src/application/database";
import bcrypt from "bcrypt";

export class UserTest {
  static async delate() {
    await prisma.user.deleteMany({
      where: {
        username: "test",
      },
    });
  }

  static async create() {
    await prisma.user.create({
      data: {
        username: "test",
        name: "test",
        password: await bcrypt.hash("test", 10),
        token: "test",
      },
    });
  }

  static async get(): Promise<User> {
    const user = await prisma.user.findFirst({
      where: {
        username: "test",
      },
    });
    if (!user) throw new Error("User is not found");
    return user;
  }
}

export class ProductTest {
  static async delateAll() {
    await prisma.product.deleteMany({
      where: {
        username_seller: "test",
      },
    });
  }
  static async create() {
    await prisma.product.create({
      data: {
        product_name: "test",
        product_desc: "test",
        product_category: "makanan",
        product_price: "1",
        product_quantity: "1",
        username_seller: "test",
      },
    });
  }
  static async get(): Promise<Product> {
    const product = await prisma.product.findFirst({
      where: {
        username_seller: "test",
      },
    });
    if (!product) throw new Error("Product is not found");

    return product;
  }
}

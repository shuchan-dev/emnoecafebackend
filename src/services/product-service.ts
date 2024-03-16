import { User } from "@prisma/client";
import {
  CreateProductRequest,
  GetAllProductResponse,
  ProductResponse,
  toGetAllProductResponse,
  toProductResponse,
} from "../model/product-model";
import { ProductValidation } from "../validation/product-valodation";
import { Validation } from "../validation/validation";
import { prisma } from "../application/database";
import { ResponseError } from "../error/response-error";

export class ProductService {
  // service for create product must be logged in
  static async create(
    user: User,
    request: CreateProductRequest
  ): Promise<ProductResponse> {
    // validate the data before insert to database create file product-validation.ts use zod for validation
    const createRequest = Validation.validate(
      ProductValidation.CREATE,
      request
    );
    // Membuat objek baru bernama `record`
    const record = {
      // Menyalin semua properti dari objek `createRequest` ke dalam objek `record`
      ...createRequest,
      // Menambahkan properti baru ke objek `record`, yaitu `username_seller`
      // Nilainya diambil dari `user.username`, menunjukkan bahwa produk yang akan dibuat akan
      // terkait dengan user yang sedang login, dalam hal ini "username_seller"
      ...{ username_seller: user.username },
    };
    // Menggunakan Prisma untuk membuat produk baru dalam database
    const product = await prisma.product.create({
      // Memberikan objek `record` sebagai argumen untuk properti `data`
      // Ini berisi data yang diperlukan untuk membuat produk, termasuk informasi user yang sedang masuk
      data: record,
    });

    // lalu return kan hasilnya berdasarkan model respon yang sudah dibuat
    return toProductResponse(product);
  }

  // fungsi untuk ambil product berdasarkan id dan username_seller
  static async get(user: User, id: number): Promise<ProductResponse> {
    // check produk ada atau tidak di database, berdasarkan id dan username
    const product = await prisma.product.findUnique({
      where: {
        id: id,
        username_seller: user.username,
      },
    });
    // jika tidak ada maka return error nya
    if (!product) {
      throw new ResponseError(404, "Product not found");
    }
    /*  jika ada maka return hasilnya sesuai model response yang sudah dibuat di 
    file product-model.ts
    */
    return toProductResponse(product);
  }

  // getAll products
  static async getAllProduct(): Promise<GetAllProductResponse[]> {
    // cek produk ada atau tidak di database,
    const products = await prisma.product.findMany();
    // jika tidak ada maka return error nya
    if (!products || products.length === 0) {
      throw new ResponseError(
        404,
        "The product you are looking for does not exist"
      );
    }
    // jika ada maka return hasilnya sesuai model response yang sudah dibuat
    const response = products.map((products) =>
      toGetAllProductResponse(products)
    );
    return response;
  }

  // get All product by username_seller
  static async getAllProductByUsernameSeller(
    user: User
  ): Promise<ProductResponse[]> {
    // check produk ada atau tidak di database, berdasarkan username
    const product = await prisma.product.findMany({
      where: {
        username_seller: user.username,
      },
    });

    // format response error ketika product kosung atau belum ada product nya
    const responseData: any = {
      success: true,
      status: 404,
      message: "Successful",
      data: "you haven't made a product yet", // Response dari error
    };
    // jika tidak ada maka return error nya
    if (!product || product.length === 0) {
      throw new ResponseError(404, responseData);
    }
    // jika ada maka return hasilnya sesuai model response yang sudah dibuat
    const response = product.map((product) => toProductResponse(product));
    return response;
  }
}

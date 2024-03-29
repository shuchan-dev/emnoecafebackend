import { Product, User } from "@prisma/client";
import {
  CreateProductRequest,
  GetAllProductResponse,
  ProductResponse,
  SearchProductRequest,
  toGetAllProductResponse,
  toProductResponse,
  UpdateProductRequest,
} from "../model/product-model";
import { ProductValidation } from "../validation/product-valodation";
import { Validation } from "../validation/validation";
import { prisma } from "../application/database";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";

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
    // ubah product_name, des, dan category menjadi lowerCase saat di masukan kedatabase
    const toloweCase = {
      username_seller: record.username_seller,
      product_name: record.product_name.toLowerCase(),
      product_desc: record.product_desc.toLowerCase(),
      product_category: record.product_category.toLowerCase(),
      product_price: record.product_price,
      product_quantity: record.product_quantity,
    };

    // Menggunakan Prisma untuk membuat produk baru dalam database
    const product = await prisma.product.create({
      // Memberikan objek `record` sebagai argumen untuk properti `data`
      // Ini berisi data yang diperlukan untuk membuat produk, termasuk informasi user yang sedang masuk
      data: toloweCase,
    });

    // lalu return kan hasilnya berdasarkan model respon yang sudah dibuat
    return toProductResponse(product);
  }

  // Fungsi untuk memeriksa apakah produk harus ada berdasarkan id dan username penjual
  static async checkProductMustExists(
    username_seller: string,
    productId: number
  ): Promise<Product> {
    // check produk ada atau tidak di database, berdasarkan id dan username_seller
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
        username_seller: username_seller,
      },
    });
    // jika tidak ada maka return error nya
    if (!product) {
      throw new ResponseError(404, "Product not found");
    }
    return product;
  }

  // fungsi untuk ambil product berdasarkan id dan username_seller
  static async get(user: User, id: number): Promise<ProductResponse> {
    // Memeriksa keberadaan produk dengan menggunakan fungsi checkProductMustExists
    const product = await this.checkProductMustExists(user.username, id);
    /*  Jika produk ditemukan, mengonversi data produk ke format respons yang telah ditentukan 
  dalam file product-model.ts
    */
    return toProductResponse(product);
  }

  // Fungsi untuk mengupdate produk berdasarkan id dan username penjual
  static async update(
    user: User,
    request: UpdateProductRequest
  ): Promise<ProductResponse> {
    // Validasi terlebih dahulu permintaan update produk
    const updateProductRequest = Validation.validate(
      ProductValidation.UPDATE,
      request
    );
    // Memeriksa keberadaan produk dengan menggunakan fungsi checkProductMustExists
    await this.checkProductMustExists(user.username, updateProductRequest.id);

    // ubah product_name, des, dan category menjadi lowerCase saat di masukan kedatabase
    const toloweCase = {
      id: updateProductRequest.id,
      product_name: updateProductRequest.product_name.toLowerCase(),
      product_desc: updateProductRequest.product_desc.toLowerCase(),
      product_category: updateProductRequest.product_category.toLowerCase(),
      product_price: updateProductRequest.product_price,
      product_quantity: updateProductRequest.product_quantity,
    };
    // jika valid akukan update data produk di database
    const product = await prisma.product.update({
      where: {
        id: toloweCase.id,
        username_seller: user.username,
      },
      data: toloweCase,
    });
    // Mengonversi data produk yang telah diupdate ke format respons yang telah ditentukan
    return toProductResponse(product);
  }

  // get product by id
  static async getById(id: number): Promise<ProductResponse> {
    // check produk ada atau tidak di database, berdasarkan id
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    // jika tidak ada maka return error nya
    if (!product) {
      throw new ResponseError(404, "Product not found");
    }
    // jika ada maka return hasilnya sesuai model response yang sudah dibuat
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
      error: true,
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

  // remove product service
  static async remove(user: User, id: number): Promise<ProductResponse> {
    // Memeriksa apakah produk yang akan dihapus ada di database
    await this.checkProductMustExists(user.username, id);
    // Menghapus produk dari database menggunakan Prisma
    const product = await prisma.product.delete({
      where: {
        id: id, // Menggunakan id produk untuk menentukan produk yang akan dihapus
        username_seller: user.username, // Memastikan hanya pemilik produk yang dapat menghapusnya
      },
    });
    // Mengonversi data produk yang dihapus ke dalam format respons yang telah ditentukan
    return toProductResponse(product);
  }

  // Search Service
  static async search(
    user: User,
    request: SearchProductRequest
    // Mengembalikan janji (Promise) yang berisi respons pencarian produk dalam bentuk halaman
  ): Promise<Pageable<ProductResponse>> {
    // Validation the data search
    const searchRequest = Validation.validate(
      ProductValidation.SEARCH,
      request
    );

    // Hitung jumlah data yang akan dilewati dalam pencarian berbasis halaman
    const skip = (searchRequest.page - 1) * searchRequest.size;

    // Filter dinamis atau kueri dinamis
    const filters = [];
    // Periksa apakah ada nama produk dan nama penjual
    if (searchRequest.product_name) {
      filters.push({
        OR: [
          {
            product_name: {
              contains: searchRequest.product_name,
            },
          },
          {
            username_seller: {
              contains: searchRequest.username_seller,
            },
          },
        ],
      });
    }
    // Periksa apakah ada deskripsi produk
    if (searchRequest.product_desc) {
      filters.push({
        product_desc: {
          contains: searchRequest.product_desc,
        },
      });
    }
    // Periksa apakah ada kategori produk
    if (searchRequest.product_category) {
      filters.push({
        product_category: {
          contains: searchRequest.product_category,
        },
      });
    }

    // Melakukan pencarian produk berdasarkan filter yang dibuat
    const products = await prisma.product.findMany({
      where: {
        // Hanya mencari produk yang dimiliki oleh pengguna
        username_seller: user.username,
        // Menggunakan filter dinamis untuk mencocokkan kriteria pencarian
        AND: filters,
      },
      // Menentukan jumlah maksimal data yang akan diambil
      take: searchRequest.size,
      // Melewati sejumlah data berdasarkan halaman yang diminta
      skip: skip,
    });

    // Menghitung total jumlah produk berdasarkan filter yang sama
    const total = await prisma.product.count({
      where: {
        username_seller: user.username, // Hanya menghitung produk yang dimiliki oleh pengguna
        AND: filters, // Menggunakan filter dinamis yang sama dengan pencarian sebelumnya
      },
    });

    // Mengembalikan respons pencarian dalam bentuk data produk dan informasi halaman
    return {
      // Mengubah setiap produk ke dalam format respons yang diinginkan
      data: products.map((product) => toProductResponse(product)),
      paging: {
        // Halaman saat ini
        current_page: searchRequest.page,
        // Total halaman yang tersedia berdasarkan jumlah total produk dan ukuran halaman
        total_page: Math.ceil(total / searchRequest.size),
        // Ukuran halaman yang ditentukan oleh pengguna
        size: searchRequest.size,
      },
    };
  }
}

import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateProductRequest } from "../model/product-model";
import { ProductService } from "../services/product-service";
import { logger } from "../application/logging";

export class ProductController {
  /* controller untuk membuat product baru ada 3 parameter req dari user yang
    sudah login res untuk respon setelah data masuk atau gagal. next untuk
    penanganan error nya
    */
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // buat requestnya, tangkap request body
      const request: CreateProductRequest = req.body as CreateProductRequest;
      // lalu kirim ke service
      const response = await ProductService.create(req.user!, request);
      // Persiapkan data respons sesuai format yang diinginkan
      const responseData = {
        success: true,
        status: 200,
        message: "Successful",
        data: response, // Response dari service
      };
      // Kirim respons
      res.status(200).json(responseData);
    } catch (e) {
      next(e);
    }
  }
  /* controller untuk mengambil produk berdasarkan id lewat params
   */
  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // ambil id dari params dan kirim ke service.
      const productId = Number(req.params.productId);
      const response = await ProductService.get(req.user!, productId);
      // Persiapkan data respons sesuai format yang diinginkan
      const responseData = {
        success: true,
        status: 200,
        message: "Successful",
        data: response, // Response dari service
      };
      // lalu return response nya
      res.status(200).json(responseData);
    } catch (e) {
      next(e);
    }
  }
  // get All product
  static async getAll(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // Memanggil layanan untuk melakukan proses pengambilan data
      const response = await ProductService.getAllProduct();
      // Persiapkan data respons sesuai format yang diinginkan
      const responseData = {
        success: true,
        status: 200,
        message: "Successful",
        data: response, // Response dari service
      };
      // Mengirimkan respons JSON
      res.status(200).json(responseData);
    } catch (e) {
      // Menangani kesalahan yang terjadi selama proses
      next(e);
    }
    return;
  }

  // get all product by username_seller
  static async getByUser(req: UserRequest, res: Response, next: NextFunction) {
    try {
      //  Memanggil layanan untuk melakukan proses pengambilan data
      const response = await ProductService.getAllProductByUsernameSeller(
        req.user!
      );
      // Persiapkan data respons sesuai format yang diinginkan
      const responseData = {
        success: true,
        status: 200,
        message: "Successful",
        data: response, // Response dari service
      };
      // lalu return response nya
      res.status(200).json(responseData);
    } catch (e) {
      // jika ada error tangkap erronya disini
      next(e);
    }
  }
}

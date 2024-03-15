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
      // lalu return response nya
      res.status(200).json({
        data: response,
      });
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
      // lalu return response nya
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
  static async getAll(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // Memanggil layanan untuk melakukan proses pengambilan data
      const response = await ProductService.getAllProduct();
      // Mengirimkan respons JSON
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      // Menangani kesalahan yang terjadi selama proses
      next(e);
    }
    return;
  }
}

import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import {
  CreateProductRequest,
  SearchProductRequest,
  UpdateProductRequest,
} from "../model/product-model";
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
      // lau kirim ke service
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
  /* controller untuk Update product ada 3 parameter req dari user yang
    sudah login res untuk respon setelah data masuk atau gagal. next untuk
    penanganan error nya
    */
  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // buat requestnya, tangkap request body
      const request: UpdateProductRequest = req.body as UpdateProductRequest;
      // ambil id dari params
      request.id = Number(req.params.productId);
      // lalu kirim ke service
      const response = await ProductService.update(req.user!, request);
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

  // get product by id
  static async getById(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // tangkap parameternya lalu ubah menjadi number atau numerik
      const productId = Number(req.params.id);
      // lalu kirim ke service
      const response = await ProductService.getById(productId);
      // Persiapkan data respons sesuai format yang diinginkan
      const responseData = {
        success: true,
        status: 200,
        message: "Successful",
        data: response, // Response dari service
      };
      // kirim responnya
      res.status(200).json(responseData);
    } catch (e) {
      // tangkap errornya jika terjadi error
      next(e);
    }
  }
  // controller untuk hapus product
  static async remove(req: UserRequest, res: Response, next: NextFunction) {
    try {
      //ambil params id nya
      const productId = Number(req.params.productId);
      // lalu kirim ke service
      await ProductService.remove(req.user!, productId);
      // Persiapkan data respons sesuai format yang diinginkan
      const responseData = {
        success: true,
        status: 200,
        message: "Successful",
        data: "Success Deleted Products",
      };
      // Kirim respons
      res.status(200).json(responseData);
    } catch (e) {
      next(e);
    }
  }

  // controller untuk search product
  static async search(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // ambil requestnya, tangkap request body nya
      const request: SearchProductRequest = {
        username_seller: req.query.username_seller as string,
        product_name: req.query.product_name as string,
        product_desc: req.query.product_desc as string,
        product_category: req.query.product_category as string,
        page: req.query.page ? Number(req.query.page) : 1,
        size: req.query.size ? Number(req.query.size) : 10,
      };
      // lalu kirim ke service
      const response = await ProductService.search(req.user!, request);
      // Persiapkan data respons sesuai format yang diinginkan
      const responseData = {
        success: true,
        status: 200,
        message: "Successful",
        ...response,
      };
      // Kirim respons
      res.status(200).json(responseData);
    } catch (e) {
      next(e);
    }
  }
}

import { Request, Response, NextFunction } from "express";
import {
  CreateUserRequest,
  LoginUserRequest,
  UpdateUserRequest,
} from "../model/user-model";
import { UserService } from "../services/user-service";
import { UserRequest } from "../type/user-request";

export class UserController {
  // Metode untuk menangani permintaan registrasi user
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      // Mengambil data permintaan pembuatan user dari request body
      const request: CreateUserRequest = req.body as CreateUserRequest;
      // Memanggil layanan untuk melakukan registrasi pengguna
      const response = await UserService.register(request);
      // Mengirimkan respons JSON dengan data hasil registrasi
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      // Menangani kesalahan yang terjadi selama proses registrasi
      next(e);
    }
  }

  // Metode untuk menangani permintaan login user
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      // Mengambil data permintaan login user dari request body
      const request: LoginUserRequest = req.body as CreateUserRequest;
      // Memanggil layanan untuk melakukan proses login pengguna
      const response = await UserService.login(request);
      // Mengirimkan respons JSON dengan data hasil login
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      // Menangani kesalahan yang terjadi selama proses login
      next(e);
    }
  }

  // Metode untuk menangani permintaan pengambilan data user
  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // Memanggil layanan untuk melakukan proses pengambilan data
      const response = await UserService.get(req.user!);
      // Mengirimkan respons JSON
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      // Menangani kesalahan yang terjadi selama proses
      next(e);
    }
  }

  // Metode untuk menangani update user
  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // Memanggil layanan untuk melakukan proses pengambilan data
      const request: UpdateUserRequest = req.body as UpdateUserRequest;
      const response = await UserService.update(req.user!, request);
      // Mengirimkan respons JSON
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      // Menangani kesalahan yang terjadi selama proses
      next(e);
    }
  }

  // Metode untuk menangani Logout user
  static async logout(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // Memanggil layanan untuk melakukan proses pengambilan data
      await UserService.logout(req.user!);
      // Mengirimkan respons JSON
      res.status(200).json({
        data: "Logout Success",
      });
    } catch (e) {
      // Menangani kesalahan yang terjadi selama proses
      next(e);
    }
  }
  // Create get All User afterlogin
  static async getAll(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // Memanggil layanan untuk melakukan proses pengambilan data
      const response = await UserService.getAll();
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

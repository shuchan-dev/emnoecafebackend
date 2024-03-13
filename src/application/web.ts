import express from "express";
import { publicRouter } from "../route/public-api";
import { errorMiddleware } from "../middleware/error-middleware";
import { apiRouter } from "../route/api";

// Membuat aplikasi Express baru
export const web = express();
// Menggunakan middleware express.json() untuk menguraikan body permintaan HTTP dalam format JSON
web.use(express.json());
// Menggunakan router publicRouter untuk menangani rute-rute publik dalam aplikasi
web.use(publicRouter);
// Router Untuk cek apakah sudah login atau belum jadi semua route wajib login
web.use(apiRouter);
// Menggunakan middleware errorMiddleware untuk menangani kesalahan yang terjadi dalam aplikasi
web.use(errorMiddleware);

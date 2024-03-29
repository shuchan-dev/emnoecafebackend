import express from "express";
import { UserController } from "../controller/user-controller";
import { ProductController } from "../controller/product-controller";

// Membuat router untuk rute-rute publik
export const publicRouter = express.Router();

// Menetapkan handler untuk route user registers
publicRouter.post("/api/users", UserController.register);

// Menetapkan handler untuk route login user
publicRouter.post("/api/users/login", UserController.login);

// API GET ALL
publicRouter.get("/api/products", ProductController.getAll);

// GET Product By id
publicRouter.get("/api/products/:id(\\d+)", ProductController.getById);

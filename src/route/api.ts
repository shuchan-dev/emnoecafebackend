import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { ProductController } from "../controller/product-controller";

// router khusus untuk yang sudah login
export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// User API
apiRouter.get("/api/users/current", UserController.get);
apiRouter.patch("/api/users/current", UserController.update);
apiRouter.delete("/api/users/current", UserController.logout);
apiRouter.get("/api/users/current/getall", UserController.getAll);

// Product API
apiRouter.post("/api/products/user/create", ProductController.create);
apiRouter.get("/api/products/user/:productId(\\d+)", ProductController.get);
apiRouter.put("/api/products/user/:productId(\\d+)", ProductController.update);
apiRouter.delete(
  "/api/products/user/:productId(\\d+)",
  ProductController.remove
);
apiRouter.get("/api/products/search", ProductController.search);
apiRouter.get("/api/products/user", ProductController.getByUser);

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
apiRouter.get("/api/users", UserController.getAll);

// Product API
apiRouter.post("/api/products", ProductController.create);
apiRouter.get("/api/products/:productId(\\d+)", ProductController.get);

import { z, ZodType } from "zod";

export class ProductValidation {
  static readonly CREATE: ZodType = z.object({
    product_name: z.string().min(2).max(100),
    product_desc: z.string().min(2).max(150),
    product_category: z.string().min(2).max(100),
    product_price: z.string().min(1),
    product_quantity: z.string().min(1).optional(),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    product_name: z.string().min(2).max(100),
    product_desc: z.string().min(2).max(150),
    product_category: z.string().min(2).max(100),
    product_price: z.string().min(1),
    product_quantity: z.string().min(1).optional(),
  });
  static readonly SEARCH: ZodType = z.object({
    product_name: z.string().min(1).optional(),
    username_seller: z.string().min(1).optional(),
    product_desc: z.string().min(1).optional(),
    product_category: z.string().min(1).optional(),
    page: z.number().min(1).positive(),
    size: z.number().min(1).max(10).positive(),
  });
}

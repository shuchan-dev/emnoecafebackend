import { z, ZodType } from "zod";

export class ProductValidation {
  static readonly CREATE: ZodType = z.object({
    product_name: z.string().min(2).max(100),
    product_desc: z.string().min(2).max(150),
    product_category: z.string().min(2).max(100),
    product_price: z.string().min(1),
    product_quantity: z.string().min(1).optional(),
  });
}

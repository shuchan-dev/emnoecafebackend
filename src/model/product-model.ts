import { Product } from "@prisma/client";

// model for product response
export type ProductResponse = {
  id: number;
  product_name: string;
  product_desc: string;
  product_category: string;
  product_price: string;
  product_quantity?: string | null;
  createAt?: Date;
  updateAt?: Date;
  username_seller: string;
};
// model for get all product response
export type GetAllProductResponse = {
  id: number;
  username_seller: string;
  product_name: string;
  product_desc: string;
  product_category: string;
  product_price: string;
  product_quantity?: string | null;
  createAt?: Date;
  updateAt?: Date;
};
// model for product request
export type CreateProductRequest = {
  product_name: string;
  product_desc: string;
  product_category: string;
  product_price: string;
  product_quantity?: string;
};
export type UpdateProductRequest = {
  id: number;
  product_name: string;
  product_desc: string;
  product_category: string;
  product_price: string;
  product_quantity?: string;
};

export type SearchProductRequest = {
  product_name?: string;
  username_seller?: string;
  product_desc?: string;
  product_category?: string;
  page: number;
  size: number;
};

export function toProductResponse(product: Product): ProductResponse {
  return {
    id: product.id,
    username_seller: product.username_seller,
    product_name: product.product_name,
    product_desc: product.product_desc,
    product_category: product.product_category,
    product_price: product.product_price,
    product_quantity: product.product_quantity,
    createAt: product.createAt,
    updateAt: product.updateAt,
  };
}

export function toGetAllProductResponse(
  product: Product
): GetAllProductResponse {
  return {
    id: product.id,
    username_seller: product.username_seller,
    product_name: product.product_name,
    product_desc: product.product_desc,
    product_category: product.product_category,
    product_price: product.product_price,
    product_quantity: product.product_quantity,
    createAt: product.createAt,
    updateAt: product.updateAt,
  };
}

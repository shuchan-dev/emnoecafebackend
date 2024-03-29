import { Product, User } from "@prisma/client";

export type UserResponse = {
  username: string;
  name: string;
  token?: string;
};
export type CreateUserRequest = {
  username: string;
  name: string;
  password: string;
};
export type LoginUserRequest = {
  username: string;
  password: string;
};

export type UpdateUserRequest = {
  name?: string;
  password?: string;
};

export function toUserResponse(user: User): UserResponse {
  return {
    name: user.name,
    username: user.username,
  };
}

export type GetAllUsers = {
  username: string;
  name: string;
  createAt?: Date;
  updateAt?: Date;
  product?: ProductResponse[];
};

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

export function getAllUserResponse(
  user: User,
  product: Product[]
): GetAllUsers {
  return {
    name: user.name,
    username: user.username,
    createAt: user.createAt,
    updateAt: user.updateAt,
    product: product.map((p) => {
      return {
        id: p.id,
        product_name: p.product_name,
        product_desc: p.product_desc,
        product_category: p.product_category,
        product_price: p.product_price,
        product_quantity: p.product_quantity,
        createAt: p.createAt,
        updateAt: p.updateAt,
        username_seller: p.username_seller,
      };
    }),
  };
}

import { User } from "@prisma/client";

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

export type GetAllUsers = {
  username: string;
  name: string;
  createAt?: Date;
  updateAt?: Date;
};

export function toUserResponse(user: User): UserResponse {
  return {
    name: user.name,
    username: user.username,
  };
}
export function getAllUserResponse(user: User): GetAllUsers {
  return {
    name: user.name,
    username: user.username,
    createAt: user.createAt,
    updateAt: user.updateAt,
  };
}

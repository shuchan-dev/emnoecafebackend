import { User } from "@prisma/client";
import { prisma } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateUserRequest,
  GetAllUsers,
  LoginUserRequest,
  UpdateUserRequest,
  UserResponse,
  getAllUserResponse,
  toUserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export class UserService {
  // Register user requst
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    // validation user request
    const registerRequest = Validation.validate(
      UserValidation.REGISTER,
      request
    );

    // Check Username in database
    const totalUserWithSameUsername = await prisma.user.count({
      where: {
        username: registerRequest.username,
      },
    });
    // if username redy
    if (totalUserWithSameUsername != 0) {
      throw new ResponseError(400, "Username alsredy exists");
    }
    // username not redy push to database and hash the password
    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);
    // push into database
    const user = await prisma.user.create({
      data: registerRequest,
    });
    // and return the response konfersi ke response
    return toUserResponse(user);
  }

  // Login User Request
  static async login(request: LoginUserRequest): Promise<UserResponse> {
    // validation request user
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);
    // check user in database
    let user = await prisma.user.findUnique({
      where: {
        username: loginRequest.username,
      },
    });
    // if user not valid
    if (!user) {
      throw new ResponseError(401, "Username or Password Wrong!");
    }
    //if user valid
    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password
    );
    // if password not valid
    if (!isPasswordValid) {
      throw new ResponseError(401, "Username or Password Wrong!");
    }
    // if valid create token
    user = await prisma.user.update({
      where: {
        username: loginRequest.username,
      },
      data: {
        token: uuid(),
      },
    });
    // return the response atau konfersi ke response
    const response = toUserResponse(user);
    response.token = user.token!;
    return response;
  }

  // get user if after login karena sudah di lakukan oleh middleware menggunakan token
  static async get(user: User): Promise<UserResponse> {
    return toUserResponse(user);
  }

  // Create Service Update User
  static async update(
    user: User,
    request: UpdateUserRequest
  ): Promise<UserResponse> {
    // validation request user
    const updateRequest = Validation.validate(UserValidation.UPDATE, request);
    // check name in database
    if (updateRequest.name) {
      user.name = updateRequest.name;
    }
    // check password in database
    if (updateRequest.password) {
      user.password = await bcrypt.hash(updateRequest.password, 10);
    }
    // if checked done
    const result = await prisma.user.update({
      where: {
        username: user.username,
      },
      data: user,
    });

    // after done return the response konfersi ke response
    return toUserResponse(result);
  }
  // Create Service Logout User
  static async logout(user: User): Promise<UserResponse> {
    // update token to be null
    const result = await prisma.user.update({
      where: {
        username: user.username,
      },
      data: {
        token: null,
      },
    });
    return toUserResponse(result);
  }
  // Create Serveice get all User after login
  static async getAll(): Promise<GetAllUsers[]> {
    const result = await prisma.user.findMany();

    const response = result.map((user) => getAllUserResponse(user));
    // after done return the response konfersi ke response
    return response;
  }
}

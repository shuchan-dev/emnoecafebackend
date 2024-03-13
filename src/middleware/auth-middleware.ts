import { NextFunction, Request, Response } from "express";
import { prisma } from "../application/database";
import { UserRequest } from "../type/user-request";

// login function
export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  // catch the token
  const token = req.get("X-API-TOKEN");
  // check token if valid query to database
  if (token) {
    const user = await prisma.user.findFirst({
      where: {
        token: token,
      },
    });
    // check if the user exists
    if (user) {
      req.user = user;
      next();
      return;
    }
  }
  //if not valid
  res
    .status(401)
    .json({
      errors: "Unauthorized!",
    })
    .end();
};

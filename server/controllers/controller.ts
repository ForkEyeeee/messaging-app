import dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

declare module "jsonwebtoken" {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    userId: string;
  }
}

export const validateLocationSetJWT = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

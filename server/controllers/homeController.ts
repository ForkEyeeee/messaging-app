import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import passport from "passport";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();

export const homeGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const usertoken: any = req.headers.authorization;
    const token = usertoken.split(" ");
    const decoded = jwt.verify(token[1], process.env.signature as any);
    console.log(decoded);
    res.json({ token: decoded });
  }
);

import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import passport from "passport";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user";
import dotenv from "dotenv";
dotenv.config();

export const getHomePage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const usertoken: any = req.headers.authorization;
    const token = usertoken.split(" ");
    const decoded = jwt.verify(token[1], process.env.signature as any);
    const users = await User.find({});
    res.json({ token: decoded, users: users });
  }
);

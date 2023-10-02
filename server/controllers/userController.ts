import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import passport from "passport";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();

// export const getUsers = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     res.json({ token: decoded });
//   }
// );

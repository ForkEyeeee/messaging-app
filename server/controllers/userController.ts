import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import passport from "passport";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();

// export const getUsers = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     let { userId } = req.body;
//     const user = await User.findById({});
//     res.json({ token: decoded });
//   }
// );

export const getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ _id: req.query.userid });
    res.json({ user: user });
  }
);

interface Decoded {
  user?: {
    _id: string;
    username: string;
  };
  iat: number;
  exp: number;
}

export const getChat = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const clickedUser = await User.findOne({ _id: req.query.userid }); // this is the person you clicked on
    const usertoken: any = req.headers.authorization;
    const token = usertoken.split(" ");
    const decoded: Decoded = jwt.verify(token[1], process.env.signature as any);
    const currentUser = await User.findById({ _id: decoded.user._id } as any);
    console.log(decoded);
    res.json({ currentUser: currentUser, clickedUser: clickedUser });
  }
);

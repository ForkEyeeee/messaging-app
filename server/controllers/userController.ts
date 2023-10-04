import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();
import Message from "../models/message";

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

interface User {
  messages: [];
  _id: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  about: string;
  phone: string;
  __v: number;
}

export const getChat = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const clickedUser: User | null = await User.findById({
      _id: req.query.userid,
    }); // this is the person you clicked on
    const usertoken: any = req.headers.authorization;
    const token = usertoken.split(" ");
    const decoded: Decoded | string | JwtPayload = jwt.verify(
      token[1],
      process.env.signature as any
    );
    const userId: any = (<any>decoded).user._id;
    const currentUser: User | null = await User.findById({
      _id: userId,
    } as any);
    console.log(decoded);
    const messages = await Message.find({
      $or: [
        { _id: { $in: currentUser!.messages } },
        { _id: { $in: clickedUser!.messages } },
      ],
    }).sort({ time: 1 });
    res.json({
      messages: messages,
    });
  }
);

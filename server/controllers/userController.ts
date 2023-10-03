import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import passport from "passport";
import jwt from "jsonwebtoken";
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
    // Accessing userid from query parameters
    // const commentIds = post.comments.map((comment: any) => comment.toString());
    // const comments = await Comment.find({ _id: { $in: commentIds } }).select({
    //   username: 1,
    //   content: 1,
    //   time: 1,
    //   _id: 1,
    // });
    res.json({ user: user });
  }
);

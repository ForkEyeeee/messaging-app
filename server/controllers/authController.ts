import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import passport from "passport";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();

type User = {
  username: string;
  password: string;
  _id: string;
  __v: number;
};

type Info = {
  message: string;
};

export const signUpPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "signup",
      { session: false },
      (err: object, user: User) => {
        if (err || !user) {
          return res.status(400).json({
            message: `Username, ${req.body.username}, already exists.`,
          });
        }
        res.json({
          message: "Signup successful",
          user: user,
        });
      }
    )(req, res, next);
  }
);

export const logInPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "login",
      async (err: object, user: User, info: Info) => {
        try {
          if (err || !user) {
            const error = new Error("An error occurred."); //wrong password or user
            return next(error);
          }

          req.login(user, { session: false }, async error => {
            if (error) return next(error);
            console.log(user);
            const body = { _id: user._id, username: user.username };
            const token = jwt.sign(
              { user: body },
              process.env.signature as any,
              {
                expiresIn: "10s",
              }
            );
            const Message = info.message;
            console.log(info);
            return res.json({ Message, token });
          });
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

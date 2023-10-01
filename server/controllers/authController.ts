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
      (err: Error, user: User, info: Info) => {
        if (err || !user) {
          // Return a 400 status with a custom error message
          const message = info ? info.message : `An error occurred.`;
          return res.status(400).json({
            message,
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
            console.log(err);
            return res.status(400).json({ message: "Invalid credentials" });
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
            const message = info.message;
            console.log(info);
            return res.json({ message, token });
          });
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

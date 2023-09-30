import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import passport from "passport";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();

export const signUpPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("signup", { session: false }),
      async (req: Request, res: Response, next: NextFunction) => {
        res.json({
          message: "Signup successful",
          user: req.user,
        });
      };
  }
);

export const logInPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "login",
      async (
        err: Error,
        user: {
          _id: Types.ObjectId;
          username: string;
          password: string;
          __v: number;
        },
        info: {
          message: string;
        }
      ) => {
        try {
          if (err || !user) {
            const error = new Error("An error occurred.");
            return next(error);
          }

          req.login(user, { session: false }, async error => {
            if (error) return next(error);
            console.log(user);
            const body = { _id: user._id, username: user.username };
            const token = jwt.sign(
              { user: body },
              process.env.signature as any,
              { expiresIn: "10s" }
            );
            const Message = info.message;
            return res.json({ Message, token }); //send token to client on login and set it in localstorage.
            //send it in header whenever user tries to go to a secure route and add it to App.ts with passport strategy
          });
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

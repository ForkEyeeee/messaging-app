import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import dotenv from "dotenv";
dotenv.config();
import Message from "../models/message";
import { Date } from "mongoose";
import mongoose from "mongoose";

export const getUserProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ _id: req.params.userid });
    console.log(req.params.userid);
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

interface Message {
  _id: string;
  sender: string;
  recipient: string;
  content: string;
  time: Date;
}

export const getChatMessages = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clickedUser: User | null = await User.findById({
        _id: req.params.userid,
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
      if (clickedUser === null || clickedUser === null) {
        res.status(404).json({ error: "Clicked user or messages not found" });
      } else {
        const messages = await Message.find({
          $or: [
            {
              sender: userId,
              recipient: clickedUser._id.toString(),
            },
            {
              sender: clickedUser._id.toString(),
              recipient: userId,
            },
          ],
        }).sort({ time: 1 });
        const recipient = {
          firstName: clickedUser.firstname,
          lastName: clickedUser.lastname,
          userName: clickedUser.username,
        };
        res.json({
          messages: messages,
          recipient: recipient,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export const postUserChatMessage = [
  body("message", "message must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      try {
        const { message, recipient } = req.body;
        const usertoken: any = req.headers.authorization;

        const token = usertoken.split(" ");
        const decoded: Decoded | string | JwtPayload = jwt.verify(
          token[1],
          process.env.signature as any
        );
        const userId: any = (<any>decoded).user._id;

        const newMessage = new Message({
          sender: userId,
          recipient: recipient,
          content: message,
          time: new Date(),
        });
        await newMessage.save();
        await User.findOneAndUpdate(
          { _id: userId },
          { $push: { messages: newMessage } }
        );
        res.json({ Message: newMessage });
      } catch (error) {
        console.error(error);
      }
    }
  }),
];

export const putUserChatMessage = [
  body("message", "message must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      try {
        const { message, messageId } = req.body;
        const updatedMessage: Message | null = await Message.findOneAndUpdate(
          { _id: messageId },
          { content: message }
        );
        updatedMessage!.content = message;
        res.json({ Message: updatedMessage });
      } catch (error) {
        console.error(error);
      }
    }
  }),
];

export const deleteUserChatMessage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { messageId } = req.body;
      await Message.findOneAndDelete({ _id: messageId });
      await User.findOneAndUpdate(
        { messages: messageId },
        { $pull: { messages: messageId } }
      );
      res.json({ messageId });
    } catch (error) {
      console.error(error);
    }
  }
);

export const updateUserProfile = [
  body("firstName", "Firstname must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("lastName", "Lastname must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("about", "About must not be empty").trim().isLength({ min: 1 }).escape(),
  body("phone", "Phone must not be empty").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      try {
        const { firstName, lastName, about, phone } = req.body;
        console.log(req.body);
        const usertoken: any = req.headers.authorization;

        const token = usertoken.split(" ");
        const decoded: Decoded | string | JwtPayload = jwt.verify(
          token[1],
          process.env.signature as any
        );
        const userId: any = (<any>decoded).user._id;
        console.log(userId);
        const updatedUser = await User.findOneAndUpdate(
          { _id: userId }, //req.params.id
          { firstname: firstName, lastname: lastName, about, phone },
          { new: true }
        );
        console.log(updatedUser);
        res.json({ user: updatedUser });
      } catch (error) {
        console.error(error);
      }
    }
  }),
];

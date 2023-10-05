import express from "express";
import { getHomePage } from "../controllers/homeController";
import {
  postUserChatMessage,
  getChatMessages,
  getUserProfile,
  putUserChatMessage,
  deleteUserChatMessage,
} from "../controllers/userController";

const router = express.Router();

router.get("/home", getHomePage);
router.get("/user/:userid/profile", getUserProfile);
router.get("/user/:userid/chat", getChatMessages);
router.post("/user/:userid/chat", postUserChatMessage);
router.put("/user/:userid/chat/", putUserChatMessage);
router.delete("/user/:userid/chat/", deleteUserChatMessage);

export default router;

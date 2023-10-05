import express from "express";
import { homeGet } from "../controllers/homeController";
import { getChat, getUser } from "../controllers/userController";
import { postChatMessage } from "../controllers/userController";
import {
  putChatMessage,
  deleteChatMessage,
} from "../controllers/userController";

const router = express.Router();

router.get("/home", homeGet);

router.get("/profile/user/", getUser);

router.get("/chat/user/", getChat);

router.post("/chat/user/", postChatMessage);

router.put("/chat/user/", putChatMessage);

router.delete("/chat/user/", deleteChatMessage);

// router.get("/home");

// router.get("/home", (req, res, next) => {
//   res.json({
//     message: "You made it to the secure route",
//     user: req.user,
//     token: req.body.secret_token,
//   });
// });

export default router;

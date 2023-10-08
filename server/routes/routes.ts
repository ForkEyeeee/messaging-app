import { signUpPost, logInPost } from "../controllers/authController";
import express from "express";

const router = express.Router();

router.post("/signup", signUpPost);

router.post("/login", logInPost);

export default router;

import { signUpPost, logInPost } from "../controllers/authController";
import express from "express";

const router = express.Router();

router.post("/signup", signUpPost);

router.post("/login", logInPost);

// router.get("/home", function (req, res) {
//   res.json({ test: "here" });
//   // res.redirect("/login");
// });

export default router;

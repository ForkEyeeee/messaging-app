import express from "express";
import { homeGet } from "../controllers/homeController";

const router = express.Router();

router.get("/home", homeGet);

// router.get("/home");

// router.get("/home", (req, res, next) => {
//   res.json({
//     message: "You made it to the secure route",
//     user: req.user,
//     token: req.body.secret_token,
//   });
// });

export default router;

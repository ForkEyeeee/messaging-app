import express from "express";

const router = express.Router();

router.get("/profile", (req, res, next) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.body.secret_token,
  });
});

export default router;

import { Request, Response, NextFunction } from "express";
import { Router } from "express";
const MyRouter = Router();
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  max: 10, // max of 10 requests
  handler: function (req: Request, res: Response) {
    res.status(429).json({
      success: false,
      message: "Too many login attempts, please try again after a minute.",
    });
  },
});

MyRouter.get("/", (req: Request, res: Response, next: NextFunction) => {});

export default MyRouter;

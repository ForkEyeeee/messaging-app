import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes/routes";
import secureRoutes from "./routes/secureRoutes";
import passport from "passport";
import "./auth/auth";

const app = express();

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  })
);
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(compression());

app.use("/api", routes);
app.use(
  "/api/user",
  passport.authenticate("jwt", { session: false }),
  secureRoutes
);

// Set up mongoose connection
mongoose.set("strictQuery", false);
const mongoDB: any = process.env.MONGODB_URI || process.env.dev_db_url;

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

//  error handler
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status((err as any).status || 500);
  console.log(err);
  res.json({ message: res.locals.message, success: false });
});

module.exports = app;

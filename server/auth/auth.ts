import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTstrategy, ExtractJwt } from "passport-jwt";
import User from "../models/user";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        console.log("Attempting to create user:", username);
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          console.log("User already exists:", username);
          return done(null, false, { message: "Username already taken" });
        }
        const user = await User.create({ username, password });
        console.log("User created successfully:", user);
        return done(null, user);
      } catch (error) {
        console.error("Error during user creation:", error);
        done(error);
      }
    }
  )
);

// For the login strategy
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);
        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

// For JWT strategy
passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.signature, // secret key
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;

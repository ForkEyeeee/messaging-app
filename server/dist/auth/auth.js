"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const user_1 = __importDefault(require("../models/user"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// For the signup strategy
passport_1.default.use("signup", new passport_local_1.Strategy({
    usernameField: "username",
    passwordField: "password",
}, async (username, password, done) => {
    try {
        console.log(username);
        const user = await user_1.default.create({ username, password });
        return done(null, user);
    }
    catch (error) {
        done(error);
    }
}));
// For the login strategy
passport_1.default.use("login", new passport_local_1.Strategy({
    usernameField: "username",
    passwordField: "password",
}, async (username, password, done) => {
    try {
        const user = await user_1.default.findOne({ username });
        if (!user) {
            return done(null, false, { message: "User not found" });
        }
        const validate = await user.isValidPassword(password);
        if (!validate) {
            return done(null, false, { message: "Wrong Password" });
        }
        return done(null, user, { message: "Logged in Successfully" });
    }
    catch (error) {
        return done(error);
    }
}));
// For JWT strategy
passport_1.default.use(new passport_jwt_1.Strategy({
    secretOrKey: process.env.signature,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
}, async (token, done) => {
    try {
        return done(null, token.user);
    }
    catch (error) {
        done(error);
    }
}));

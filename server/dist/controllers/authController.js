"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInPost = exports.signUpPost = void 0;
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.signUpPost = (0, express_async_handler_1.default)(async (req, res, next) => {
    passport_1.default.authenticate("signup", { session: false }),
        async (req, res, next) => {
            res.json({
                message: "Signup successful",
                user: req.user,
            });
        };
});
exports.logInPost = (0, express_async_handler_1.default)(async (req, res, next) => {
    passport_1.default.authenticate("login", async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error("An error occurred.");
                return next(error);
            }
            req.login(user, { session: false }, async (error) => {
                if (error)
                    return next(error);
                console.log(user);
                const body = { _id: user._id, username: user.username };
                const token = jsonwebtoken_1.default.sign({ user: body }, process.env.signature, { expiresIn: "10s" });
                const Message = info.message;
                return res.json({ Message, token }); //send token to client on login and set it in localstorage.
                //send it in header whenever user tries to go to a secure route and add it to App.ts with passport strategy
            });
        }
        catch (error) {
            return next(error);
        }
    })(req, res, next);
});

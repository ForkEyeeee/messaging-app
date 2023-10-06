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
    passport_1.default.authenticate("signup", { session: false }, (err, user, info) => {
        if (err || !user) {
            // Return a 400 status with a custom error message
            const message = info ? info.message : `An error occurred.`;
            return res.status(400).json({
                message,
            });
        }
        res.json({
            message: "Signup successful",
            user: user,
        });
    })(req, res, next);
});
exports.logInPost = (0, express_async_handler_1.default)(async (req, res, next) => {
    passport_1.default.authenticate("login", async (err, user, info) => {
        try {
            if (err || !user) {
                console.error(err);
                return res.status(400).json({ message: "Invalid credentials" });
            }
            req.login(user, { session: false }, async (error) => {
                if (error)
                    return next(error);
                const body = { _id: user._id, username: user.username };
                const token = jsonwebtoken_1.default.sign({ user: body }, process.env.signature, {
                    expiresIn: "1hr",
                });
                const message = info.message;
                return res.json({ message, token });
            });
        }
        catch (error) {
            return next(error);
        }
    })(req, res, next);
});

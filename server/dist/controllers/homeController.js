"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHomePage = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_1 = __importDefault(require("../models/user"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.getHomePage = (0, express_async_handler_1.default)(async (req, res, next) => {
    const usertoken = req.headers.authorization;
    const token = usertoken.split(" ");
    const decoded = jsonwebtoken_1.default.verify(token[1], process.env.signature);
    const users = await user_1.default.find({});
    res.json({ token: decoded, users: users });
});

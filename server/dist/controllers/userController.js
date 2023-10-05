"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChat = exports.getUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const message_1 = __importDefault(require("../models/message"));
exports.getUser = (0, express_async_handler_1.default)(async (req, res, next) => {
    const user = await user_1.default.findOne({ _id: req.query.userid });
    res.json({ user: user });
});
exports.getChat = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const clickedUser = await user_1.default.findById({
            _id: req.query.userid,
        }); // this is the person you clicked on
        const usertoken = req.headers.authorization;
        const token = usertoken.split(" ");
        const decoded = jsonwebtoken_1.default.verify(token[1], process.env.signature);
        const userId = decoded.user._id;
        const currentUser = await user_1.default.findById({
            _id: userId,
        });
        if (!clickedUser || !clickedUser.messages) {
            res.status(404).json({ error: "Clicked user or messages not found" });
        }
        console.log("clickedUser " + clickedUser);
        console.log("currentUser " + currentUser);
        const messages = await message_1.default.find({
            $or: [
                { _id: { $in: currentUser.messages } },
                { _id: { $in: clickedUser.messages } },
            ],
        }).sort({ time: 1 });
        res.json({
            messages: messages,
        });
    }
    catch (error) {
        console.error(error);
    }
});

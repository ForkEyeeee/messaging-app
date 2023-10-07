"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.deleteUserChatMessage = exports.putUserChatMessage = exports.postUserChatMessage = exports.getChatMessages = exports.getUserProfile = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const express_validator_1 = require("express-validator");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const message_1 = __importDefault(require("../models/message"));
exports.getUserProfile = (0, express_async_handler_1.default)(async (req, res, next) => {
    const user = await user_1.default.findOne({ _id: req.params.userid });
    console.log(req.params.userid);
    res.json({ user: user });
});
exports.getChatMessages = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const clickedUser = await user_1.default.findById({
            _id: req.params.userid,
        }); // this is the person you clicked on
        const usertoken = req.headers.authorization;
        const token = usertoken.split(" ");
        const decoded = jsonwebtoken_1.default.verify(token[1], process.env.signature);
        const userId = decoded.user._id;
        const currentUser = await user_1.default.findById({
            _id: userId,
        });
        if (clickedUser === null || clickedUser === null) {
            res.status(404).json({ error: "Clicked user or messages not found" });
        }
        else {
            const messages = await message_1.default.find({
                $or: [
                    {
                        sender: userId,
                        recipient: clickedUser._id.toString(),
                    },
                    {
                        sender: clickedUser._id.toString(),
                        recipient: userId,
                    },
                ],
            }).sort({ time: 1 });
            const recipient = {
                firstName: clickedUser.firstname,
                lastName: clickedUser.lastname,
                userName: clickedUser.username,
            };
            res.json({
                messages: messages,
                recipient: recipient,
            });
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.postUserChatMessage = [
    (0, express_validator_1.body)("message", "message must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (0, express_async_handler_1.default)(async (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        else {
            try {
                const { message, recipient } = req.body;
                const usertoken = req.headers.authorization;
                const token = usertoken.split(" ");
                const decoded = jsonwebtoken_1.default.verify(token[1], process.env.signature);
                const userId = decoded.user._id;
                const newMessage = new message_1.default({
                    sender: userId,
                    recipient: recipient,
                    content: message,
                    time: new Date(),
                });
                await newMessage.save();
                await user_1.default.findOneAndUpdate({ _id: userId }, { $push: { messages: newMessage } });
                res.json({ Message: newMessage });
            }
            catch (error) {
                console.error(error);
            }
        }
    }),
];
exports.putUserChatMessage = [
    (0, express_validator_1.body)("message", "message must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (0, express_async_handler_1.default)(async (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        else {
            try {
                const { message, messageId } = req.body;
                const updatedMessage = await message_1.default.findOneAndUpdate({ _id: messageId }, { content: message });
                updatedMessage.content = message;
                res.json({ Message: updatedMessage });
            }
            catch (error) {
                console.error(error);
            }
        }
    }),
];
exports.deleteUserChatMessage = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const { messageId } = req.body;
        await message_1.default.findOneAndDelete({ _id: messageId });
        await user_1.default.findOneAndUpdate({ messages: messageId }, { $pull: { messages: messageId } });
        res.json({ messageId });
    }
    catch (error) {
        console.error(error);
    }
});
exports.updateUserProfile = [
    (0, express_validator_1.body)("firstName", "Firstname must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (0, express_validator_1.body)("lastName", "Lastname must not be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (0, express_validator_1.body)("about", "About must not be empty").trim().isLength({ min: 1 }).escape(),
    (0, express_validator_1.body)("phone", "Phone must not be empty").trim().isLength({ min: 1 }).escape(),
    (0, express_async_handler_1.default)(async (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        else {
            try {
                const { firstName, lastName, about, phone } = req.body;
                console.log(req.body);
                const usertoken = req.headers.authorization;
                const token = usertoken.split(" ");
                const decoded = jsonwebtoken_1.default.verify(token[1], process.env.signature);
                const userId = decoded.user._id;
                console.log(userId);
                const updatedUser = await user_1.default.findOneAndUpdate({ _id: userId }, //req.params.id
                { firstname: firstName, lastname: lastName, about, phone }, { new: true });
                console.log(updatedUser);
                res.json({ user: updatedUser });
            }
            catch (error) {
                console.error(error);
            }
        }
    }),
];

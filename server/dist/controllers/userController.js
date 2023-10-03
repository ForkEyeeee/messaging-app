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
// export const getUsers = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     let { userId } = req.body;
//     const user = await User.findById({});
//     res.json({ token: decoded });
//   }
// );
exports.getUser = (0, express_async_handler_1.default)(async (req, res, next) => {
    const user = await user_1.default.findOne({ _id: req.query.userid });
    res.json({ user: user });
});
exports.getChat = (0, express_async_handler_1.default)(async (req, res, next) => {
    const clickedUser = await user_1.default.findOne({ _id: req.query.userid }); // this is the person you clicked on
    const usertoken = req.headers.authorization;
    const token = usertoken.split(" ");
    const decoded = jsonwebtoken_1.default.verify(token[1], process.env.signature);
    const currentUser = await user_1.default.findById({ _id: decoded.user._id });
    console.log(decoded);
    res.json({ currentUser: currentUser, clickedUser: clickedUser });
});

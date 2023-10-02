"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
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
    const user = await user_1.default.findOne({ _id: req.params.userid });
    // const commentIds = post.comments.map((comment: any) => comment.toString());
    // const comments = await Comment.find({ _id: { $in: commentIds } }).select({
    //   username: 1,
    //   content: 1,
    //   time: 1,
    //   _id: 1,
    // });
    console.log(req.params.userid);
    res.json({ user: user });
});

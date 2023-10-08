"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.deleteUserChatMessage = exports.putUserChatMessage = exports.postUserChatMessage = exports.getChatMessages = exports.getUserProfile = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var user_1 = require("../models/user");
var express_async_handler_1 = require("express-async-handler");
var express_validator_1 = require("express-validator");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var message_1 = require("../models/message");
exports.getUserProfile = (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.findOne({ _id: req.params.userid })];
            case 1:
                user = _a.sent();
                res.json({ user: user });
                return [2 /*return*/];
        }
    });
}); });
exports.getChatMessages = (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var clickedUser, usertoken, token, decoded, userId, currentUser, messages, recipient, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, user_1.default.findById({
                        _id: req.params.userid,
                    })];
            case 1:
                clickedUser = _a.sent();
                usertoken = req.headers.authorization;
                token = usertoken.split(" ");
                decoded = jsonwebtoken_1.default.verify(token[1], process.env.signature);
                userId = decoded.user._id;
                return [4 /*yield*/, user_1.default.findById({
                        _id: userId,
                    })];
            case 2:
                currentUser = _a.sent();
                if (!(clickedUser === null || clickedUser === null)) return [3 /*break*/, 3];
                res.status(404).json({ error: "Clicked user or messages not found" });
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, message_1.default.find({
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
                }).sort({ time: 1 })];
            case 4:
                messages = _a.sent();
                recipient = {
                    firstName: clickedUser.firstname,
                    lastName: clickedUser.lastname,
                    userName: clickedUser.username,
                };
                res.json({
                    messages: messages,
                    recipient: recipient,
                });
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
exports.postUserChatMessage = [
    (0, express_validator_1.body)("message", "message must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var errors, _a, message, recipient, usertoken, token, decoded, userId, newMessage, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req);
                    if (!!errors.isEmpty()) return [3 /*break*/, 1];
                    res.status(400).json({ errors: errors.array() });
                    return [3 /*break*/, 5];
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    _a = req.body, message = _a.message, recipient = _a.recipient;
                    usertoken = req.headers.authorization;
                    token = usertoken.split(" ");
                    decoded = jsonwebtoken_1.default.verify(token[1], process.env.signature);
                    userId = decoded.user._id;
                    newMessage = new message_1.default({
                        sender: userId,
                        recipient: recipient,
                        content: message,
                        time: new Date(),
                    });
                    return [4 /*yield*/, newMessage.save()];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, user_1.default.findOneAndUpdate({ _id: userId }, { $push: { messages: newMessage } })];
                case 3:
                    _b.sent();
                    res.json({ Message: newMessage });
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _b.sent();
                    console.error(error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); }),
];
exports.putUserChatMessage = [
    (0, express_validator_1.body)("message", "message must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var errors, _a, message, messageId, updatedMessage, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req);
                    if (!!errors.isEmpty()) return [3 /*break*/, 1];
                    res.status(400).json({ errors: errors.array() });
                    return [3 /*break*/, 4];
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    _a = req.body, message = _a.message, messageId = _a.messageId;
                    return [4 /*yield*/, message_1.default.findOneAndUpdate({ _id: messageId }, { content: message })];
                case 2:
                    updatedMessage = _b.sent();
                    updatedMessage.content = message;
                    res.json({ Message: updatedMessage });
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _b.sent();
                    console.error(error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }),
];
exports.deleteUserChatMessage = (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var messageId, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                messageId = req.body.messageId;
                return [4 /*yield*/, message_1.default.findOneAndDelete({ _id: messageId })];
            case 1:
                _a.sent();
                return [4 /*yield*/, user_1.default.findOneAndUpdate({ messages: messageId }, { $pull: { messages: messageId } })];
            case 2:
                _a.sent();
                res.json({ messageId: messageId });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.error(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
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
    (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var errors, _a, firstName, lastName, about, phone, usertoken, token, decoded, userId, updatedUser, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req);
                    if (!!errors.isEmpty()) return [3 /*break*/, 1];
                    res.status(400).json({ errors: errors.array() });
                    return [3 /*break*/, 4];
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    _a = req.body, firstName = _a.firstName, lastName = _a.lastName, about = _a.about, phone = _a.phone;
                    usertoken = req.headers.authorization;
                    token = usertoken.split(" ");
                    decoded = jsonwebtoken_1.default.verify(token[1], process.env.signature);
                    userId = decoded.user._id;
                    return [4 /*yield*/, user_1.default.findOneAndUpdate({ _id: userId }, { firstname: firstName, lastname: lastName, about: about, phone: phone }, { new: true })];
                case 2:
                    updatedUser = _b.sent();
                    res.json({ user: updatedUser });
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _b.sent();
                    console.error(error_5);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }),
];

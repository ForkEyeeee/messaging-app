"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const homeController_1 = require("../controllers/homeController");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.get("/home", homeController_1.getHomePage);
router.get("/user/:userid/profile", userController_1.getUserProfile);
router.get("/user/:userid/chat", userController_1.getChatMessages);
router.post("/user/:userid/chat", userController_1.postUserChatMessage);
router.put("/user/:userid/chat/", userController_1.putUserChatMessage);
router.delete("/user/:userid/chat/", userController_1.deleteUserChatMessage);
exports.default = router;

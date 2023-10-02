"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const homeController_1 = require("../controllers/homeController");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.get("/home", homeController_1.homeGet);
router.get("/user/:userid", userController_1.getUser);
// router.get("/home");
// router.get("/home", (req, res, next) => {
//   res.json({
//     message: "You made it to the secure route",
//     user: req.user,
//     token: req.body.secret_token,
//   });
// });
exports.default = router;

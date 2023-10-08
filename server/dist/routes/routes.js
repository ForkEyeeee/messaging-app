"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authController_1 = require("../controllers/authController");
var express_1 = require("express");
var router = express_1.default.Router();
router.post("/signup", authController_1.signUpPost);
router.post("/login", authController_1.logInPost);
exports.default = router;

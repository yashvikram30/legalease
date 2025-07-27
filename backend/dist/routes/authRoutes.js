"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const protect_1 = __importDefault(require("../middleware/protect"));
const router = express_1.default.Router();
router.post("/register", authController_1.register);
router.post("/login", authController_1.login);
router.post("/logout", authController_1.logout);
router.get("/profile", protect_1.default, authController_1.profile);
exports.default = router;

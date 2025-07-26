"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.logout = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "User exists" });
        const hashed = await bcryptjs_1.default.hash(password, 10);
        const user = await User_1.default.create({ email, password: hashed });
        res.status(201).json({ message: "Registered", user: { email: user.email } });
    }
    catch (err) {
        res.status(500).json({ message: "Error registering user" });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User_1.default.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });
        const match = await bcryptjs_1.default.compare(password, user.password);
        if (!match)
            return res.status(400).json({ message: "Invalid credentials" });
        req.session.user = { email };
        res.json({ message: "Logged in", user: { email } });
    }
    catch {
        res.status(500).json({ message: "Login failed" });
    }
};
exports.login = login;
const logout = (req, res) => {
    req.session.destroy(err => {
        if (err)
            return res.status(500).json({ message: "Logout failed" });
        res.clearCookie("connect.sid");
        res.json({ message: "Logged out" });
    });
};
exports.logout = logout;
const profile = (req, res) => {
    if (!req.session.user)
        return res.status(401).json({ message: "Not logged in" });
    res.json({ user: req.session.user });
};
exports.profile = profile;

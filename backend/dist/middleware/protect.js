"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protect = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
};
exports.default = protect;

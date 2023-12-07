"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function notFound(req, res) {
    res.status(404).json({
        message: "Error",
        stack: `🔍 - Not Found - ${req.originalUrl}`,
    });
}
exports.default = notFound;

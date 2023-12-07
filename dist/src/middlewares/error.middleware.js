"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res) {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === "prod" ? "🥞" : err.stack,
    });
}
exports.default = errorHandler;

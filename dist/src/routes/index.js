"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nik_validator_1 = __importDefault(require("../validators/nik.validator"));
const place_controller_1 = __importDefault(require("../controllers/place.controller"));
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
const not_found_middleware_1 = __importDefault(require("../middlewares/not-found.middleware"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.json({
        message: "Cek NIK ente bang",
    });
});
router.post("/cek-nik", nik_validator_1.default.validate, place_controller_1.default.index);
router.use(error_middleware_1.default);
router.use(not_found_middleware_1.default);
exports.default = router;

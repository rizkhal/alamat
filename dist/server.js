"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
const port = process.env.PORT || 5000;
const host = process.env.HOST || "localhost";
app_1.default.listen(port, () => {
    if (process.send) {
        console.log(`⚡️[app]: Server is running at http://${host}:${port}`);
    }
    else {
        console.error("Not working att all");
    }
});

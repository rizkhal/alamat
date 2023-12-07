"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
exports.default = {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nik } = req.body;
                const [province, city, district] = nik.slice(0, 6).match(/(\d{2})/g);
                const data = [];
                fs_1.default.createReadStream(path_1.default.join(process.cwd(), "static", "places.csv"))
                    .pipe((0, csv_parser_1.default)())
                    .on("data", (row) => {
                    if (row.kode == province) {
                        data.push({
                            provinsi: row,
                        });
                    }
                    if (row.kode == `${province}.${city}`) {
                        data.push({
                            kota: row,
                        });
                    }
                    if (row.kode == `${province}.${city}.${district}`) {
                        data.push({
                            kecamatan: row,
                        });
                    }
                })
                    .on("end", () => {
                    if (data.length > 0) {
                        const combinedObject = {
                            provinsi: {},
                            kota: {},
                            kecamatan: {},
                        };
                        data.forEach((item) => {
                            const key = Object.keys(item)[0];
                            const value = item[key];
                            combinedObject[key] = value;
                        });
                        res.json(combinedObject);
                    }
                    else {
                        res.status(404).json({ error: "Data not found" });
                    }
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Bad Request",
                });
            }
        });
    },
};

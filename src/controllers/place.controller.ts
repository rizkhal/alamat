import fs from "fs";
import csvParser from "csv-parser";
import { Request, Response } from "express";

export default {
  async index(req: Request, res: Response) {
    try {
      const { nik } = req.body;
      const [province, city, district] = nik.slice(0, 6).match(/(\d{2})/g);

      const data: any = [];

      fs.createReadStream("wilayah.csv")
        .pipe(csvParser())
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
            const combinedObject: any = {
              provinsi: {},
              kota: {},
              kecamatan: {},
            };

            data.forEach((item: any) => {
              const key = Object.keys(item)[0];
              const value = item[key];

              combinedObject[key] = value;
            });

            res.json(combinedObject);
          } else {
            res.status(404).json({ error: "Data not found" });
          }
        });
    } catch (error) {
      return res.status(500).json({
        message: "Bad Request",
      });
    }
  },
};

import { Request, Response } from "express";

export default function errorHandler(err: any, req: Request, res: Response) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "prod" ? "🥞" : err.stack,
  });
}

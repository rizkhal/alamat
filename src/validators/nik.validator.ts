import Joi, { ValidationError } from "joi";
import { NextFunction, Request, Response } from "express";

const schema = Joi.object({
  nik: Joi.string().length(16).pattern(/^\d+$/).required(),
});

export default {
  async validate(req: Request, res: Response, next: NextFunction) {
    schema
      .validateAsync(req.body)
      .then(() => next())
      .catch((error: ValidationError) => {
        res.status(422).json({
          message: "Unprocessable Content",
          errors: error.details,
        });
      });
  },
};

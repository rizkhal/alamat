import { Router, Request, Response } from "express";

import nikValidator from "../validators/nik.validator";
import placeController from "../controllers/place.controller";
import errorMiddleware from "../middlewares/error.middleware";
import notFoundMiddleware from "../middlewares/not-found.middleware";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Cek NIK ente bang",
  });
});

router.post("/cek-nik", nikValidator.validate, placeController.index);

router.use(errorMiddleware);
router.use(notFoundMiddleware);

export default router;

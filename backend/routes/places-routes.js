import express from "express";
import { check } from "express-validator";
import {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} from "../controllers/places-controllers";
import fileUpload from "../middlewares/file-upload";
import checkAuth from "../middlewares/check-auth";

const router = express.Router();

router.get("/:placeId", getPlaceById);

router.get("/user/:userId", getPlacesByUserId);

router.use(checkAuth);

router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  createPlace
);

router.patch(
  "/:placeId",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  updatePlace
);

router.delete("/:placeId", deletePlace);

export default router;

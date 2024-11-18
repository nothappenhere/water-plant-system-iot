import express from "express";
import {
  getSensors,
  getMaxTemp,
  getMinTemp,
  getSevenLastTempData,
  // getSevenLastData
} from "../controllers/sensorController.js";
const router = express.Router();

//* GET all sensors value
router.get("/", getSensors);

//* GET maximum temperature
router.get("/temp/max", getMaxTemp);

//* GET minimum temperature
router.get("/temp/min", getMinTemp);

//* GET minimum temperature
router.get("/data", getSevenLastTempData);
export default router;

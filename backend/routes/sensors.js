import express from "express";
import {
  getSensors,
  getMaxTemp,
  getMinTemp,
  // getSevenLastData
} from "../controllers/sensorController.js";
const router = express.Router();

//* GET all sensors value
router.get("/", getSensors);

//* GET maximum temperature
router.get("/max/temp", getMaxTemp);

//* GET minimum temperature
router.get("/min/temp", getMinTemp);

//* GET minimum temperature
// router.get("/data", getSevenLastData);
export default router;

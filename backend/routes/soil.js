import express from "express";
import {
  getMaxSoil,
  getMinSoil,
  getSevenLastSoilData,
} from "../controllers/soilController.js";
const router = express();

//* GET maximum soil moisture
router.get("/soil/max", getMaxSoil);

//* GET minimum soil moisture
router.get("/soil/min", getMinSoil);

//* GET seven last data soil moisture
router.get("/soil", getSevenLastSoilData);

export default router;

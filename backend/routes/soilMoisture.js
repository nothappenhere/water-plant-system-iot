import express from "express";
import { getSoilMoisture } from "../controllers/soilMoistureController.js";
const router = express();

//* GET maximum soil moisture
router.get("/soil/max", (req, res) => getSoilMoisture(req, res, "maximum"));
//* GET minimum soil moisture
router.get("/soil/min", (req, res) => getSoilMoisture(req, res, "minimum"));

export default router;

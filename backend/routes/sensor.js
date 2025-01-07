import express from "express";
import { getAllSensors, postDB } from "../controllers/sensorController.js";
const router = express.Router();

//* GET all seven last data sensor value
router.get("/", getAllSensors);

//* POST data value to database
router.post("/db/save", postDB);

export default router;

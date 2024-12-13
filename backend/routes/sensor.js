import express from "express";
import { getSensors, postDB } from "../controllers/sensorController.js";
const router = express.Router();

//* GET all sensors value
router.get("/", getSensors);

router.post("/db/save", postDB);

export default router;

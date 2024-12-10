import express from "express";
import { getSensors, postDB } from "../controllers/sensorController.js";
// import mqtt from "./mqtt.js";
// import { getMqtt } from "../controllers/mqttController.js";
const router = express.Router();

//* GET all sensors value
router.get("/", getSensors);

router.post("/save", postDB);

export default router;

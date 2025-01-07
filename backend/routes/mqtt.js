import express from "express";
import { getMqttValue } from "../controllers/mqttController.js";
const router = express();

//* GET current mqtt sensor value
router.get("/mqtt", getMqttValue);

export default router;

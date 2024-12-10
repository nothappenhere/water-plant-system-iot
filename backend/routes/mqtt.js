import express from "express";
import { getMqtt } from "../controllers/mqttController.js";
const router = express();

//* GET mqtt sensors value
router.get("/mqtt", getMqtt);

export default router;

import express from "express";
import { getMaximum, getMinimum } from "../controllers/dht11Controller.js";
const router = express();

//* GET maximum temperature
router.get("/dht/temperature/max", (req, res) =>
  getMaximum(req, res, "temperature")
);
//* GET minimum temperature
router.get("/dht/temperature/min", (req, res) =>
  getMinimum(req, res, "temperature")
);

//* GET maximum humidity
router.get("/dht/humidity/max", (req, res) => getMaximum(req, res, "humidity"));
//* GET minimum humidity
router.get("/dht/humidity/min", (req, res) => getMinimum(req, res, "humidity"));

export default router;

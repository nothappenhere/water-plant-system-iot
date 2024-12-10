import express from "express";
import {
  getMaxHumid,
  getMaxTemp,
  getMinHumid,
  getMinTemp,
  getSevenLastHumidData,
  getSevenLastTempData,
} from "../controllers/dht11Controller.js";
const router = express();

//* GET maximum temperature
router.get("/dht/temp/max", getMaxTemp);

//* GET minimum temperature
router.get("/dht/temp/min", getMinTemp);

//* GET seven last data temperature
router.get("/dht/temp", getSevenLastTempData);

//* GET maximum humidity
router.get("/dht/humid/max", getMaxHumid);

//* GET minimum humidity
router.get("/dht/humid/min", getMinHumid);

//* GET seven last data humidity
router.get("/dht/humid", getSevenLastHumidData);


export default router;

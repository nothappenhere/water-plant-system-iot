import express from "express";
import cors from "cors";

import sensor from "./routes/sensor.js";
import dht11 from "./routes/dht11.js";
import soilMoisture from "./routes/soilMoisture.js";
import mqtt from "./routes/mqtt.js";
const app = express();

//* Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//* routes
app.use("/api", [sensor, dht11, soilMoisture, mqtt]);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

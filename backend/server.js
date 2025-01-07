import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";

import sensor from "./routes/sensor.js";
import dht11 from "./routes/dht11.js";
import soilMoisture from "./routes/soilMoisture.js";
import mqtt from "./routes/mqtt.js";

dotenv.config();
const app = express();

//* Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//* logger
app.use(logger);

//* routes
app.use("/api", [sensor, dht11, soilMoisture, mqtt]);

//* Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

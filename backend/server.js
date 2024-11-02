import express from "express";
import cors from "cors";
import sensors from "./routes/sensors.js";

const app = express();

//* Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//* routes
app.use("/api/sensors", sensors);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

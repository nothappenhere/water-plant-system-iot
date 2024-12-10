import db from "../connection.js";
import moment from "moment-timezone";

//* @desc   Get all sensors value
//* @route  GET /api/sensors
export const getSensors = (req, res) => {
  db.query("SELECT * FROM sensor_readings", (err, result) => {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
      return res.status(200).json(result.slice(0, limit));
    }

    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }
    res.status(200).json(result);
  });
};

export const postDB = (req, res) => {
  const {
    soil_moisture,
    water_level,
    temperature_C,
    temperature_F,
    humidity,
    pump_status,
    auto_pump_mode,
  } = req.body;

  const sql =
    "INSERT INTO sensor_readings (soil_moisture, water_level, temperature_C, temperature_F, humidity, pump_status, auto_pump_mode, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())";
  const values = [
    soil_moisture,
    water_level,
    temperature_C,
    temperature_F,
    humidity,
    pump_status,
    auto_pump_mode,
  ];

  db.query(sql, values, (error, results) => {
    if (error) {
      console.error("Gagal menyimpan data:", error);
      res.status(500).send("Gagal menyimpan data!");
    } else {
      res.status(200).send("Data berhasil disimpan!");
      res.status(200).json(results);
    }
  });
};

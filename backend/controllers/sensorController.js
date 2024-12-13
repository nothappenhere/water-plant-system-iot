import db from "../connection.js";
import moment from "moment-timezone";

//* @desc   Get all sensors value
//* @route  GET /api || /api?limit=<?>
export const getSensors = (req, res) => {
  const limit = parseInt(req.query.limit);
  const validLimit = !isNaN(limit) && limit > 0 ? limit : 10;

  db.query(
    "SELECT * from sensor_readings ORDER BY timestamp ASC LIMIT ?",
    [validLimit],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database query failed" });
      }

      res.status(200).json(result);
    }
  );
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
      return res.status(500).send("Gagal menyimpan data!");
    }
    res.status(200).json({ message: "Data berhasil disimpan!", results });
  });
};

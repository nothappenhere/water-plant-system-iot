import db from "../connection.js";
import moment from "moment-timezone";

//* @desc   Get all seven last data sensor value
//* @route  GET /api || /api?limit=<?>
export const getAllSensors = (req, res) => {
  const limit = parseInt(req.query.limit);
  const validLimit = !isNaN(limit) && limit > 0 ? limit : 7;

  db.query(
    "SELECT * from sensor_readings ORDER BY timestamp DESC LIMIT ?",
    [validLimit],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database query failed." });
      }

      // Loop untuk mengonversi setiap timestamp dalam hasil query
      const updatedResult = result.map((row) => {
        // Mengonversi timestamp UTC ke waktu lokal (Asia/Jakarta)
        const timestampLocal = moment
          .utc(row.timestamp) // mengonversi dari UTC
          .tz("Asia/Jakarta") // mengonversi ke zona waktu lokal
          .format("YYYY-MM-DD HH:mm:ss"); // format yang diinginkan

        // Menambahkan timestamp lokal ke dalam objek hasil
        return { ...row, timestamp: timestampLocal };
      });

      res
        .status(200)
        .json({ message: `Get Seven Last Data`, data: updatedResult });
    }
  );
};

//* @desc   POST data value to database
//* @route  POST /db/save
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

  // Validasi input
  if (
    soil_moisture == null ||
    water_level == null ||
    temperature_C == null ||
    temperature_F == null ||
    humidity == null ||
    (pump_status !== 0 && pump_status !== 1) || // Pastikan hanya menerima 0 atau 1
    (auto_pump_mode !== 0 && auto_pump_mode !== 1)
  ) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  db.query(
    "INSERT INTO sensor_readings (soil_moisture, water_level, temperature_C, temperature_F, humidity, pump_status, auto_pump_mode, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())",
    [
      soil_moisture,
      water_level,
      temperature_C,
      temperature_F,
      humidity,
      pump_status,
      auto_pump_mode,
    ],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database insert failed." });
      }

      res
        .status(200)
        .json({ message: "Database insert successfully", data: results });
    }
  );
};


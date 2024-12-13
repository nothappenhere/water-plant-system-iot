import db from "../connection.js";
import moment from "moment-timezone";

//* @desc   Get maximum || minimum soil moisture
//* @route  GET /api/soil/:type
export const getSoilMoisture = (req, res, type) => {
  // Validasi tipe
  const column = type === "maximum" ? "MAX" : type === "minimum" ? "MIN" : null;

  if (!column) {
    return res.status(400).json({ error: "Invalid type parameter" });
  }

  db.query(
    `SELECT * FROM sensor_readings
    WHERE soil_moisture = (SELECT ${column}(soil_moisture) FROM sensor_readings)
    ORDER BY timestamp DESC LIMIT 1`,
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database query failed" });
      }
      res.status(200).json(result);
    }
  );
};

//* @desc   Get seven last soil moisture data sensors
//* @route  GET /api/soil || /api/soil?limit=<?>
export const getSevenLastData = (req, res) => {
  const limit = parseInt(req.query.limit);
  const validLimit = !isNaN(limit) && limit > 0 ? limit : 7;

  db.query(
    "SELECT * from sensor_readings ORDER BY timestamp DESC LIMIT ?",
    [validLimit],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database query failed" });
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

      res.status(200).json(updatedResult);
    }
  );
};

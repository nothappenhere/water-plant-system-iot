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

//* @desc   Get maximum temperature
//* @route  GET /api/sensors/temp/max
export const getMaxTemp = (req, res) => {
  db.query(
    `SELECT *
     FROM sensor_readings
     WHERE temperature_C = (SELECT MAX(temperature_C) FROM sensor_readings) ORDER BY timestamp DESC`,
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database query failed" });
      }
      res.status(200).json(result);
    }
  );
};

//* @desc   Get minimum temperature
//* @route  GET /api/sensors/temp/min
export const getMinTemp = (req, res) => {
  db.query(
    `SELECT *
     FROM sensor_readings
     WHERE temperature_C = (SELECT MIN(temperature_C) FROM sensor_readings) ORDER BY timestamp DESC`,
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database query failed" });
      }
      res.status(200).json(result);
    }
  );
};

//* @desc   Get seven last data sensors
//* @route  GET /api/sensors/data or /api/sensors/data?limit=<?>
export const getSevenLastTempData = (req, res) => {
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
      const updatedResult = result.map(row => {
        // Mengonversi timestamp UTC ke waktu lokal (Asia/Jakarta)
        const timestampLocal = moment
          .utc(row.timestamp)  // mengonversi dari UTC
          .tz('Asia/Jakarta')  // mengonversi ke zona waktu lokal
          .format('YYYY-MM-DD HH:mm:ss');  // format yang diinginkan

        // Menambahkan timestamp lokal ke dalam objek hasil
        return { ...row, timestamp: timestampLocal };
      });

      res.status(200).json(updatedResult);
    }
  );
};

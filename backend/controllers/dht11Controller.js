import db from "../connection.js";
import moment from "moment-timezone";

//* @desc   Get maximum temperature
//* @route  GET /api/sensors/dht/temp/max
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
//* @route  GET /api/sensors/dht/temp/min
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

//* @desc   Get seven last temperature data sensors
//* @route  GET /api/sensors/dht/temp or /api/sensors/dht/temp?limit=<?>
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

//* @desc   Get maximum humidity
//* @route  GET /api/sensors/dht/humid/max
export const getMaxHumid = (req, res) => {
  db.query(
    `SELECT * FROM sensor_readings WHERE humidity = (SELECT MAX(humidity) FROM sensor_readings) ORDER BY timestamp DESC;`,
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database query failed" });
      }
      res.status(200).json(result);
    }
  );
};

//* @desc   Get minimum humidity
//* @route  GET /api/sensors/dht/humid/max
export const getMinHumid = (req, res) => {
  db.query(
    `SELECT * FROM sensor_readings WHERE humidity = (SELECT MIN(humidity) FROM sensor_readings) ORDER BY timestamp DESC;`,
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database query failed" });
      }
      res.status(200).json(result);
    }
  );
};


//* @desc   Get seven last humidity data sensors
//* @route  GET /api/sensors/dht/humid or /api/sensors/dht/humid?limit=<?>
export const getSevenLastHumidData = (req, res) => {
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

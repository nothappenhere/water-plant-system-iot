import db from "../connection.js";
import moment from "moment-timezone";

//* @desc   Get maximum temperature || humidity
//* @route  GET /api/dht/:type/max
export const getMaximum = (req, res, type) => {
  // Validasi tipe
  const column =
    type === "temperature"
      ? "temperature_C"
      : type === "humidity"
      ? "humidity"
      : null;

  if (!column) {
    return res.status(400).json({ error: "Invalid type parameter" });
  }

  db.query(
    `SELECT * FROM sensor_readings
    WHERE ${column} = (SELECT MAX(${column}) FROM sensor_readings)
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

//* @desc   Get minimum temperature || humidity
//* @route  GET /api/dht/:type/min
export const getMinimum = (req, res, type) => {
  // Validasi tipe
  const column =
    type === "temperature"
      ? "temperature_C"
      : type === "humidity"
      ? "humidity"
      : null;

  if (!column) {
    return res.status(400).json({ error: "Invalid type parameter" });
  }

  db.query(
    `SELECT * FROM sensor_readings
    WHERE ${column} = (SELECT MIN(${column}) FROM sensor_readings)
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

//* @desc   Get seven last temperature & humidity data sensors
//* @route  GET /api/dht || /api/dht?limit=<?>
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

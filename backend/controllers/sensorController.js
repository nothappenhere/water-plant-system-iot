import db from "../connection.js";

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
//* @route  GET /api/sensors/max/temp
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
//* @route  GET /api/sensors/min/temp
export const getMinTemp = (req, res) => {
  db.query(
    `SELECT *
     FROM sensor_readings
     WHERE temperature_C = (SELECT min(temperature_C) FROM sensor_readings) ORDER BY timestamp DESC`,
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database query failed" });
      }
      res.status(200).json(result);
    }
  );
};

// //* @desc   Get maximum temperature_F
// //* @route  GET /api/sensors/max/tempF
// export const getSevenLastData = (req, res) => {
//   db.query(
//     "SELECT * from sensor_readings ORDER BY timestamp DESC LIMIT 0,7",
//     (err, result) => {
//       const limit = parseInt(req.query.data);
//       if (!isNaN(limit) && limit > 0) {
//         return res.status(200).json(result.slice(0, limit));
//       }

//       if (err) {
//         return res.status(500).json({ error: "Database query failed" });
//       }
//       res.status(200).json(result);
//     }
//   );
// };

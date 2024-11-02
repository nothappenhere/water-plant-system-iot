import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_iot",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database");
});

export default connection;

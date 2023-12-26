import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const connectToDatabase = () => {
  const db = mysql.createConnection({
    host: "localhost",
    database: "stakemind_db",
    user: "root",
    password: "Nowgray@2023",
  });

  db.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err);
      return;
    }
    console.log("Database connected");
  });

  return db;
};

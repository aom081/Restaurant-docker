import dotenv from "dotenv";
dotenv.config();
const dbConfig = {
  HOST: process.env.HOST || "localhost",
  PORT: process.env.DBPORT || 5433,
  USER: process.env.USER || "postgres",
  PASSWORD: process.env.PASSWORD || "postgres",
  DB: process.env.DB || "app_db",
  dialect: process.env.DIALECT || "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export default dbConfig;

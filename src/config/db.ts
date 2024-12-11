// src/config/database.ts
import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import User from "../models/user.model";

dotenv.config();

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
  models: [User],
  logging: false,
});

export default sequelize;

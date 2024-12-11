import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db";
import userRoutes from "./routes/userRoutes";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 8000;

// Initialize database and start server
const init = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    // Sync models with database (use { force: true } only in development)
    await sequelize.sync();
    console.log("Models synchronized successfully.");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
  }
};

init();

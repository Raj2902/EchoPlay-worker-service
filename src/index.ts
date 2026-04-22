import express from "express";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import cors from "cors";
import { sql } from "./config/db.js";
import { initRabbitMQ } from "./config/rabbitMQ.js";
import { redisClient } from "./config/redis.js";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME as string,
  api_key: process.env.CLOUD_API_KEY as string,
  api_secret: process.env.CLOUD_API_SECRET as string,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

await redisClient.connect();

await initRabbitMQ();

async function initDB() {
  try {
    await sql`SELECT 1`;
    console.log("PostgresSQL database connected");
  } catch (err) {
    console.error("PostgresSQL database connection failed", err);
  }
}

const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT;

initDB().then(() => {
  app.listen(9000, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

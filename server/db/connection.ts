import { Client } from "pg";
import { config } from "dotenv";

config();

export const client = new Client({
  host: "localhost",
  port: 5432,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "naloga",
});

export const createClient = new Client({
  host: "localhost",
  port: 5432,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

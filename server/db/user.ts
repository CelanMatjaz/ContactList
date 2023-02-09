import { DbUser } from "../types/dbTypes";
import client from "./db";

export async function createUser(username: string, password: string) {
  return await client.query(
    "INSERT INTO users (username, password) VALUES ($1, $2)",
    [username, password]
  );
}

export async function getUserById(userId: number) {
  return await client.query("SELECT * FROM users WHERE id = $1", [userId]);
}

export async function getUserByUsername(username: string) {
  return await client.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
}

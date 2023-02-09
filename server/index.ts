import { config } from "dotenv";
config();

import cors from "cors";

import express from "express";

import indexRouter from "./api/indexRouter";

const app = express();

app.use(cors());

app.use("/api", indexRouter);

app.get("*", (req, res) => {
  res.sendStatus(404);
});

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => console.log("Server started on port", PORT));

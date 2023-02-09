import express from "express";

import authRouter from "./authRouter";
import contactsRouter from "./contactsRouter";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/contacts", contactsRouter);

export default router;

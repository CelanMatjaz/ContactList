import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;

import { createUser, getUserByUsername } from "../db/user";

const router = express.Router();

router.post<
    {},
    {},
    { username: string; password: string; passwordRepeat: string }
>("/register", express.json(), async (req, res) => {
    const { username, password, passwordRepeat } = req.body;

    if (!username || !password || !passwordRepeat) {
        return res.status(400).json({ errors: ["Invalid payload"] });
    }

    const errors = [];

    if (username.length < 8 || username.length > 20)
        errors.push("Username should be between 8 and 20 characters long");
    if (password.length < 8 || password.length > 32)
        errors.push("Password should be between 8 and 32 characters long");
    if (password != passwordRepeat) errors.push("Passwords do not match");

    if (errors.length > 0) return res.status(400).json({ errors });

    const usersRows = await getUserByUsername(username);

    if (usersRows.rowCount > 0) {
        return res.status(401).json({
            errors: ["User with provided username already exists"],
        });
    }

    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    try {
        await createUser(username, hashedPassword);
        return res.sendStatus(200);
    } catch (e) {
        return res.sendStatus(500);
    }
});

router.post<{}, {}, { username: string; password: string }>(
    "/login",
    express.json(),
    async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                errors: ["Invalid payload"],
            });
        }

        const usersRows = await getUserByUsername(username);

        if (usersRows.rowCount == 0) {
            return res.status(401).json({
                errors: ["User with provided username does not exist"],
            });
        }

        const user = usersRows.rows[0];

        if (bcrypt.compareSync(password, user.password)) {
            return res.json({
                token: jwt.sign({ id: user.id }, process.env.JWT_SECRET),
            });
        } else {
            return res.status(400).json({ errors: ["Incorrect password"] });
        }
    }
);

export default router;

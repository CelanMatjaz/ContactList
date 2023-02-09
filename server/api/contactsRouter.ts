import express from "express";
import {
    createContact,
    deleteContact,
    getAllContactsForUser,
    getContactForUser,
    updateContact,
} from "../db/contacts";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
    // @ts-ignore
    return res.json((await getAllContactsForUser(req.userId)).rows);
});

router.get("/:id", authMiddleware, async (req, res) => {
    // @ts-ignore
    const contact = await getContactForUser(req.userId, req.params.id);
    if (contact.rowCount > 0) return res.json(contact.rows[0]);
    else return res.sendStatus(404);
});

router.post<{}, {}, { firstName: string; lastName: string; number: string }>(
    "/",
    express.json(),
    authMiddleware,
    async (req, res) => {
        const { firstName, lastName, number } = req.body;
        if (!firstName || !lastName || !number) {
            return res.status(400).json({ errors: ["Invalid payload"] });
        }

        try {
            // @ts-ignore
            await createContact(req.userId, firstName, lastName, number);
            return res.sendStatus(200);
        } catch (e) {
            return res.sendStatus(500);
        }
    }
);

router.put<
    {},
    {},
    { firstName: string; lastName: string; number: string; id: number }
>("/:id", express.json(), authMiddleware, async (req, res) => {
    const { firstName, lastName, number, id } = req.body;

    if (!firstName || !lastName || !number || !id) {
        return res.status(400).json({ errors: ["Invalid payload"] });
    }

    try {
        await updateContact({
            first_name: firstName,
            last_name: lastName,
            number,
            id,
        });

        return res.sendStatus(200);
    } catch (e) {
        return res.sendStatus(500);
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        // @ts-ignore
        await deleteContact(req.params.id, req.userId);
        return res.sendStatus(200);
    } catch (e) {
        return res.sendStatus(500);
    }
});

export default router;

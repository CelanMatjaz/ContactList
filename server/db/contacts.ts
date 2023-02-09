import { DbContact } from "../types/dbTypes";
import client from "./db";

export async function getAllContactsForUser(userId: number) {
    return await client.query(
        'SELECT id, first_name as "firstName", last_name as "lastName", number, created_at as "createdAt", updated_at as "updatedAt" FROM contacts WHERE user_id = $1',
        [userId]
    );
}

export async function getContactForUser(userId: number, contactId: number) {
    return await client.query(
        'SELECT id, first_name as "firstName", last_name as "lastName", number, created_at as "createdAt", updated_at as "updatedAt" FROM contacts WHERE user_id = $1 AND id = $2',
        [userId, contactId]
    );
}

export async function createContact(
    userId: number,
    firstName: string,
    lastName: string,
    number: string
) {
    return await client.query(
        "INSERT INTO contacts (first_name, last_name, number, user_id) VALUES ($1, $2, $3, $4)",
        [firstName, lastName, number, userId]
    );
}

export async function updateContact({
    first_name,
    last_name,
    number,
    id,
}: Pick<DbContact, "first_name" | "last_name" | "number" | "id">) {
    return await client.query(
        `
        UPDATE contacts
        SET first_name = $1,
        last_name = $2,
        number = $3,
        updated_at = NOW()
        WHERE id = $4
    `,
        [first_name, last_name, number, id]
    );
}

export async function deleteContact(contactId: number, userId: number) {
    return await client.query(
        "DELETE FROM contacts WHERE id = $1 AND user_id = $2",
        [contactId, userId]
    );
}

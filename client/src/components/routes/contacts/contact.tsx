import React, { useState } from "react";
import { Contact as ContactType } from "../../../types";

interface Props {
    contact: ContactType;
    refetch: () => void;
}

export const Contact: React.FC<Props> = (props: Props) => {
    const { contact, refetch } = props;

    const [editing, setEditing] = useState(false);
    const [firstName, setFirstName] = useState(contact.firstName);
    const [lastName, setLastName] = useState(contact.lastName);
    const [number, setNumber] = useState(contact.number);

    async function deleteContact(id: string | number) {
        const res = await fetch("http://127.0.0.1:2000/api/contacts/" + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt_token"),
            },
            method: "DELETE",
        });

        if (res.status == 200) refetch();
    }

    async function updateContact(id: string | number) {
        if (
            firstName == contact.firstName &&
            lastName == contact.lastName &&
            number == contact.number
        ) {
            return;
        }

        const res = await fetch("http://127.0.0.1:2000/api/contacts/" + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt_token"),
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify({
                firstName,
                lastName,
                number,
                id,
            }),
        });

        if (res.status == 200) refetch();
    }

    return (
        <tr>
            {editing ? (
                <>
                    <th>
                        <input
                            type="text"
                            className="form-control"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </th>
                    <th>
                        <input
                            type="text"
                            className="form-control"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </th>
                    <th>
                        <input
                            type="text"
                            className="form-control"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </th>
                </>
            ) : (
                <>
                    <th>{contact.firstName}</th>
                    <th>{contact.lastName}</th>
                    <th>{contact.number}</th>
                </>
            )}

            <th>{new Date(contact.createdAt).toLocaleString()}</th>
            <th>{new Date(contact.updatedAt).toLocaleString()}</th>
            <th>
                {editing ? (
                    <button
                        type="button"
                        className="btn btn-primary mr-md-2"
                        onClick={async () => {
                            await updateContact(contact.id);
                            setEditing(false);
                        }}
                    >
                        Save
                    </button>
                ) : (
                    <button
                        type="button"
                        className="btn btn-primary mr-md-2"
                        onClick={() => {
                            setEditing(true);
                        }}
                    >
                        Edit
                    </button>
                )}
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={async () => {
                        deleteContact(contact.id);
                    }}
                >
                    Delete
                </button>
            </th>
        </tr>
    );
};

export default Contact;

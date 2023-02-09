import React, { useEffect, useState } from "react";
import { Contact as ContactType } from "../../../types";
import AddContact from "./addContact";
import Contact from "./contact";

interface Props {}

export const Contacts: React.FC<Props> = (props: Props) => {
    const [contacts, setContacts] = useState<ContactType[]>([]);
    const [showAddContactForm, setShowAddContactForm] = useState(false);

    async function fetchContacts() {
        const res = await fetch("http://127.0.0.1:2000/api/contacts", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt_token"),
            },
        });

        if (res.status == 200) {
            const data = await res.json();
            setContacts(data);
        }
    }

    useEffect(() => {
        fetchContacts();
    }, []);

    async function addContact(
        firstName: string,
        lastName: string,
        number: string
    ) {
        const res = await fetch("http://127.0.0.1:2000/api/contacts", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt_token"),
                "Content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ firstName, lastName, number }),
        });

        if (res.status == 200) fetchContacts();
    }

    return (
        <div>
            <h1>Contacts</h1>
            <button
                className="btn btn-primary mb-md-2"
                onClick={() => setShowAddContactForm(!showAddContactForm)}
            >
                {showAddContactForm ? "Close" : "Add contact"}
            </button>

            <div>
                {showAddContactForm && <AddContact addContact={addContact} />}
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">First name</th>
                        <th scope="col">Last name</th>
                        <th scope="col">Number</th>
                        <th scope="col">Created at</th>
                        <th scope="col">Updated at</th>
                        <th scope="col" style={{ width: "200px" }}></th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact, i) => (
                        <Contact
                            key={i}
                            contact={contact}
                            refetch={fetchContacts}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Contacts;

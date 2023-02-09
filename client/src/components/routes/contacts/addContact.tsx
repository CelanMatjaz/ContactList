import React, { useState } from "react";

interface Props {
    addContact: (firstName: string, lastName: string, number: string) => void;
}

export const AddContact: React.FC<Props> = (props: Props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [number, setNumber] = useState("");

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    props.addContact(firstName, lastName, number);
                }}
            >
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">First name</th>
                            <th scope="col">Last name</th>
                            <th scope="col">Number</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                            </th>
                            <th>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
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
                            <th>
                                <button className="btn btn-primary">Add</button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default AddContact;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [errors, setErrors] = useState<string[]>([]);

    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    return (
        <form
            style={{ width: "400px", margin: "0 auto" }}
            onSubmit={async (e) => {
                setErrors([]);
                e.preventDefault();
                const res = await fetch(
                    "http://127.0.0.1:2000/api/auth/register",
                    {
                        body: JSON.stringify({
                            username,
                            password,
                            passwordRepeat,
                        }),
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (res.status == 200) {
                    setSuccess(true);
                    setTimeout(() => {
                        navigate("/login");
                    }, 2000);
                } else {
                    const data = await res.json();
                    setErrors(data.errors || []);
                }
            }}
        >
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="password-repea">Repat password</label>
                <input
                    id="password-repeat"
                    type="password"
                    className="form-control"
                    value={passwordRepeat}
                    onChange={(e) => setPasswordRepeat(e.target.value)}
                />
            </div>

            {success && (
                <div className="p-2 mb-2 bg-success text-white rounded">
                    Registration successful, redirecting in 2 seconds
                </div>
            )}

            {errors.length > 0 &&
                errors.map((error, i) => {
                    return (
                        <div
                            className="p-2 mb-2 bg-danger text-white rounded"
                            key={i}
                        >
                            {error}
                        </div>
                    );
                })}

            <div className="mb-md-3">
                <Link to="/login">Or login</Link>
            </div>

            <button type="submit" className="btn btn-primary">
                Register
            </button>
        </form>
    );
};

export default Register;

import React, { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<string[]>([]);

    const navigate = useNavigate();

    return (
        <form
            style={{ width: "400px", margin: "0 auto" }}
            onSubmit={async (e) => {
                e.preventDefault();
                const res = await fetch(
                    "http://127.0.0.1:2000/api/auth/login",
                    {
                        body: JSON.stringify({ username, password }),
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const data = await res.json();

                if (res.status == 200) {
                    localStorage.setItem("jwt_token", data.token);
                    navigate("/contacts");
                } else {
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
                <Link to="/register">Or register</Link>
            </div>

            <button type="submit" className="btn btn-primary">
                Login
            </button>
        </form>
    );
};

export default Login;

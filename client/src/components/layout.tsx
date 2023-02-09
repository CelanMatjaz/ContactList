import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { authenticate, deleteToken } from "../authenticate";

export const Layout = () => {
    const navigate = useNavigate();

    return (
        <div className="layout container">
            {authenticate() && (
                <div>
                    <button
                        className="btn btn-secondary"
                        style={{ float: "right" }}
                        onClick={() => {
                            deleteToken();
                            navigate("/login");
                        }}
                    >
                        Logout
                    </button>
                </div>
            )}
            <div className="content-container container">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;

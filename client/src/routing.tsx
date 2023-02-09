import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./components/authRoute";
import Layout from "./components/layout";

import Contacts from "./components/routes/contacts/contacts";
import Login from "./components/routes/login";
import Register from "./components/routes/register";

export const Routing: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Login />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route
                    path="contacts"
                    element={
                        <AuthRoute>
                            <Contacts />
                        </AuthRoute>
                    }
                />
            </Route>
        </Routes>
    );
};

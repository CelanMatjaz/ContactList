import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { authenticate } from "../authenticate";

export const AuthRoute: React.FC<PropsWithChildren> = (props) => {
    const isAuthenticated = authenticate();

    if (!isAuthenticated) return <Navigate to="/login" />;

    return <>{props.children}</>;
};

export default AuthRoute;

import { Navigate } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";
import React from "react";

interface IProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
    const bAuthenticated = useAuthentication();
    return bAuthenticated ? <>{children}</> : <Navigate to="/user/login" />;
};

export default ProtectedRoute;

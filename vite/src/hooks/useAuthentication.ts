import { useNavigate } from "react-router-dom";
import { useStore } from "../helpers/use-store";
import { useEffect, useState } from "react";

export const useAuthentication = (): boolean => {
    const navigate = useNavigate();
    const { authenticationStore } = useStore();
    const { token } = authenticationStore;
    const [bAuthenticated, setAuthenticated] = useState<boolean>(
        !!token || !!window.localStorage.getItem("accessToken")
    );

    useEffect(() => {
        if (!!token || !!window.localStorage.getItem("accessToken")) return;
        setAuthenticated(false);
        navigate("/user/login");
    }, [token, navigate]);

    return bAuthenticated;
};

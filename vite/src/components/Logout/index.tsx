import * as React from "react";
import AuthenticationStore from "../../stores/authenticationStore";
import { observer } from "mobx-react";
import { useStore } from "../../helpers/use-store";
import { useNavigate } from "react-router-dom";

export interface ILogoutProps {
    authenticationStore?: AuthenticationStore;
}

const Logout = observer(() => {
    const { authenticationStore } = useStore();
    const navigate = useNavigate();
    React.useEffect(() => {
        navigate("/user/login");
        authenticationStore!.logout();
    }, [authenticationStore, navigate]);
    return <></>;
});

export default Logout;

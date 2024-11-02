import { Col } from "antd";
import { observer } from "mobx-react";
import DocumentTitle from "react-document-title";
import { Navigate, useLocation } from "react-router-dom";
import utils from "../../utils/utils";
import Footer from "../Footer";
import "./UserLayout.less";

interface IUserLayoutProps {
    children: React.ReactNode;
}

const UserLayout = observer(({ children }: IUserLayoutProps) => {
    const location = useLocation();
    return (
        <DocumentTitle title={utils.getPageTitle(location.pathname)}>
            <Col className="container">
                {location.pathname === "/user" && <Navigate to="/user/login" />}
                <>{children}</>
                <Footer />
            </Col>
        </DocumentTitle>
    );
});

export default UserLayout;

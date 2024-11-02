import { Layout } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import DocumentTitle from "react-document-title";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProtectedRoute from "../../components/Router/ProtectedRoute";
import SiderMenu from "../../components/SiderMenu";
import utils from "../../utils/utils";
import "./AppLayout.less";
const { Content } = Layout;

interface IAppLayoutProps {
    children: React.ReactNode;
}

const AppLayout = observer(({ children }: IAppLayoutProps) => {
    const [collapsed, setCollapsed] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    const onCollapse = (collapsed: any) => {
        setCollapsed(collapsed);
    };

    const layout = (
        <ProtectedRoute>
            <Layout style={{ minHeight: "100vh" }}>
                <SiderMenu path={location.pathname} onCollapse={onCollapse} navigate={navigate} collapsed={collapsed} />
                <Layout>
                    <Layout.Header style={{ background: "#fff", minHeight: 52, padding: 0 }}>
                        <Header collapsed={collapsed} toggle={toggle} />
                    </Layout.Header>
                    <Content style={{ margin: 16 }}>
                        {location.pathname === "/" && <Navigate to="/callhistories" />}
                        <>{children}</>
                    </Content>
                    <Layout.Footer style={{ textAlign: "center" }}>
                        <Footer />
                    </Layout.Footer>
                    {/* <CallQueue /> */}
                </Layout>
            </Layout>
        </ProtectedRoute>
    );
    return <DocumentTitle title={utils.getPageTitle(location.pathname)}>{layout}</DocumentTitle>;
});

export default AppLayout;

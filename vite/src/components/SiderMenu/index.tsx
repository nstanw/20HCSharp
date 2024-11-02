import "./index.less";
import { Avatar, Col, Layout, Menu } from "antd";
import { PieChartOutlined } from "@ant-design/icons";
import { appRouters } from "../../components/Router/router.config";
import AbpLogo from "../../images/logo.png";
import { useMemo } from "react";

const { Sider } = Layout;

export interface ISiderMenuProps {
    path: any;
    collapsed: boolean;
    onCollapse: any;
    navigate: any;
}

const SiderMenu = (props: ISiderMenuProps) => {
    const { collapsed, navigate, onCollapse } = props;

    // Create the menu items array
    const menuItems = useMemo(
        () =>
            appRouters
                .filter((item: any) => !item.isLayout && item.showInMenu)
                .map((route: any) => ({
                    key: route.path,
                    icon: <PieChartOutlined />,
                    label: route.title,
                    onClick: () => navigate(route.path),
                })),
        [navigate]
    );

    return (
        <Sider className={"sidebar"} width={256} collapsible collapsed={collapsed} onCollapse={onCollapse}>
            {collapsed ? (
                <Col style={{ textAlign: "center", marginTop: 15, marginBottom: 10 }}>
                    <Avatar shape="square" style={{ height: 45, width: 67 }} src={AbpLogo} />
                </Col>
            ) : (
                <Col style={{ textAlign: "center", marginTop: 15, marginBottom: 10 }}>
                    <Avatar shape="square" style={{ height: 88, width: 125 }} src={AbpLogo} />
                </Col>
            )}
            <Menu theme="dark" mode="inline" items={menuItems} />
        </Sider>
    );
};

export default SiderMenu;

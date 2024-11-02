import { PageHeader } from "@ant-design/pro-layout";
import { Button, Dropdown, Row } from "antd";
import { observer } from "mobx-react";
import { useStore } from "../../helpers/use-store";
import "./index.less";

export interface IHeaderProps {
    collapsed?: any;
    toggle?: any;
}

const Header = observer((_collapsed: any) => {
    const { sessionStore } = useStore();
    const { user } = sessionStore!.currentLogin;

    return (
        <Row className={"header-container"}>
            <PageHeader
                ghost={true}
                style={{ width: "100%" }}
                onBack={() => {
                    window.history.back();
                }}
                title={sessionStore.title}
                subTitle={sessionStore.subTitle}
                extra={[
                    <Dropdown
                        key="1"
                        menu={{ items: [{ key: "logout", label: <a href="/logout">Đăng xuất</a> }] }}
                        placement="bottomLeft"
                    >
                        <Button type="primary"> {user?.exten || user?.name || ""}</Button>
                    </Dropdown>,
                ]}
            ></PageHeader>
        </Row>
    );
});

export default Header;

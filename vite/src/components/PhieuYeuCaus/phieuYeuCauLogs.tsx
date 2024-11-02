import { Spin, Tooltip, List, Avatar, Card, Typography } from "antd";
import React from "react";
import { observer } from "mobx-react";
import moment from "moment";
import { useStore } from "../../helpers/use-store";
import PhieuYeuCauLogImage from "./phieuYeuCaulogImage";
const { Text } = Typography;

export interface IPaneTab {
    title: string;
    content: any;
    key: string;
}

const PhieuYeuCauLogs = observer(({ phieuYeuCauID }: { phieuYeuCauID: number }) => {
    const { phieuYeuCauLogStore } = useStore();

    const { phieuYeuCauLogs } = phieuYeuCauLogStore;
    const [isLoadding, setIsLoadding] = React.useState(false);

    React.useEffect(() => {
        (async function run() {
            if (phieuYeuCauID) {
                setIsLoadding(true);
                await phieuYeuCauLogStore.getAll(phieuYeuCauID);
                setIsLoadding(false);
            } else {
                phieuYeuCauLogs.result = { count: 0, items: [] };
            }
        })();
    }, [phieuYeuCauID]);

    const getNoiDung = (item: any) => {
        if (item.resourceID != "00000000-0000-0000-0000-000000000000") {
            return <PhieuYeuCauLogImage phieuYeuCauLog={item} />;
        } else {
            return <>{item?.noiDung}</>;
        }
    };

    return (
        <>
            <h4 style={{ marginTop: 10 }}>Thông tin cập nhật</h4>
            <Spin spinning={isLoadding}>
                <List
                    className="comment-list"
                    itemLayout="horizontal"
                    dataSource={phieuYeuCauLogs.result ? phieuYeuCauLogs.result!.items : undefined}
                    renderItem={(item) => (
                        <li>
                            <Card style={{ marginBottom: 16 }}>
                                <Card.Meta
                                    avatar={
                                        <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
                                            {item?.creatorBy?.substring(0, 1).toUpperCase()}
                                        </Avatar>
                                    }
                                    title={<a>{item?.creatorBy}</a>}
                                    description={
                                        <>
                                            <div style={{ whiteSpace: "pre-wrap" }}>
                                                {getNoiDung(item)} {/* Phần nội dung comment */}
                                            </div>
                                            <Tooltip
                                                title={moment(item?.creationTime)
                                                    .subtract(1, "days")
                                                    .format("DD-MM-YYYY HH:mm:ss")}
                                            >
                                                <Text type="secondary">
                                                    {moment(item?.creationTime).subtract(1, "days").fromNow()}
                                                </Text>
                                            </Tooltip>
                                        </>
                                    }
                                />
                            </Card>
                        </li>
                    )}
                />
            </Spin>
        </>
    );
});
export default PhieuYeuCauLogs;

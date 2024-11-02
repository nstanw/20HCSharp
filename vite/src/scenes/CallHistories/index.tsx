import * as React from "react";
import { Card, Col, Input, Row, Table } from "antd";
import { useStore } from "../../helpers/use-store";
import { observer } from "mobx-react";
import { ViewCELReport } from "../../services/asterisk/dto/viewCELReport";
import columns from "./calHistoriesColumns";
import { useNavigate } from "react-router-dom";

const Search = Input.Search;

const Call = observer(() => {
    const { asteriskStore } = useStore();
    const { callHistories } = asteriskStore;
    const { sessionStore } = useStore();

    const [pageSize, setPageSize] = React.useState(asteriskStore.callHistories?.sizePage || 20);
    const [skipCount, setSkipCount] = React.useState(0);
    const [filter, setFilter] = React.useState("");
    const navigate = useNavigate();
    const [isLoadding, setIsLoadding] = React.useState(false);

    React.useEffect(() => {
        sessionStore.title = "Lịch sử cuộc gọi";
        sessionStore.subTitle = "";
    }, []);

    React.useEffect(() => {
        (async function run() {
            setIsLoadding(true);
            asteriskStore.callHistories.sizePage = pageSize;
            asteriskStore.callHistories.skipCount = skipCount;
            asteriskStore.callHistories.q = filter;
            await asteriskStore.getAllCallHistory();
            setIsLoadding(false);
        })();
    }, [asteriskStore, skipCount, filter, pageSize]);

    const handleOnRow = (record: ViewCELReport) => {
        navigate("/calls/" + record.linkedid);
    };

    return (
        <Card>
            <Row>
                <Col
                    xs={{ span: 24, offset: 0 }}
                    sm={{ span: 24, offset: 0 }}
                    md={{ span: 24, offset: 0 }}
                    lg={{ span: 24, offset: 0 }}
                    xl={{ span: 24, offset: 0 }}
                    xxl={{ span: 12, offset: 0 }}
                >
                    <Search placeholder="Tìm kiếm" onSearch={(value) => setFilter(value)} />
                </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
                <Col
                    xs={{ span: 24, offset: 0 }}
                    sm={{ span: 24, offset: 0 }}
                    md={{ span: 24, offset: 0 }}
                    lg={{ span: 24, offset: 0 }}
                    xl={{ span: 24, offset: 0 }}
                    xxl={{ span: 24, offset: 0 }}
                >
                    <Table
                        rowKey={(record) => `lichSuCuocGoi${record.id}`}
                        bordered={true}
                        pagination={{
                            pageSize: pageSize,
                            total: callHistories.result === undefined ? 0 : callHistories.result.count,
                            defaultCurrent: 1,
                        }}
                        columns={columns}
                        loading={isLoadding}
                        dataSource={callHistories.result === undefined ? [] : callHistories.result.items}
                        onChange={(pagination: any) => {
                            setPageSize(pagination.pageSize);
                            setSkipCount((pagination.current - 1) * pageSize!);
                        }}
                        onRow={(record) => ({
                            onClick: () => {
                                handleOnRow(record);
                            },
                        })}
                    />
                </Col>
            </Row>
        </Card>
    );
});
export default Call;

import * as React from "react";
import { observer } from "mobx-react";
import { useStore } from "../../helpers/use-store";
import { Card, Row, Col, Table, Input, Button } from "antd";
import tiepNhanThongTinColumns from "./tiepNhanThongTinColumns";
import { ViewTiepNhanThongTin } from "../../services/tiepNhanThongTin/dto/viewTiepNhanThongTin";
import { useNavigate } from "react-router-dom";
const Search = Input.Search;

export interface ITiepNhanThongTinOfLinkedIDProps {
    linkedid: string;
}
const TiepNhanThongTins = observer(() => {
    const { tiepNhanThongTinStore, sessionStore } = useStore();
    const { tiepNhanThongTins } = tiepNhanThongTinStore;
    const [loaddingTable, setLoaddingTable] = React.useState(true);
    const navigate = useNavigate();
    const [filter, setFilter] = React.useState("");

    const [pageSize, setPageSize] = React.useState(tiepNhanThongTins?.sizePage || 20);
    const [skipCount, setSkipCount] = React.useState(0);

    const handleOnRow = (record: ViewTiepNhanThongTin) => {
        navigate("/tiepNhanThongTins/" + record.id);
    };

    React.useEffect(() => {
        (async function run() {
            setLoaddingTable(true);
            tiepNhanThongTins.sizePage = pageSize;
            tiepNhanThongTins.skipCount = skipCount;
            tiepNhanThongTins.q = filter;
            await tiepNhanThongTinStore.getAll();
            setLoaddingTable(false);
        })();
    }, [tiepNhanThongTinStore, skipCount, filter, pageSize]);

    React.useEffect(() => {
        sessionStore.title = "Yêu cầu đã gửi";
        sessionStore.subTitle = "";
        return function clearUp() {
            tiepNhanThongTins.sizePage = 20;
            tiepNhanThongTins.skipCount = 0;
            tiepNhanThongTins.q = "";
            tiepNhanThongTins.filter = "";
            tiepNhanThongTins.result = undefined;
        };
    }, []);

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
                    <Search placeholder="Tìm kiếm" onSearch={(value) => setFilter(value.trim())} />
                </Col>
                <Col
                    xs={{ span: 24, offset: 0 }}
                    sm={{ span: 24, offset: 0 }}
                    md={{ span: 24, offset: 0 }}
                    lg={{ span: 24, offset: 0 }}
                    xl={{ span: 24, offset: 0 }}
                    xxl={{ span: 12, offset: 0 }}
                >
                    <Button
                        onClick={() => {
                            navigate("/tiepNhanThongTinAddNew");
                        }}
                    >
                        Thêm mới yêu cầu
                    </Button>
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
                        rowKey={(record) => `yeuCauDaGui${record.id}`}
                        bordered={true}
                        pagination={{
                            pageSize: pageSize,
                            total: tiepNhanThongTins.result === undefined ? 0 : tiepNhanThongTins.result.count,
                            defaultCurrent: 1,
                        }}
                        columns={tiepNhanThongTinColumns}
                        loading={loaddingTable}
                        dataSource={tiepNhanThongTins.result === undefined ? [] : tiepNhanThongTins.result.items}
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
export default TiepNhanThongTins;

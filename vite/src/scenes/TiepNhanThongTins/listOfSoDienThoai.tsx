import * as React from "react";
import { observer } from "mobx-react";
import { useStore } from "../../helpers/use-store";
import { Card, Row, Col, Table } from "antd";
import tiepNhanThongTinColumns from "./tiepNhanThongTinColumns";
export interface ITiepNhanThongTinOfSoDienThoaiProps {
    soDienThoai: string;
}
const TiepNhanThongTinOfSoDienThoais = observer(({ soDienThoai }: { soDienThoai?: string }) => {
    const { tiepNhanThongTinStore } = useStore();
    const { tiepNhanThongTinsOfSoDienThoai } = tiepNhanThongTinStore;
    const [pageSize, setPageSize] = React.useState(tiepNhanThongTinsOfSoDienThoai?.sizePage || 20);
    const [skipCount, setSkipCount] = React.useState(0);
    const [filter] = React.useState("");

    React.useEffect(() => {
        (async function run() {
            tiepNhanThongTinsOfSoDienThoai.result = undefined;
            if (soDienThoai) {
                tiepNhanThongTinsOfSoDienThoai.sizePage = pageSize;
                tiepNhanThongTinsOfSoDienThoai.skipCount = skipCount;
                tiepNhanThongTinsOfSoDienThoai.filter = filter;
                await tiepNhanThongTinStore.getAllViewTiepNhanThongTinOfSoDienThoai(soDienThoai);
            }
        })();
    }, [tiepNhanThongTinStore, skipCount, filter, pageSize, soDienThoai]);

    return (
        <Card>
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
                        rowKey={(record) => `listSdtTiepNhanThongTin${record.id}`}
                        bordered={true}
                        pagination={{
                            pageSize: pageSize,
                            total:
                                tiepNhanThongTinsOfSoDienThoai.result === undefined
                                    ? 0
                                    : tiepNhanThongTinsOfSoDienThoai.result.count,
                            defaultCurrent: 1,
                        }}
                        columns={tiepNhanThongTinColumns}
                        loading={tiepNhanThongTinsOfSoDienThoai.result === undefined ? true : false}
                        dataSource={
                            tiepNhanThongTinsOfSoDienThoai.result === undefined
                                ? []
                                : tiepNhanThongTinsOfSoDienThoai.result.items
                        }
                        onChange={(pagination: any) => {
                            setPageSize(pagination.pageSize);
                            setSkipCount((pagination.current - 1) * pageSize!);
                        }}
                    />
                </Col>
            </Row>
        </Card>
    );
});
export default TiepNhanThongTinOfSoDienThoais;

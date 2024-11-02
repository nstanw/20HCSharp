import * as React from "react";
import { Card, Col, Row, Table } from "antd";
import { observer } from "mobx-react";
import { useStore } from "../../../../helpers/use-store";
import columns from "../../../CallHistories/calHistoriesColumns";

const CallHistoriesOfSoDienThoai = observer(({ soDienThoai }: { soDienThoai?: string }) => {
    const { asteriskStore } = useStore();
    const { callHistoriesOfSoDienThoai } = asteriskStore;
    const [pageSize, setPageSize] = React.useState(asteriskStore.callHistories?.sizePage || 10);
    const [skipCount, setSkipCount] = React.useState(0);

    React.useEffect(() => {
        (async function run() {
            callHistoriesOfSoDienThoai.result = undefined;
            if (soDienThoai) {
                callHistoriesOfSoDienThoai.sizePage = pageSize;
                callHistoriesOfSoDienThoai.skipCount = skipCount;
                await asteriskStore.getAllCallHistoryOfSoDienThoai(soDienThoai);
            }
        })();
    }, [asteriskStore, skipCount, pageSize]);

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
                        rowKey={(record) => `soDienThoaiLichSuCuocGoi${record.id}`}
                        bordered={true}
                        pagination={{
                            pageSize: pageSize,
                            total:
                                callHistoriesOfSoDienThoai.result === undefined
                                    ? 0
                                    : callHistoriesOfSoDienThoai.result.count,
                            defaultCurrent: 1,
                        }}
                        columns={columns}
                        loading={callHistoriesOfSoDienThoai.result === undefined ? true : false}
                        dataSource={
                            callHistoriesOfSoDienThoai.result === undefined
                                ? []
                                : callHistoriesOfSoDienThoai.result.items
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
export default CallHistoriesOfSoDienThoai;

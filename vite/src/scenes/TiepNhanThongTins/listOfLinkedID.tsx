import * as React from "react";
import { observer } from "mobx-react";
import { useStore } from "../../helpers/use-store";
import { Card, Row, Col, Table } from "antd";
import tiepNhanThongTinColumns from "./tiepNhanThongTinColumns";
export interface ITiepNhanThongTinOfLinkedIDProps {
    linkedid: string;
}
const TiepNhanThongTinOfLinkedIDs = observer(({ linkedid }: { linkedid: any }) => {
    const { tiepNhanThongTinStore } = useStore();
    const { tiepNhanThongTinsOfLinkedid } = tiepNhanThongTinStore;
    const [pageSize, setPageSize] = React.useState(tiepNhanThongTinsOfLinkedid?.sizePage || 20);
    const [skipCount, setSkipCount] = React.useState(0);
    const [filter] = React.useState("");

    React.useEffect(() => {
        (async function run() {
            tiepNhanThongTinsOfLinkedid.result = undefined;

            if (linkedid) {
                tiepNhanThongTinsOfLinkedid.sizePage = pageSize;
                tiepNhanThongTinsOfLinkedid.skipCount = skipCount;
                tiepNhanThongTinsOfLinkedid.filter = filter;
                await tiepNhanThongTinStore.getAllViewTiepNhanThongTinOfLinkedID(linkedid);
            }
        })();
    }, [tiepNhanThongTinStore, skipCount, filter, pageSize, linkedid]);

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
                        rowKey={(record) => `tiepNhanThongTinLinkedId${record.id}`}
                        bordered={true}
                        pagination={{
                            pageSize: pageSize,
                            total:
                                tiepNhanThongTinsOfLinkedid.result === undefined
                                    ? 0
                                    : tiepNhanThongTinsOfLinkedid.result.count,
                            defaultCurrent: 1,
                        }}
                        columns={tiepNhanThongTinColumns}
                        loading={tiepNhanThongTinsOfLinkedid.result === undefined ? true : false}
                        dataSource={
                            tiepNhanThongTinsOfLinkedid.result === undefined
                                ? []
                                : tiepNhanThongTinsOfLinkedid.result.items
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
export default TiepNhanThongTinOfLinkedIDs;

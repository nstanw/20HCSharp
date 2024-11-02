import * as React from "react";
import { Card, Col, Row, Table } from "antd";
import { observer } from "mobx-react";
import { useStore } from "../../../../helpers/use-store";
import khachHangColumns from "./khachHangColumns";

const KhachHangOfSoDienThoais = observer(({ soDienThoai }: { soDienThoai?: string }) => {
    const { khachHangStore } = useStore();
    const { khachHangOfSoDienThoais } = khachHangStore;
    const [pageSize, setPageSize] = React.useState(khachHangOfSoDienThoais?.sizePage || 10);
    const [skipCount, setSkipCount] = React.useState(0);

    React.useEffect(() => {
        (async function run() {
            khachHangOfSoDienThoais.result = undefined;
            if (soDienThoai) {
                khachHangOfSoDienThoais.sizePage = pageSize;
                khachHangOfSoDienThoais.skipCount = skipCount;
                await khachHangStore.getAllKhachHangOfSoDienThoai(soDienThoai);
            }
        })();
    }, [khachHangStore, skipCount, pageSize]);

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
                        rowKey={(record) => `khachHangOfSoDienThoai${record.id}`}
                        bordered={true}
                        pagination={{
                            pageSize: pageSize,
                            total:
                                khachHangOfSoDienThoais.result === undefined ? 0 : khachHangOfSoDienThoais.result.count,
                            defaultCurrent: 1,
                        }}
                        columns={khachHangColumns}
                        loading={khachHangOfSoDienThoais.result === undefined ? true : false}
                        dataSource={
                            khachHangOfSoDienThoais.result === undefined ? [] : khachHangOfSoDienThoais.result.items
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
export default KhachHangOfSoDienThoais;

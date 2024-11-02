import * as React from "react";
import { Card, Col, Row, Table } from "antd";
import { observer } from "mobx-react";
import { useStore } from "../../../../helpers/use-store";
import donDangKyColumns from "./donDangKyColumns";

const DonDangKyOfSoDienThoais = observer(({ soDienThoai }: { soDienThoai?: string }) => {
    const { donDangKyStore } = useStore();
    const { donDangKyOfSoDienThoais } = donDangKyStore;
    const [pageSize, setPageSize] = React.useState(donDangKyOfSoDienThoais?.sizePage || 10);
    const [skipCount, setSkipCount] = React.useState(0);

    React.useEffect(() => {
        (async function run() {
            donDangKyOfSoDienThoais.result = undefined;
            if (soDienThoai) {
                donDangKyOfSoDienThoais.sizePage = pageSize;
                donDangKyOfSoDienThoais.skipCount = skipCount;
                await donDangKyStore.getAllDonDangKyOfSoDienThoai(soDienThoai);
            }
        })();
    }, [donDangKyStore, skipCount, pageSize]);

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
                        rowKey={(record) => `donDangKyOfSoDienThoai${record.id}`}
                        bordered={true}
                        pagination={{
                            pageSize: pageSize,
                            total:
                                donDangKyOfSoDienThoais.result === undefined ? 0 : donDangKyOfSoDienThoais.result.count,
                            defaultCurrent: 1,
                        }}
                        columns={donDangKyColumns}
                        loading={donDangKyOfSoDienThoais.result === undefined ? true : false}
                        dataSource={
                            donDangKyOfSoDienThoais.result === undefined ? [] : donDangKyOfSoDienThoais.result.items
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
export default DonDangKyOfSoDienThoais;

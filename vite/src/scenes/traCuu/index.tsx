import * as React from "react";
import { Button, Card, Col, Form, Input, Row, Space, Table } from "antd";
import { useStore } from "../../helpers/use-store";
import { observer } from "mobx-react";
import columns from "./columns";
import khachHangService from "../../services/khachHang/khachHangService";
import { KhachHangDto } from "../../services/khachHang/dto/khachHangDto";
import { useNavigate } from "react-router-dom";

const TraCuu = observer(() => {
    const navigate = useNavigate();
    const { asteriskStore } = useStore();
    const { sessionStore } = useStore();
    const [pageSize, setPageSize] = React.useState(asteriskStore.callHistories?.sizePage || 20);
    const [skipCount, setSkipCount] = React.useState(0);
    const [isLoadding, setIsLoadding] = React.useState(false);
    const [form] = Form.useForm();
    //khach hang
    const [q, setQ] = React.useState("");
    const [khachHangs, setKhachHangs] = React.useState<KhachHangDto[]>([]);

    React.useEffect(() => {
        sessionStore.title = "Tra cứu thông tin khách hàng";
        sessionStore.subTitle = "";
    }, []);

    const getAllKhachHang = async () => {
        var items = await khachHangService.getAll({ q: q });
        setKhachHangs(items.items);
    };

    React.useEffect(() => {
        setIsLoadding(false);
        (async function run() {
            setIsLoadding(true);
            if (q !== "") {
                await getAllKhachHang();
            }
            setIsLoadding(false);
        })();
    }, [q, skipCount, pageSize]);

    const onFinish = async (values: any) => {
        setQ(values.filter);
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
                    <Form form={form} onFinish={onFinish}>
                        <Space>
                            <Form.Item
                                key={1}
                                label="Tra cứu thông tin"
                                name="filter"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập tìm kiếm",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập thông tin tra cứu" style={{ width: 500 }} />
                            </Form.Item>
                            <Form.Item key={2}>
                                <Button type="primary" htmlType="submit">
                                    Tra Cứu
                                </Button>
                            </Form.Item>
                        </Space>
                    </Form>
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
                    {q !== "" && (
                        <Table
                            rowKey={(record) => `traCuuScreen${record.id}`}
                            bordered={true}
                            pagination={{
                                pageSize: pageSize,
                                total: khachHangs === undefined ? 0 : khachHangs.length,
                                defaultCurrent: 1,
                            }}
                            columns={columns}
                            loading={isLoadding}
                            dataSource={khachHangs === undefined ? [] : khachHangs}
                            expandable={{
                                expandedRowRender: (record) => {
                                    return (
                                        <Col style={{ textAlign: "right" }}>
                                            <Space>
                                                <Button
                                                    type="primary"
                                                    onClick={() => {
                                                        navigate("/TraCuu/" + record.sdt);
                                                    }}
                                                >
                                                    Lịch sử cuộc gọi
                                                </Button>
                                                <Button
                                                    danger
                                                    onClick={() => {
                                                        navigate("/TraCuuKhachHang/" + record.idkh);
                                                    }}
                                                >
                                                    Lịch sử khách hàng
                                                </Button>
                                            </Space>
                                        </Col>
                                    );
                                },
                                expandRowByClick: true,
                            }}
                            onChange={(pagination: any) => {
                                setPageSize(pagination.pageSize);
                                setSkipCount((pagination.current - 1) * pageSize!);
                            }}
                        />
                    )}
                </Col>
            </Row>
        </Card>
    );
});
export default TraCuu;

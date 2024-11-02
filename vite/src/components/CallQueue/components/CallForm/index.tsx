import { DownOutlined } from "@ant-design/icons";
import { Button, Card, Dropdown, Form, Input } from "antd";
import { observer } from "mobx-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../../../../helpers/use-store";
import CallLogModel from "../../../../models/CallLogs/callLogModel";

const CallForm = observer((input: any) => {
    const [loading, setLoading] = useState(false);
    const { callStore } = useStore();
    const { linkDto } = input;
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const { asteriskStore } = useStore();

    const getTitle = () => {
        if (linkDto.loaiCuocGoi === "CuocGoiDi") return "Cuộc gọi đi: " + linkDto.soDienThoai;
        else return "Cuộc gọi đến: " + linkDto.soDienThoai;
    };
    const luuTaoYeuCau = () => {
        form.validateFields().then(async (values) => {
            setLoading(true);

            await asteriskStore!.createCallLog({
                ...new CallLogModel(),
                linkedid: linkDto.linkedid,
                hoTenKhachHang: values.hoTenKhachHang,
                noiDungYeuCau: values.noiDungYeuCau,
                trangThaiCuocGoi: "TiepNhan",
            });
            if (location.pathname === "/callhistories" && asteriskStore.callHistories.skipCount === 0) {
                await asteriskStore.getAllCallHistory();
            }
            callStore!.calls = callStore!.calls.filter((d) => d.linkedid !== linkDto.linkedid);
            setLoading(false);
        });
    };
    const huyYeuCau = () => {
        form.validateFields().then(async (values) => {
            setLoading(true);
            await asteriskStore!.createCallLog({
                ...new CallLogModel(),
                linkedid: linkDto.linkedid,
                hoTenKhachHang: values.hoTenKhachHang,
                noiDungYeuCau: values.noiDungYeuCau,
                trangThaiCuocGoi: "Huy",
            });
            callStore!.calls = callStore!.calls.filter((d) => d.linkedid !== linkDto.linkedid);
            setLoading(false);
        });
    };

    return (
        <div className="_5qib">
            <div className="item-chat item-call">
                <div className="colf-300">
                    <Card
                        title={getTitle()}
                        loading={loading}
                        extra={
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: "viewDetails",
                                            label: (
                                                <a onClick={() => navigate("/calls/" + linkDto.linkedid)}>
                                                    Xem chi tiết
                                                </a>
                                            ),
                                        },
                                        {
                                            key: "closeTemporarily",
                                            label: (
                                                <a
                                                    onClick={() =>
                                                        (callStore!.calls = callStore!.calls.filter(
                                                            (d) => d.linkedid !== linkDto.linkedid
                                                        ))
                                                    }
                                                >
                                                    Đóng tạm thời
                                                </a>
                                            ),
                                        },
                                    ],
                                }}
                                placement="bottomLeft"
                            >
                                <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                                    Chi tiết <DownOutlined />
                                </a>
                            </Dropdown>
                        }
                        style={{ width: 300 }}
                        actions={[
                            <Button onClick={() => luuTaoYeuCau()} type="primary" key="save">
                                Lưu tạo yêu cầu
                            </Button>,
                            <Button onClick={() => huyYeuCau()} type="dashed" key="delete">
                                Hủy thông tin
                            </Button>,
                        ]}
                    >
                        <Form form={form}>
                            <Form.Item
                                name="hoTenKhachHang"
                                rules={[{ required: true, message: "Vui lòng nhập họ tên khách hàng" }]}
                            >
                                <Input placeholder="Họ tên khách hàng" />
                            </Form.Item>
                            <Form.Item
                                name="noiDungYeuCau"
                                rules={[{ required: true, message: "Vui lòng nhập nội dung cuộc gọi" }]}
                            >
                                <Input.TextArea placeholder="Nội dung cuộc gọi" rows={5} />
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    );
});
export default CallForm;

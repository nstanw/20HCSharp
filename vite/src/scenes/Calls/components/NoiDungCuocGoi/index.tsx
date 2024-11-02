import { Button, Form, Input, Spin, message } from "antd";
import { observer } from "mobx-react";
import { useState } from "react";
import { useStore } from "../../../../helpers/use-store";
import CallLogModel from "../../../../models/CallLogs/callLogModel";
const NoiDungCuocGoi = observer(({ model }: { model: any }) => {
    const [form] = Form.useForm();
    const { asteriskStore } = useStore();
    const [spinning, setSpinning] = useState(false);

    const onFinish = async (values: any) => {
        saveData({ ...values, trangThaiCuocGoi: "TiepNhan" });
    };
    const onHuyThongTin = () => {
        form.validateFields().then(async (values) => {
            saveData({ ...values, trangThaiCuocGoi: "Huy" });
        });
    };
    const saveData = async (values: any) => {
        setSpinning(true);
        try {
            await asteriskStore!.updateCallLog({
                ...new CallLogModel(),
                linkedid: model.linkedid,
                hoTenKhachHang: values.hoTenKhachHang,
                noiDungYeuCau: values.noiDungYeuCau,
                trangThaiCuocGoi: values.trangThaiCuocGoi,
            });
            message.success("Cập nhật thông tin thành công!");
        } catch (error) {
            message.error("Đã có lỗi khi gửi dữ liệu!");
            setSpinning(false);
            return false;
        }
        setSpinning(false);
        return true;
    };
    return (
        <Spin spinning={spinning}>
            <Form form={form} initialValues={{ hoTenKhachHang: model.hoTenKhachHang, noiDungYeuCau: model.noiDungYeuCau }} onFinish={onFinish}>
                <Form.Item name="hoTenKhachHang" rules={[{ required: true, message: "Vui lòng nhập họ tên khách hàng" }]}>
                    <Input placeholder="Họ tên khách hàng" />
                </Form.Item>
                <Form.Item name="noiDungYeuCau" rules={[{ required: true, message: "Vui lòng nhập nội dung cuộc gọi" }]}>
                    <Input.TextArea placeholder="Nội dung cuộc gọi" rows={5} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Lưu thông tin
                    </Button>
                    <Button type="link" htmlType="button" onClick={() => onHuyThongTin()}>
                        Hủy thông tin gọi đến
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
});
export default NoiDungCuocGoi;

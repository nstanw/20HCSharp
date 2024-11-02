import { Button, Form, Input, message, Select, Spin } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { observer } from "mobx-react";
import { useState } from "react";
import { useStore } from "../../../../helpers/use-store";
import CreateTiepNhanThongTinInput from "../../../../models/TiepNhanThongTins/createTiepNhanThongTinInput";

const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

interface ISuaChuaThuTienProps {
    linkedID: string;
    tenKhachHang: string;
    soDienThoai: string;
    onSuccess: () => void;
}

const SuaChuaThuTien = observer(({ linkedID, onSuccess, tenKhachHang = "", soDienThoai = "" }: ISuaChuaThuTienProps) => {
    const [noiDungCongViecDaHoanThanhRequired, setNoiDungCongViecDaHoanThanhRequired] = useState(false);
    const [spinning, setSpinning] = useState(false);
    const { tiepNhanThongTinStore } = useStore();
    //const [form] = Form.useForm();

    const onMaPhongBanChange = (value: any) => {
        if (value == "KD-TNTT") {
            setNoiDungCongViecDaHoanThanhRequired(true);
        } else {
            setNoiDungCongViecDaHoanThanhRequired(false);
        }
    };
    const onFinish = async (values: any) => {
        setSpinning(true);
        try {
            await tiepNhanThongTinStore.create({
                ...new CreateTiepNhanThongTinInput(),
                LinkedID: linkedID,
                LoaiThongTin: "suaChuaThuTien",
                NoiDungYeuCau: values.noiDungYeuCau,
                MaPhongBan: values.MaPhongBan,
                NoiDungCongViecDaHoanThanh: noiDungCongViecDaHoanThanhRequired ? values.NoiDungCongViecDaHoanThanh : undefined,
                HoTenKhachHang: tenKhachHang,
                SoDienThoaiKhachHang: soDienThoai,
                GhiChu: "Địa chỉ sửa chữa: " + values.diaChi,
                DiaChiKhachHang: values.diaChi,
                DiaChiLamViec: values.diaChi,
            });
            setSpinning(false);
            message.success("Tạo yêu cầu thành công");
            onSuccess();
        } catch (error) {
            setSpinning(false);
        }
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo);
    };

    return (
        <Spin spinning={spinning}>
            <Form {...formItemLayout} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item label="Địa chỉ sửa chữa" name="diaChi" rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Nội dung yêu cầu" name="noiDungYeuCau" rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}>
                    <TextArea style={{ width: "100%" }} rows={4} />
                </Form.Item>
                <Form.Item
                    label="Đơn vị tiếp nhận xử lý"
                    name="MaPhongBan"
                    rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}
                >
                    <Select onChange={onMaPhongBanChange}>
                        <Option value="KD-TNTT">Tổ tiếp nhận thông tin</Option>
                        <Option value="YKKH">Tổ 2 - Giải quyết xử lý ý kiến khách hàng</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Kết quả xử lý công việc"
                    name="noiDungCongViecDaHoanThanh"
                    style={{ display: noiDungCongViecDaHoanThanhRequired ? "" : "none" }}
                    rules={[{ required: noiDungCongViecDaHoanThanhRequired, message: "Vui lòng nhập trường dữ liệu này!" }]}
                >
                    <TextArea style={{ width: "100%" }} rows={4} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Lưu
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
});

export default SuaChuaThuTien;

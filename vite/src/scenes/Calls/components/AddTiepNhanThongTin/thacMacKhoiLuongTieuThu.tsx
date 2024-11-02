import { Button, DatePicker, Form, message, Spin } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { observer } from "mobx-react";
import { useState } from "react";
import KhachHangSelect from "../../../../components/KhachHangs/khachHangSelect";
import { useStore } from "../../../../helpers/use-store";
import CreateTiepNhanThongTinInput from "../../../../models/TiepNhanThongTins/createTiepNhanThongTinInput";

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
const monthFormat = "MM/YYYY";

interface IThacMacKhoiLuongTieuThuProps {
    linkedID: string;
    tenKhachHang: string;
    soDienThoai: string;
    onSuccess: () => void;
}

const ThacMacKhoiLuongTieuThu = observer(({ linkedID, onSuccess, tenKhachHang = "", soDienThoai = "" }: IThacMacKhoiLuongTieuThuProps) => {
    const [noiDungCongViecDaHoanThanhRequired] = useState(false);
    const [spinning, setSpinning] = useState(false);
    const [form] = Form.useForm();
    const { tiepNhanThongTinStore } = useStore();

    // const onMaPhongBanChange = (value) => {
    //   if (value == 'KD-TNTT') {
    //     setNoiDungCongViecDaHoanThanhRequired(true);
    //   } else {
    //     setNoiDungCongViecDaHoanThanhRequired(false);
    //   }
    // };
    const onFinish = async (values: any) => {
        console.log("onFinish -> values", values);

        setSpinning(true);
        try {
            form.resetFields();
            onSuccess();
            await tiepNhanThongTinStore.create({
                ...new CreateTiepNhanThongTinInput(),
                IDKH: values.khachHang.value,
                LinkedID: linkedID,
                LoaiThongTin: "thacMacKhoiLuongTieuThu",
                NoiDungYeuCau: values.noiDungYeuCau,
                MaPhongBan: "YKKH",
                HoTenKhachHang: tenKhachHang,
                SoDienThoaiKhachHang: soDienThoai,
            });
            setSpinning(false);
            message.success("Tạo yêu cầu đơn lắp đặt mới thành công");
        } catch (error) {
            console.log(error);

            setSpinning(false);
        }
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo);
    };

    return (
        <Spin spinning={spinning}>
            <Form form={form} {...formItemLayout} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item label="Mã khách hàng" name="khachHang" rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}>
                    <KhachHangSelect></KhachHangSelect>
                </Form.Item>
                <Form.Item label="Kỳ hóa đơn" name="kyHoaDon" rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}>
                    <DatePicker format={monthFormat} picker="month" />
                </Form.Item>
                <Form.Item label="Nội dung yêu cầu" name="noiDungYeuCau" rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}>
                    <TextArea style={{ width: "100%" }} rows={4} />
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

export default ThacMacKhoiLuongTieuThu;

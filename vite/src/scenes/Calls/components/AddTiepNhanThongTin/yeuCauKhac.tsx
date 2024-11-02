import { Button, Form, Spin, message } from "antd";
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

interface IYeuCauKhacProps {
    linkedID: string;
    tenKhachHang: string;
    soDienThoai: string;
    onSuccess: () => void;
}

const YeuCauKhac = observer(({ linkedID, onSuccess, tenKhachHang = "", soDienThoai = "" }: IYeuCauKhacProps) => {
    const [spinning, setSpinning] = useState(false);
    const { tiepNhanThongTinStore } = useStore();
    //const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        setSpinning(true);
        try {
            await tiepNhanThongTinStore.createTiepNhanThongTin({
                ...new CreateTiepNhanThongTinInput(),
                LinkedID: linkedID,
                LoaiThongTin: "yeuCauKhac",
                IDKH: values.khachHang ? values.khachHang.value : null,
                NoiDungYeuCau: values.NoiDungYeuCau,
                MaPhongBan: "KD-TNTT",
                NoiDungCongViecDaHoanThanh: values.NoiDungCongViecDaHoanThanh,
                HoTenKhachHang: tenKhachHang,
                SoDienThoaiKhachHang: soDienThoai,
            });
            setSpinning(false);
            message.success("Tạo yêu cầu thành công");
            onSuccess();
        } catch (error) {
            setSpinning(false);
        }
    };

    const onFinishFailed = (_errorInfo: any) => {};

    return (
        <Spin spinning={spinning}>
            <Form {...formItemLayout} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item label="Chọn mã khách hàng" name="khachHang">
                    <KhachHangSelect></KhachHangSelect>
                </Form.Item>
                <Form.Item label="Nội dung yêu cầu" name="NoiDungYeuCau" rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}>
                    <TextArea style={{ width: "100%" }} rows={4} />
                </Form.Item>
                <Form.Item
                    label="Kết quả xử lý công việc"
                    name="NoiDungCongViecDaHoanThanh"
                    rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}
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
export default YeuCauKhac;

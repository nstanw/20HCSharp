import { Button, Form, message, Spin } from "antd";
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

interface INgungCapNuocProps {
    linkedID: string;
    tenKhachHang: string;
    soDienThoai: string;
    onSuccess: () => void;
}

const NgungCapNuoc = observer(({ linkedID, onSuccess, tenKhachHang = "", soDienThoai = "" }: INgungCapNuocProps) => {
    const [spinning, setSpinning] = useState(false);
    const { tiepNhanThongTinStore } = useStore();
    //const [form] = Form.useForm();
    const onFinish = async (values: any) => {
        setSpinning(true);
        try {
            await tiepNhanThongTinStore.createTiepNhanThongTin({
                ...new CreateTiepNhanThongTinInput(),
                IDKH: values.khachHang.value,
                LinkedID: linkedID,
                LoaiThongTin: "ngungCapNuoc",
                NoiDungYeuCau: values.noiDungYeuCau,
                MaPhongBan: "KD-TNTT",
                HoTenKhachHang: tenKhachHang,
                SoDienThoaiKhachHang: soDienThoai,
            });
            setSpinning(false);
            message.success("Lưu thành công");
            //form.resetFields();
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
                <Form.Item label="Mã khách hàng" name="khachHang" rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}>
                    <KhachHangSelect></KhachHangSelect>
                </Form.Item>
                <Form.Item label="Nội dung yêu cầu" name="noiDungYeuCau" rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}>
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

export default NgungCapNuoc;

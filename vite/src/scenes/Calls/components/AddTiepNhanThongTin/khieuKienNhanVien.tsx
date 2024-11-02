import { Button, Form, Spin, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { observer } from "mobx-react";
import { useState } from "react";
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

interface IKhieuKienNhanVienProps {
    linkedID: string;
    tenKhachHang: string;
    soDienThoai: string;
    onSuccess: () => void;
}

const KhieuKienNhanVien = observer(({ linkedID, onSuccess, tenKhachHang = "", soDienThoai = "" }: IKhieuKienNhanVienProps) => {
    const [spinning, setSpinning] = useState(false);
    const { tiepNhanThongTinStore } = useStore();
    //const [form] = Form.useForm();
    const onFinish = async (values: any) => {
        setSpinning(true);
        try {
            await tiepNhanThongTinStore.create({
                ...new CreateTiepNhanThongTinInput(),
                MADDK: values.MADDK.value,
                LinkedID: linkedID,
                LoaiThongTin: "khieuKienNhanVien",
                NoiDungYeuCau: values.NoiDungYeuCau,
                MaPhongBan: "YKKH",
                HoTenKhachHang: tenKhachHang,
                SoDienThoaiKhachHang: soDienThoai,
            });
            setSpinning(false);
            message.success("Tạo yêu cầu thành công");
            //form.resetFields();
            onSuccess();
        } catch (error) {
            setSpinning(false);
        }
    };

    return (
        <Spin spinning={spinning}>
            <Form {...formItemLayout} onFinish={onFinish}>
                <Form.Item label="Nội dung yêu cầu" name="NoiDungYeuCau" rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}>
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
export default KhieuKienNhanVien;

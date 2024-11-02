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

interface IThacMacCongNoProps {
    linkedID: string;
    tenKhachHang: string;
    soDienThoai: string;
    onSuccess: () => void;
}

const ThacMacCongNo = observer(({ linkedID, onSuccess, tenKhachHang = "", soDienThoai = "" }: IThacMacCongNoProps) => {
    const [noiDungCongViecDaHoanThanhRequired, _setNoiDungCongViecDaHoanThanhRequired] = useState(true);
    const [spinning, setSpinning] = useState(false);
    const { tiepNhanThongTinStore } = useStore();
    //const [form] = Form.useForm();

    // React.useEffect(() => {
    //     if (true) {
    //         setNoiDungCongViecDaHoanThanhRequired(true);
    //     } else {
    //         setNoiDungCongViecDaHoanThanhRequired(false);
    //     }
    // }, []);

    const onFinish = async (values: any) => {
        setSpinning(true);
        try {
            await tiepNhanThongTinStore.createTiepNhanThongTin({
                ...new CreateTiepNhanThongTinInput(),
                IDKH: values.khachHang.value,
                LinkedID: linkedID,
                LoaiThongTin: "thacMacCongNo",
                NoiDungYeuCau: values.noiDungYeuCau,
                MaPhongBan: "KD-TNTT",
                NoiDungCongViecDaHoanThanh: noiDungCongViecDaHoanThanhRequired ? values.NoiDungCongViecDaHoanThanh : undefined,
                HoTenKhachHang: tenKhachHang,
                SoDienThoaiKhachHang: soDienThoai,
            });
            setSpinning(false);
            message.success("Tạo yêu cầu thành công");
            // form.resetFields();
            onSuccess();
            //form.resetFields();
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

export default ThacMacCongNo;

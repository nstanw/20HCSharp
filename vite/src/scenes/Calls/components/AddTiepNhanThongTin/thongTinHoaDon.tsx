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

interface IThongTinHoaDonProps {
    linkedID: string;
    tenKhachHang: string;
    soDienThoai: string;
    onSuccess: () => void;
}

const ThongTinHoaDon = observer(({ linkedID, onSuccess, tenKhachHang = "", soDienThoai = "" }: IThongTinHoaDonProps) => {
    const [noiDungCongViecDaHoanThanhRequired] = useState(true);
    const [spinning, setSpinning] = useState(false);
    const { tiepNhanThongTinStore } = useStore();
    //const [form] = Form.useForm();

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
            await tiepNhanThongTinStore.createTiepNhanThongTin({
                ...new CreateTiepNhanThongTinInput(),
                IDKH: values.khachHang.value,
                LinkedID: linkedID,
                LoaiThongTin: "canLayHoaDon",
                NoiDungYeuCau: values.noiDungYeuCau,
                MaPhongBan: "KD-TNTT",
                NoiDungCongViecDaHoanThanh: noiDungCongViecDaHoanThanhRequired ? values.noiDungCongViecDaHoanThanh : undefined,
                GhiChu: "Khách hàng: " + values.khachHang.value + " Cần lấy hóa đơn của kỳ: " + values.kyHoaDon.format(monthFormat),
                HoTenKhachHang: tenKhachHang,
                SoDienThoaiKhachHang: soDienThoai,
            });
            setSpinning(false);
            message.success("Tạo yêu cầu đơn lắp đặt mới thành công");
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
                <Form.Item label="Kỳ hóa đơn" name="kyHoaDon" rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}>
                    <DatePicker format={monthFormat} picker="month" />
                </Form.Item>

                <Form.Item label="Nội dung yêu cầu" name="noiDungYeuCau" rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}>
                    <TextArea style={{ width: "100%" }} rows={4} />
                </Form.Item>
                {/* <Form.Item label="Đơn vị tiếp nhận xử lý" name="MaPhongBan" rules={[{ required: true, message: 'Vui lòng nhập trường dữ liệu này!' }]}>
          <Select onChange={onMaPhongBanChange}>
            <Option value="KD-TNTT">Tổ tiếp nhận thông tin</Option>
            <Option value="YKKH">Tổ 2 - Giải quyết xử lý ý kiến khách hàng</Option>
          </Select>
        </Form.Item> */}
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

export default ThongTinHoaDon;

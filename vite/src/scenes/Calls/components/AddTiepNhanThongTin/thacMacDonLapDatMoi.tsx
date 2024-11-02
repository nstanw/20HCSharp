import { Button, Form, Spin, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { observer } from "mobx-react";
import { useState } from "react";
import DonDangKySelect from "../../../../components/DonDangKys/donDangKySelect";
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

interface IThacMacDonLapDatMoiProps {
    linkedID: string;
    tenKhachHang: string;
    soDienThoai: string;
    onSuccess: () => void;
}

const ThacMacDonLapDatMoi = observer(({ linkedID, onSuccess, tenKhachHang = "", soDienThoai = "" }: IThacMacDonLapDatMoiProps) => {
    const [spinning, setSpinning] = useState(false);
    const { tiepNhanThongTinStore } = useStore();
    const [noiDungCongViecDaHoanThanhRequired] = useState(true);
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        setSpinning(true);
        try {
            await tiepNhanThongTinStore.createTiepNhanThongTin({
                ...new CreateTiepNhanThongTinInput(),
                MADDK: values.MADDK.value,
                LinkedID: linkedID,
                LoaiThongTin: "thacMacDonLapDatMoi",
                NoiDungYeuCau: values.NoiDungYeuCau,
                MaPhongBan: "KD-TNTT",
                NoiDungCongViecDaHoanThanh: noiDungCongViecDaHoanThanhRequired ? values.NoiDungCongViecDaHoanThanh : undefined,
                HoTenKhachHang: tenKhachHang,
                SoDienThoaiKhachHang: soDienThoai,
            });
            setSpinning(false);
            message.success("Tạo yêu cầu đơn lắp đặt mới thành công");
            form.resetFields();
            onSuccess();
        } catch (error) {
            setSpinning(false);
        }
    };
    // const onMaPhongBanChange = (value) => {
    //   if (value == 'KD-TNTT') {
    //     setNoiDungCongViecDaHoanThanhRequired(true);
    //   } else {
    //     setNoiDungCongViecDaHoanThanhRequired(false);
    //   }
    // };

    const onFinishFailed = (_errorInfo: any) => {};

    return (
        <Spin spinning={spinning}>
            <Form form={form} {...formItemLayout} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item label="Mã đơn đăng ký" name="MADDK" rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}>
                    <DonDangKySelect />
                </Form.Item>
                <Form.Item label="Nội dung yêu cầu" name="NoiDungYeuCau" rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}>
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
                    name="NoiDungCongViecDaHoanThanh"
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
export default ThacMacDonLapDatMoi;

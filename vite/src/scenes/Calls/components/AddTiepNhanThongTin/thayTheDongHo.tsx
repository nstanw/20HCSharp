import { Button, Form, message, Select, Spin } from "antd";
import { observer } from "mobx-react";
import { useState } from "react";
import DMAGiaoKhoanSelect from "../../../../components/DMAs/dmaGiaoKhoanSelect";
import KhachHangSelect from "../../../../components/KhachHangs/khachHangSelect";
import KhoiXomSelect from "../../../../components/KhoiXoms/khoiXomSelect";
import { useStore } from "../../../../helpers/use-store";
import CreateThayTheDongHoInput from "../../../../models/TiepNhanThongTins/createThayTheDongHoInput";

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

interface IThayTheDongHoProps {
    linkedID: string;
    tenKhachHang: string;
    soDienThoai: string;
    onSuccess: () => void;
}

const ThayTheDongHo = observer(({ linkedID, onSuccess, tenKhachHang = "", soDienThoai = "" }: IThayTheDongHoProps) => {
    const [spinning, setSpinning] = useState(false);
    const [DMAId, setDMAId] = useState<any>();
    const { tiepNhanThongTinStore } = useStore();
    //const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        setSpinning(true);
        try {
            const input = {
                ...new CreateThayTheDongHoInput(),
                IDKH: values.khachHang.value,
                LinkedID: linkedID,
                NoiDungYeuCau: values.NoiDungYeuCau,
                HoTenKhachHang: tenKhachHang,
                SoDienThoaiKhachHang: soDienThoai,
                maKhoiXom: values.MaKhoi?.key,
                BoPhanDeNghi: values.BoPhanDeNghi,
                DMAId: DMAId ? DMAId : null,
            };
            await tiepNhanThongTinStore.createDonDangKyThayTheDongHo(input);
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
                <Form.Item name="dmaid" label="Chọn DMA">
                    <DMAGiaoKhoanSelect onChange={(value) => setDMAId(value?.value)} />
                </Form.Item>
                <Form.Item label="Mã khách hàng" name="khachHang" rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}>
                    <KhachHangSelect></KhachHangSelect>
                </Form.Item>
                <Form.Item label="Khối xóm, phường" name="MaKhoi">
                    <KhoiXomSelect />
                </Form.Item>
                <Form.Item label="Bộ phận đề nghị" name="BoPhanDeNghi" rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}>
                    <Select>
                        <Option value="Khách hàng">Khách hàng</Option>
                        <Option value="Nhân viên ghi thu">Nhân viên ghi thu</Option>
                        <Option value="Nhân viên kỹ thuật">Nhân viên kỹ thuật</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Nội dung yêu cầu" name="NoiDungYeuCau" rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}>
                    <Select>
                        <Option value="Thay thế đồng hồ">Thay thế đồng hồ</Option>
                        <Option value="Di chuyển đồng hồ">Di chuyển đồng hồ</Option>
                        <Option value="Bổ sung hộp đồng hồ">Bổ sung hộp đồng hồ</Option>
                        <Option value="Sửa chữa sau đồng hồ">Sửa chữa sau đồng hồ</Option>
                        <Option value="Kẹp chì đồng hồ">Kẹp chì đồng hồ</Option>
                        <Option value="Đồng hồ chết">Đồng hồ chết</Option>
                    </Select>
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
export default ThayTheDongHo;

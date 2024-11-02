import { Button, Divider, Form, message, Select, Spin } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { observer } from "mobx-react";
import { useState } from "react";
import KhachHangSelect from "../../../../components/KhachHangs/khachHangSelect";
import { KhachHangDto } from "../../../../services/khachHang/dto/khachHangDto";
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

interface IGiaiQuyetYkienKhachHangProps {
    linkedID?: string;
    tenKhachHang: string;
    soDienThoai: string;
    onSuccess: () => void;
}

const GiaiQuyetYkienKhachHang = observer(({ onSuccess, tenKhachHang = "", soDienThoai = "" }: IGiaiQuyetYkienKhachHangProps) => {
    const [spinning, setSpinning] = useState(false);
    const [traCuuKhachHang, setTraCuuKhachHang] = useState<KhachHangDto>();
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        setSpinning(true);
        try {
            if (traCuuKhachHang) {
                console.log(values);
            }
            try {
                if (onSuccess) {
                    onSuccess();
                }
            } catch (error) {
                console.error("Failed: ", error);
            }
            setSpinning(false);
        } catch (error) {
            message.error("Đã có lỗi xảy ra! Vui lòng thử lại");
            setSpinning(false);
        }
    };

    return (
        <>
            <Spin spinning={spinning}>
                <Form
                    form={form}
                    {...formItemLayout}
                    onFinish={onFinish}
                    initialValues={{
                        NoiDungYeuCau: "Yêu cầu lắp đặt mới",
                        HoTenKhachHang: tenKhachHang,
                        DiDong: soDienThoai,
                    }}
                >
                    <Divider orientation="left">Thông tin khách hàng</Divider>
                    <Form.Item
                        label="Tra cứu mã khách hàng"
                        name="traCuuMaKhachHang"
                        rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}
                    >
                        <KhachHangSelect
                            onChange={(_value, ojb) => {
                                setTraCuuKhachHang(ojb);
                            }}
                        ></KhachHangSelect>
                    </Form.Item>
                    {traCuuKhachHang && (
                        <>
                            <Form.Item label="Mã khách hàng" rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}>
                                {traCuuKhachHang.sodb}
                            </Form.Item>
                            <Form.Item label="Họ tên khách hàng" rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}>
                                {traCuuKhachHang.tenkh}
                            </Form.Item>
                            <Form.Item label="Địa chỉ" rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}>
                                {traCuuKhachHang.diachi}
                            </Form.Item>
                            <Form.Item label="Số điện thoại" rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}>
                                {traCuuKhachHang.sdt}
                            </Form.Item>
                            <Form.Item
                                label="Nhóm ý kiến khách hàng"
                                name="nhomYKienKhachHang"
                                rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}
                            >
                                <Select>
                                    <Option value="PKT">Phòng kỹ thuật xử lý</Option>
                                    <Option value="To2">Tổ tiếp nhận ý kiến khách hàng xử lý</Option>
                                    <Option value="TNTT">Tổ tiếp nhận thông tin</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Nội dung khách hàng đề nghị"
                                name="noiDungKhachHangDeNghi"
                                rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}
                            >
                                <TextArea style={{ width: "100%" }} rows={2} />
                            </Form.Item>

                            <Form.Item
                                label="Kênh thông tin"
                                name="kenhThongTin"
                                rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}
                            >
                                <Select>
                                    <Option value="trucTiep">Trực tiếp</Option>
                                    <Option value="dienThoai">Điện thoại</Option>
                                    <Option value="zalo">Zalo</Option>
                                    <Option value="vanBan">Văn bản</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    Lưu
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form>
            </Spin>
        </>
    );
});
export default GiaiQuyetYkienKhachHang;

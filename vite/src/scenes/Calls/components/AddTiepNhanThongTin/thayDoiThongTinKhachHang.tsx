import React, { useState } from "react";
import { Form, message, Spin, Button } from "antd";
import { observer } from "mobx-react";
import TextArea from "antd/lib/input/TextArea";
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

interface IThayDoiThongTinKhachHangProps {
    linkedID: string;
    tenKhachHang: string;
    soDienThoai: string;
    maPhongBan: string;
    onSuccess: () => void;
}

const ThayDoiThongTinKhachHang = observer(
    ({ linkedID, onSuccess, tenKhachHang = "", soDienThoai = "", maPhongBan = "YKKH" }: IThayDoiThongTinKhachHangProps) => {
        const [noiDungCongViecDaHoanThanhRequired, setNoiDungCongViecDaHoanThanhRequired] = useState(false);
        const [spinning, setSpinning] = useState(false);
        const { tiepNhanThongTinStore } = useStore();
        //const [form] = Form.useForm();

        React.useEffect(() => {
            if (maPhongBan === "KD-TNTT") {
                setNoiDungCongViecDaHoanThanhRequired(true);
            } else if (maPhongBan === "YKKH") {
                setNoiDungCongViecDaHoanThanhRequired(false);
            }
        }, [maPhongBan]);

        const onFinish = async (values: any) => {
            setSpinning(true);
            try {
                if (maPhongBan === "KD-TNTT") {
                    await tiepNhanThongTinStore.createTiepNhanThongTin({
                        ...new CreateTiepNhanThongTinInput(),
                        IDKH: values.khachHang.value,
                        LinkedID: linkedID,
                        LoaiThongTin: "thayDoiThongTinKhachHang",
                        NoiDungYeuCau: values.noiDungYeuCau,
                        MaPhongBan: "'KD-TNTT'",
                        NoiDungCongViecDaHoanThanh: values.noiDungCongViecDaHoanThanh,
                        HoTenKhachHang: tenKhachHang,
                        SoDienThoaiKhachHang: soDienThoai,
                    });
                } else if (maPhongBan === "YKKH") {
                    await tiepNhanThongTinStore.create({
                        ...new CreateTiepNhanThongTinInput(),
                        IDKH: values.khachHang.value,
                        LinkedID: linkedID,
                        LoaiThongTin: "thayDoiThongTinKhachHang",
                        NoiDungYeuCau: values.noiDungYeuCau,
                        MaPhongBan: "YKKH",
                        HoTenKhachHang: tenKhachHang,
                        SoDienThoaiKhachHang: soDienThoai,
                    });
                }
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
                    <Form.Item
                        label="Nội dung yêu cầu"
                        name="noiDungYeuCau"
                        rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}
                    >
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
    }
);

export default ThayDoiThongTinKhachHang;

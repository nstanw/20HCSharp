import { Button, Checkbox, DatePicker, Divider, Form, Input, message, Select, Spin } from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import TextArea from "antd/lib/input/TextArea";
import { observer } from "mobx-react";
import { useState } from "react";
import GiaoKhoanSelect from "../../../../components/BanGiaoKhoans/giaoKhoanSelect";
import DuongPhoLapDatSelect from "../../../../components/DuongPhoLapDats/duongPhoLapDatSelect";
import KhachHangSelect from "../../../../components/KhachHangs/khachHangSelect";
import KhoiXomSelect from "../../../../components/KhoiXoms/khoiXomSelect";
import { useStore } from "../../../../helpers/use-store";
import CreateDonDangKyLapDatMoiInput from "../../../../models/TiepNhanThongTins/createDonDangKyInput";
import DialogDonLapDatMoiKiemTraTrung, { IParameterTinTrung } from "./donLapDatMoiKiemTraTrung";
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
const dateFormat = "DD/MM/YYYY";

interface IDonLapDatMoiProps {
    linkedID: string;
    tenKhachHang: string;
    soDienThoai: string;
    onSuccess: () => void;
}

const DonLapDatMoi = observer(({ linkedID, onSuccess, tenKhachHang = "", soDienThoai = "" }: IDonLapDatMoiProps) => {
    const [spinning, setSpinning] = useState(false);
    const [visibleGiayChungNhanQSDD, setVisibleGiayChungNhanQSDD] = useState(true);
    const [visibleLoaiGiayToKhac, setVisibleLoaiGiayToKhac] = useState(true);
    const [visibleDauNoiLai, setVisibleDauNoiLai] = useState(true);
    const [form] = Form.useForm();
    const { tiepNhanThongTinStore } = useStore();
    const [visibleDonTrungs, setVisibleDonTrungs] = useState(false);
    const [valueInputDonTrung, setValueInputDonTrung] = useState<IParameterTinTrung>({});
    const [kiemTraKhachHangTrung, setKiemTraKhachHangTrung] = useState(false);
    const [maDonKhaoSatTruoc, setMaDonKhaoSatTruoc] = useState<string>("");

    const onFinish = async (values: any) => {
        setSpinning(true);
        try {
            try {
                if (values.khachHangNopTienDauNoiLai != true && kiemTraKhachHangTrung != true) {
                    setValueInputDonTrung({
                        tenkh: values.HoTenKhachHang,
                        didong: values.DiDong,
                        maKhoiXom: values.DiaChiLapDatMoi_MaKhoi?.key,
                        tenKhoiXom: values.DiaChiLapDatMoi_MaKhoi?.label,
                        cmnd: values.SoCMND,
                        soNha: values.DiaChiLapDatMoi_SoNha,
                        maDuongPho: values.DiaChiLapDatMoi_MaDuong?.key,
                        tenDuongPho: values.DiaChiLapDatMoi_MaDuong?.label,
                        qsddaT_SoGiayChungNhan: values.QSDDAT_LoaiGiayChungNhan,
                        loaiKiemTra: "ViTriLapDat",
                    });
                    setVisibleDonTrungs(true);
                } else {
                    const input = {
                        ...new CreateDonDangKyLapDatMoiInput(),
                        LinkedID: linkedID,
                        MADB: values.MADB,
                        HoTenKhachHang: values.HoTenKhachHang,
                        DiaChiThuongTru: values.DiaChiThuongTru,
                        SoCMND: values.SoCMND,
                        DiDong: values.DiDong,
                        //Thông tin quyền sử dụng đất
                        QSDDAT_HoTen: values.QSDDAT_HoTen,
                        QSDDAT_DiaChiLoDat: values.QSDDAT_DiaChiLoDat,
                        QSDDAT_SoGiayChungNhan: values.QSDDAT_SoGiayChungNhan,
                        QSDDAT_NgayCap: values.QSDDAT_NgayCap.format("YYYY-MM-DD"),
                        QSDDAT_NoiDungKhac: values.QSDDAT_NoiDungKhac,
                        //Nhu cầu sử dụng nước
                        NhuCauSuDungNuoc: values.NhuCauSuDungNuoc,
                        // lịch sử dụng nước
                        HinhThucLapDat: values.HinhThucLapDat,
                        MaKhachHangDauNoiLai: values.MaKhachHangDauNoiLai?.value,
                        // Mục đích sử dụng nước
                        MucDichSuDungNuoc: values.MucDichSuDungNuoc,
                        // thời gian khách hàng cần lắp đặt
                        ThoiGianKhachHangCanLapMoi: values.ThoiGianKhachHangCanLapMoi.format("YYYY-MM-DD"),
                        QSDDAT_LoaiGiayChungNhan: values.LoaiGiayChungNhanQuyenSuDungDat === "CNQSD" ? "CNQSD" : values.QSDDAT_LoaiGiayChungNhan,
                        NoiCapCMND: values.NoiCapCMND,
                        NgayCapCMND: values.NgayCapCMND.format("YYYY-MM-DD"),
                        XacNhanKhachHangNopTienKhaoSatLai: values.khachHangNopTienDauNoiLai,
                        MaDonKhaoSatTruoc: maDonKhaoSatTruoc,
                        // địa chỉ lắp đặt
                        DiaChiLapDatMoi_MaKhoi: values.DiaChiLapDatMoi_MaKhoi.value,
                        DiaChiLapDatMoi_SoNha: values.DiaChiLapDatMoi_SoNha,
                        DiaChiLapDatMoi_MaDuong: values.DiaChiLapDatMoi_MaDuong?.value,

                        DiaChiLapDatMoi:
                            (values.DiaChiLapDatMoi_SoNha ? values.DiaChiLapDatMoi_SoNha + ", " : "") +
                            (values.DiaChiLapDatMoi_MaDuong ? values.DiaChiLapDatMoi_MaDuong.label + ", " : "") +
                            values.DiaChiLapDatMoi_MaKhoi.label,
                        GiaoKhoanId: values.giaoKhoan ? values.giaoKhoan.value : null,
                    };
                    await tiepNhanThongTinStore.createDonDangKyLapDatMoi(input);
                    message.success("Tạo yêu cầu đơn lắp đặt mới thành công");
                    form.resetFields();
                    onSuccess();
                }
            } catch (error) {
                message.error("Đã có lỗi xảy ra! Vui lòng thử lại: ");
                console.log(error);
            }
            setSpinning(false);
        } catch (error) {
            setSpinning(false);
        }
    };
    function handleChangeQuyenSDD(value: any) {
        setVisibleGiayChungNhanQSDD(value !== "CNQSD");
        setVisibleLoaiGiayToKhac(value !== "KHAC");
    }
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
                    <Form.Item label="Địa bàn" name="MADB" rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}>
                        <Select>
                            <Option value="VI">XN DVCN</Option>
                            <Option value="11">Trạm Anh Sơn</Option>
                            <Option value="12">Trạm Con Cuông</Option>
                            <Option value="13">Trạm Đô Lương</Option>
                            <Option value="14">Trạm Quỳ Châu</Option>
                            <Option value="15">Trạm Quỳ Hợp</Option>
                            <Option value="16">Trạm Tân Kỳ</Option>
                            <Option value="17">Trạm Thanh Chương</Option>
                            <Option value="18">Trạm Tương Dương</Option>
                            <Option value="19">Trạm Kỳ Sơn</Option>
                            <Option value="21">Trạm Nam đàn</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Chọn BGK" name="giaoKhoan">
                        <GiaoKhoanSelect defaultFilter={[{ operator: "eq", value: "LDM", property: "hangmucphieuvattu" }]} />
                    </Form.Item>
                    <Divider orientation="left">Thông tin người đại diện ký hợp đồng</Divider>
                    <Form.Item
                        label="Họ tên khách hàng"
                        name="HoTenKhachHang"
                        rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Số  CMND" name="SoCMND" rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Ngày cấp CMND" name="NgayCapCMND" rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}>
                        <DatePicker locale={locale} format={dateFormat} />
                    </Form.Item>
                    <Form.Item label="Nơi cấp CMND" name="NoiCapCMND" rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ thường trú"
                        name="DiaChiThuongTru"
                        rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}
                    >
                        <TextArea style={{ width: "100%" }} rows={2} />
                    </Form.Item>
                    <Form.Item label="Số điện thoại" name="DiDong" rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}>
                        <Input />
                    </Form.Item>
                    <Divider orientation="left">Vị trí lắp đặt</Divider>
                    <Form.Item label="Số nhà" name="DiaChiLapDatMoi_SoNha">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Tên đường" name="DiaChiLapDatMoi_MaDuong">
                        <DuongPhoLapDatSelect />
                    </Form.Item>
                    <Form.Item
                        label="Khối xóm, phường"
                        name="DiaChiLapDatMoi_MaKhoi"
                        rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}
                    >
                        <KhoiXomSelect />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button
                            type="link"
                            danger
                            onClick={() => {
                                var values = form.getFieldsValue();
                                setValueInputDonTrung({
                                    tenkh: values.HoTenKhachHang,
                                    didong: values.DiDong,
                                    maKhoiXom: values.DiaChiLapDatMoi_MaKhoi?.key,
                                    tenKhoiXom: values.DiaChiLapDatMoi_MaKhoi?.label,
                                    cmnd: values.SoCMND,
                                    soNha: values.DiaChiLapDatMoi_SoNha,
                                    maDuongPho: values.DiaChiLapDatMoi_MaDuong?.key,
                                    tenDuongPho: values.DiaChiLapDatMoi_MaDuong?.label,
                                    qsddaT_SoGiayChungNhan: values.QSDDAT_LoaiGiayChungNhan,
                                    loaiKiemTra: "ViTriLapDat",
                                });
                                setVisibleDonTrungs(true);
                            }}
                        >
                            Kiểm tra thông tin trùng vị trí lắp đặt
                        </Button>
                    </Form.Item>
                    <Divider orientation="left">Quyền sử dụng đất</Divider>
                    <Form.Item
                        label="Thông tin quyền sử dụng đất"
                        name="LoaiGiayChungNhanQuyenSuDungDat"
                        rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}
                    >
                        <Select onChange={handleChangeQuyenSDD}>
                            <Option value="CNQSD">Giấy chứng nhận QSD đất</Option>
                            <Option value="KHAC">Giấy tờ khác</Option>
                        </Select>
                    </Form.Item>
                    {/* Giấy chứng nhận QSD đất */}
                    <Form.Item
                        label="Họ tên người đứng tên trên giấy chứng nhận QSD đất"
                        name="QSDDAT_HoTen"
                        style={{ display: visibleGiayChungNhanQSDD ? "none" : "" }}
                        rules={[{ required: !visibleGiayChungNhanQSDD, message: "Vui lòng nhập trường dữ liệu này!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ lô đất"
                        name="QSDDAT_DiaChiLoDat"
                        style={{ display: visibleGiayChungNhanQSDD ? "none" : "" }}
                        rules={[{ required: !visibleGiayChungNhanQSDD, message: "Vui lòng nhập trường dữ liệu này!" }]}
                    >
                        <Input />
                    </Form.Item>
                    {/* Giấy tờ khác */}
                    <Form.Item
                        label="Loại văn bản"
                        style={{ display: visibleLoaiGiayToKhac ? "none" : "" }}
                        name="QSDDAT_LoaiGiayChungNhan"
                        rules={[{ required: !visibleLoaiGiayToKhac, message: "Vui lòng nhập trường dữ liệu này!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Số hiệu"
                        name="QSDDAT_SoGiayChungNhan"
                        style={{ display: visibleLoaiGiayToKhac && visibleGiayChungNhanQSDD ? "none" : "" }}
                        rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Ngày cấp"
                        name="QSDDAT_NgayCap"
                        style={{ display: visibleLoaiGiayToKhac && visibleGiayChungNhanQSDD ? "none" : "" }}
                        rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}
                    >
                        <DatePicker locale={locale} format={dateFormat} />
                    </Form.Item>
                    <Form.Item label="Nội dung khác" name="QSDDAT_NoiDungKhac" style={{ display: visibleLoaiGiayToKhac ? "none" : "" }}>
                        <Input />
                    </Form.Item>
                    <Divider orientation="left">Thông tin sử dụng nước</Divider>
                    <Form.Item
                        label="Hình thức lắp đặt"
                        name="HinhThucLapDat"
                        rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}
                    >
                        <Select
                            onChange={(value) => {
                                setVisibleDauNoiLai(value == "LapDatMoi");
                            }}
                        >
                            <Option value="LapDatMoi">Lắp đặt mới</Option>
                            <Option value="DauNoiLai">Đấu nối lại</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Mã khách hàng đấu nối lại" name="MaKhachHangDauNoiLai" style={{ display: visibleDauNoiLai ? "none" : "" }}>
                        <KhachHangSelect searchs={[{ property: "ttsd", operator: "eq", value: "CUP" }]} />
                    </Form.Item>
                    <Form.Item
                        label="Mục đích sử dụng nước"
                        name="MucDichSuDungNuoc"
                        rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}
                    >
                        <Select>
                            <Option value="SH">Sinh hoạt</Option>
                            <Option value="CQ">Cơ quan</Option>
                            <Option value="SX">Sản xuất vật chất</Option>
                            <Option value="KD">Kinh doanh</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Nhu cầu sử dụng nước"
                        name="NhuCauSuDungNuoc"
                        rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}
                    >
                        <Select>
                            <Option value="Nhà đang có người ở">Nhà đang có người ở</Option>
                            <Option value="Nhà sẽ có người ở">Nhà sẽ có người ở</Option>
                            <Option value="Có giấy phép kinh doanh">Có giấy phép kinh doanh</Option>
                            <Option value="Công trình đang xây dựng">Công trình đang xây dựng</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Thời gian khách hàng cần lắp mới"
                        name="ThoiGianKhachHangCanLapMoi"
                        rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}
                    >
                        <DatePicker locale={locale} format={dateFormat} />
                    </Form.Item>
                    <Form.Item name="khachHangNopTienDauNoiLai" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Khách hàng nộp tiền 500.000 tiền khảo sát lại</Checkbox>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Lưu
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
            <DialogDonLapDatMoiKiemTraTrung
                parameters={valueInputDonTrung}
                visible={visibleDonTrungs}
                onCancel={() => {
                    setVisibleDonTrungs(false);
                }}
                onDone={(khachHangNopTienDauNoiLai, maDonKhaoSatTruoc) => {
                    form.setFieldsValue({
                        khachHangNopTienDauNoiLai: khachHangNopTienDauNoiLai,
                    });
                    setMaDonKhaoSatTruoc(maDonKhaoSatTruoc);
                    setKiemTraKhachHangTrung(true);
                    setVisibleDonTrungs(false);
                }}
            />
        </>
    );
});
export default DonLapDatMoi;

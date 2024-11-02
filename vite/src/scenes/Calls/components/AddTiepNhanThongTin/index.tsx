import { Form, Select } from "antd";
import { observer } from "mobx-react";
import { useReducer } from "react";
import ChatLuongNuoc from "./chatLuongNuoc";
import ChuyenViTriDongHo from "./chuyenViTriDongHo";
import DiemChay from "./diemChay";
import DonLapDatMoi from "./donLapDatMoi";
import GiaiQuyetYkienKhachHang from "./giaiQuyetYkienKhachHang";
import HoanTraMatBang from "./hoanTraMatBang";
import HongVan from "./hongVan";
import KhieuKienNhanVien from "./khieuKienNhanVien";
import KiemTraDongHo from "./kiemTraDongHo";
import NgungCapNuoc from "./ngungCapNuoc";
import NuocYeu from "./nuocYeu";
import PhanAnhThaiDoNhanVien from "./phanAnhThaiDoNhanVien";
import PhanAnhViPhanSuDungNuoc from "./phanAnhViPhanSuDungNuoc";
import SuaChuaThuTien from "./suaChuaThuTien";
import ThacMacCongNo from "./thacMacCongNo";
import ThacMacDonLapDatMoi from "./thacMacDonLapDatMoi";
import ThacMacKhoiLuongTieuThu from "./thacMacKhoiLuongTieuThu";
import ThayDoiThongTinKhachHang from "./thayDoiThongTinKhachHang";
import ThayTheDongHo from "./thayTheDongHo";
import ThongTinHoaDon from "./thongTinHoaDon";
import YeuCauBoSungHopDongHo from "./yeuCauBoSungHopDongHo";
import YeuCauKepChiDongHo from "./yeuCauKepChiDongHo";
import YeuCauKhac from "./yeuCauKhac";
const { Option, OptGroup } = Select;

const initialState = {
    nhomThongTin: undefined,
    element: undefined,
};

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

interface IAddTiepNhanThongTinProps {
    linkedID: string;
    tenKhachHang: string;
    soDienThoai: string;
    onSuccess: () => void;
}

const AddTiepNhanThongTin = observer(({ linkedID, onSuccess, tenKhachHang = "", soDienThoai = "" }: IAddTiepNhanThongTinProps) => {
    const reducer = (state: any, action: any) => {
        switch (action.type) {
            case "thacMacLapDatMoi":
                return {
                    ...state,
                    nhomThongTin: action.type,
                    element: (
                        <ThacMacDonLapDatMoi
                            linkedID={linkedID}
                            tenKhachHang={tenKhachHang}
                            soDienThoai={soDienThoai}
                            onSuccess={onSuccess}
                        ></ThacMacDonLapDatMoi>
                    ),
                };
            case "lapDatMoi":
                return {
                    ...state,
                    nhomThongTin: action.type,
                    element: (
                        <DonLapDatMoi linkedID={linkedID} tenKhachHang={tenKhachHang} soDienThoai={soDienThoai} onSuccess={onSuccess}></DonLapDatMoi>
                    ),
                };
            case "canLayHoaDon":
                return {
                    ...state,
                    nhomThongTin: action.type,
                    element: (
                        <ThongTinHoaDon
                            linkedID={linkedID}
                            tenKhachHang={tenKhachHang}
                            soDienThoai={soDienThoai}
                            onSuccess={onSuccess}
                        ></ThongTinHoaDon>
                    ),
                };
            case "thayDoiThongTinKhachHang":
                return {
                    ...state,
                    nhomThongTin: action.type,
                    element: (
                        <ThayDoiThongTinKhachHang
                            maPhongBan="YKKH"
                            linkedID={linkedID}
                            tenKhachHang={tenKhachHang}
                            soDienThoai={soDienThoai}
                            onSuccess={onSuccess}
                        ></ThayDoiThongTinKhachHang>
                    ),
                };
            case "thayDoiThongTinKhachHangSDT":
                return {
                    ...state,
                    nhomThongTin: action.type,
                    element: (
                        <ThayDoiThongTinKhachHang
                            maPhongBan="KD-TNTT"
                            linkedID={linkedID}
                            tenKhachHang={tenKhachHang}
                            soDienThoai={soDienThoai}
                            onSuccess={onSuccess}
                        ></ThayDoiThongTinKhachHang>
                    ),
                };
            case "thacMacKhoiLuongTieuThu":
                return {
                    ...state,
                    nhomThongTin: action.type,
                    element: (
                        <ThacMacKhoiLuongTieuThu
                            linkedID={linkedID}
                            tenKhachHang={tenKhachHang}
                            soDienThoai={soDienThoai}
                            onSuccess={onSuccess}
                        ></ThacMacKhoiLuongTieuThu>
                    ),
                };
            case "thacMacCongNo":
                return {
                    ...state,
                    nhomThongTin: action.type,
                    element: (
                        <ThacMacCongNo
                            linkedID={linkedID}
                            tenKhachHang={tenKhachHang}
                            soDienThoai={soDienThoai}
                            onSuccess={onSuccess}
                        ></ThacMacCongNo>
                    ),
                };
            case "ngungCapNuoc":
                return {
                    ...state,
                    nhomThongTin: action.type,
                    element: (
                        <NgungCapNuoc linkedID={linkedID} onSuccess={onSuccess} tenKhachHang={tenKhachHang} soDienThoai={soDienThoai}></NgungCapNuoc>
                    ),
                };
            // case 'moLaiSuDungNuoc':
            //   return {
            //     ...state,
            //     nhomThongTin: action.type,
            //     element: (
            //       <MoLaiSuDungNuoc linkedID={linkedID} onSuccess={onSuccess} tenKhachHang={tenKhachHang} soDienThoai={soDienThoai}></MoLaiSuDungNuoc>
            //     ),
            //   };
            case "thayTheDongHo":
                return {
                    ...state,
                    nhomThongTin: action.type,
                    element: (
                        <ThayTheDongHo
                            linkedID={linkedID}
                            onSuccess={onSuccess}
                            tenKhachHang={tenKhachHang}
                            soDienThoai={soDienThoai}
                        ></ThayTheDongHo>
                    ),
                };
            case "chuyenViTriDongHo":
                return {
                    ...state,
                    nhomThongTin: action.type,
                    element: (
                        <ChuyenViTriDongHo
                            linkedID={linkedID}
                            onSuccess={onSuccess}
                            tenKhachHang={tenKhachHang}
                            soDienThoai={soDienThoai}
                        ></ChuyenViTriDongHo>
                    ),
                };
            case "kiemTraDongHo":
                return {
                    ...state,
                    nhomThongTin: action.type,
                    element: (
                        <KiemTraDongHo
                            linkedID={linkedID}
                            onSuccess={onSuccess}
                            tenKhachHang={tenKhachHang}
                            soDienThoai={soDienThoai}
                        ></KiemTraDongHo>
                    ),
                };
            case "kiemTraDongHoKT":
                return {
                    ...state,
                    nhomThongTin: action.type,
                    element: (
                        <KiemTraDongHo
                            linkedID={linkedID}
                            onSuccess={onSuccess}
                            tenKhachHang={tenKhachHang}
                            soDienThoai={soDienThoai}
                            maPhongBan="PKT"
                        ></KiemTraDongHo>
                    ),
                };
            case "yeuCauBoSungHopDongHo":
                return {
                    ...state,
                    nhomThongTin: action.type,
                    element: (
                        <YeuCauBoSungHopDongHo
                            linkedID={linkedID}
                            onSuccess={onSuccess}
                            tenKhachHang={tenKhachHang}
                            soDienThoai={soDienThoai}
                        ></YeuCauBoSungHopDongHo>
                    ),
                };
            case "yeuCauKepChiDongHo":
                return {
                    ...state,
                    nhomThongTin: action.type,
                    element: (
                        <YeuCauKepChiDongHo
                            linkedID={linkedID}
                            onSuccess={onSuccess}
                            tenKhachHang={tenKhachHang}
                            soDienThoai={soDienThoai}
                        ></YeuCauKepChiDongHo>
                    ),
                };
            case "hongVan":
                return {
                    ...state,
                    nhomThongTin: action.type,
                    element: <HongVan linkedID={linkedID} onSuccess={onSuccess} tenKhachHang={tenKhachHang} soDienThoai={soDienThoai}></HongVan>,
                };
            case "suaChuaThuTien":
                return {
                    ...state,
                    nhomThongTin: action.type,
                    element: (
                        <SuaChuaThuTien
                            linkedID={linkedID}
                            onSuccess={onSuccess}
                            tenKhachHang={tenKhachHang}
                            soDienThoai={soDienThoai}
                        ></SuaChuaThuTien>
                    ),
                };
            case "hoanTraMatBang":
                return {
                    ...state,
                    nhomThongTin: action.type,
                    element: (
                        <HoanTraMatBang
                            linkedID={linkedID}
                            onSuccess={onSuccess}
                            tenKhachHang={tenKhachHang}
                            soDienThoai={soDienThoai}
                        ></HoanTraMatBang>
                    ),
                };
            // case 'matNuoc':
            //   return {
            //     ...state,
            //     nhomThongTin: action.type,
            //     element: <MatNuoc linkedID={linkedID} onSuccess={onSuccess} tenKhachHang={tenKhachHang} soDienThoai={soDienThoai}></MatNuoc>,
            //   };
            case "nuocYeu":
                return {
                    ...state,
                    nhomThongTin: action.type,
                    element: <NuocYeu linkedID={linkedID} onSuccess={onSuccess} tenKhachHang={tenKhachHang} soDienThoai={soDienThoai}></NuocYeu>,
                };
            case "chatLuongNuoc":
                return {
                    ...state,
                    nhomThongTin: action.type,
                    element: (
                        <ChatLuongNuoc
                            linkedID={linkedID}
                            onSuccess={onSuccess}
                            tenKhachHang={tenKhachHang}
                            soDienThoai={soDienThoai}
                        ></ChatLuongNuoc>
                    ),
                };
            case "phanAnhThaiDoNhanVien":
                return {
                    ...state,
                    nhomThongTin: action.type,
                    element: (
                        <PhanAnhThaiDoNhanVien
                            linkedID={linkedID}
                            onSuccess={onSuccess}
                            tenKhachHang={tenKhachHang}
                            soDienThoai={soDienThoai}
                        ></PhanAnhThaiDoNhanVien>
                    ),
                };
            case "khieuKienNhanVien":
                return {
                    ...state,
                    nhomThongTin: action.type,
                    element: (
                        <KhieuKienNhanVien
                            linkedID={linkedID}
                            onSuccess={onSuccess}
                            tenKhachHang={tenKhachHang}
                            soDienThoai={soDienThoai}
                        ></KhieuKienNhanVien>
                    ),
                };
            case "phanAnhViPhanSuDungNuoc":
                return {
                    ...state,
                    nhomThongTin: action.type,
                    element: (
                        <PhanAnhViPhanSuDungNuoc
                            linkedID={linkedID}
                            onSuccess={onSuccess}
                            tenKhachHang={tenKhachHang}
                            soDienThoai={soDienThoai}
                        ></PhanAnhViPhanSuDungNuoc>
                    ),
                };
            case "diemChay":
                return {
                    ...state,
                    nhomThongTin: action.type,
                    element: <DiemChay linkedID={linkedID} onSuccess={onSuccess} tenKhachHang={tenKhachHang} soDienThoai={soDienThoai}></DiemChay>,
                };
            case "yeuCauKhac":
                return {
                    ...state,
                    nhomThongTin: action.type,
                    element: (
                        <YeuCauKhac linkedID={linkedID} onSuccess={onSuccess} tenKhachHang={tenKhachHang} soDienThoai={soDienThoai}></YeuCauKhac>
                    ),
                };
            case "giaiQuyetYkienKhachHang":
                return {
                    ...state,
                    nhomThongTin: action.type,
                    element: (
                        <GiaiQuyetYkienKhachHang
                            linkedID={linkedID}
                            onSuccess={onSuccess}
                            tenKhachHang={tenKhachHang}
                            soDienThoai={soDienThoai}
                        ></GiaiQuyetYkienKhachHang>
                    ),
                };

            default:
                return <></>;
        }
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <>
            <Form {...formItemLayout}>
                <Form.Item label="Nhóm thông tin">
                    <Select onChange={(e) => dispatch({ type: e })}>
                        <OptGroup label="Chuyển phòng kỹ thuật xử lý">
                            <Option value="diemChay">Báo điểm chảy</Option>
                            <Option value="lapDatMoi">Yêu cầu lắp đặt mới</Option>
                            <Option value="thayTheDongHo">Cải tạo cụm đồng hồ</Option>
                            {/* chờ ruột KT */}
                            <Option value="kiemTraDongHoKT">Kiểm tra/kiểm định đồng hồ</Option>
                            <Option value="hoanTraMatBang">Hoàn trả mặt bằng</Option>
                        </OptGroup>
                        <OptGroup label="Tổ tiếp nhận thông tin khách hàng">
                            <Option value="thayDoiThongTinKhachHangSDT">Thay đổi thông tin khách hàng (SĐT)</Option>
                            <Option value="thacMacLapDatMoi">Thông tin về tiến độ thi công</Option>
                            <Option value="yeuCauKhac">Giải đáp yêu cầu khác của khách hàng</Option>
                            <Option value="canLayHoaDon">Cần lấy hóa đơn</Option>
                            <Option value="thacMacCongNo">Thắc mắc công nợ</Option>
                            <Option value="ngungCapNuoc">Ngừng cấp nước</Option>
                            {/* <Option value="moLaiSuDungNuoc">Mở nước</Option> */}
                        </OptGroup>
                        <OptGroup label="Tổ giải quyết ý kiến khách hàng">
                            <Option value="thayDoiThongTinKhachHang">Thay đổi thông tin khách hàng (Hợp đồng - MĐSD)</Option>
                            <Option value="thacMacKhoiLuongTieuThu">Thắc mắc khối lượng tiêu thụ</Option>
                            <Option value="chatLuongNuoc">Chất lượng nước</Option>
                            <Option value="nuocYeu">Nước yếu, mất nước</Option>
                            <Option value="phanAnhViPhanSuDungNuoc">Phản ánh vi phạm sử dụng nước</Option>
                            <Option value="kiemTraDongHo">Kiểm tra đồng hồ (Khách hàng phản ánh)</Option>
                            {/* <Option value="giaiQuyetYkienKhachHang">Giải quyết ý kiến khách hàng</Option> */}
                            {/* <Option value="khieuKienNhanVien">Khiếu kiện nhân viên</Option> */}
                            {/* <Option value="phanAnhThaiDoNhanVien">Phản ánh thái độ nhân viên</Option> */}
                        </OptGroup>
                    </Select>
                </Form.Item>
            </Form>
            {state.element}
        </>
    );
});
export default AddTiepNhanThongTin;

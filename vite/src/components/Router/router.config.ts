// import CaiTaoDongHoDetail from "../../scenes/CaiTaoDongHos/Details";
// import TongHopCaiTaoDongHo from "../../scenes/CaiTaoDongHos/TraCuuHoSos";
// import Call from "../../scenes/CallHistories";
// import CallDetail from "../../scenes/Calls/components/CallDetail";
// import CongNoDanhSachKyHoaDonConNos from "../../scenes/CongNos/ThuTaiQuays";
// import Exception from "../../scenes/Exception";
// import ScanHopDongKhachHang from "../../scenes/Khachhangs";
// import LapDatMoiDetail from "../../scenes/LapDatMois/LapDatMoiDetails";
// import LapDatMoiTraCuuDons from "../../scenes/LapDatMois/TraCuuDons";
// import ThayTheDongHoDetail from "../../scenes/ThayTheDongHos/Details";
// import TongHopThayTheDongHo from "../../scenes/ThayTheDongHos/TraCuuHoSos";
// import TiepNhanThongTins from "../../scenes/TiepNhanThongTins";
// import AddYeuCau from "../../scenes/TiepNhanThongTins/components/addYeuCau";
// import TiepNhanThongTinDetail from "../../scenes/TiepNhanThongTins/components/tiepNhanThongTinDetail";
// import TraCuu from "../../scenes/traCuu";
// import DetailKhachHang from "../../scenes/traCuu/components/DetailLichSuCuocGoi";
// import ScanHopDongTraCuu from "../../scenes/traCuu/components/DetailLichSuKhachHang";
// import Logout from "../Logout";
import GoiDienKhachHang from "../../scenes/GoiDienKhachHang";
import HocKyNang from "../../scenes/HocKyNang";
import Login from "../../scenes/Login";
import UserLayout from "../Layout/UserLayout";

export const userRouter: any = [
    {
        path: "/user",
        name: "user",
        title: "User",
        component: UserLayout,
        isLayout: true,
        showInMenu: false,
    },
    {
        path: "/user/login",
        name: "login",
        title: "LogIn",
        component: Login,
        showInMenu: false,
    },
];

export const appRouters: any = [
    // {
    //     path: "/",
    //     exact: true,
    //     name: "home",
    //     permission: "",
    //     title: "Home",
    //     icon: "home",
    //     component: Call,
    //     isLayout: true,
    //     showInMenu: false,
    // },
    // {
    //     path: "/logout",
    //     permission: "",
    //     title: "Logout",
    //     name: "logout",
    //     icon: "info-circle",
    //     showInMenu: false,
    //     component: Logout,
    // },
    // {
    //     path: "/exception?:type",
    //     permission: "",
    //     title: "exception",
    //     name: "exception",
    //     icon: "info-circle",
    //     showInMenu: false,
    //     component: Exception,
    // },
    // {
    //     path: "/TraCuu",
    //     permission: "",
    //     title: "Tra cứu",
    //     name: "calldetails",
    //     icon: "tags",
    //     showInMenu: true,
    //     component: TraCuu,
    // },
    // {
    //     path: "/TraCuu/:sdt",
    //     permission: "",
    //     title: "Chi tiết lịch sử cuộc gọi",
    //     name: "calldetails",
    //     icon: "tags",
    //     showInMenu: false,
    //     component: DetailKhachHang,
    // },
    // {
    //     path: "/TraCuuKhachHang/:idKhachHang",
    //     permission: "",
    //     title: "Chi tiết lịch sử khách hàng",
    //     name: "calldetails",
    //     icon: "tags",
    //     showInMenu: false,
    //     component: ScanHopDongTraCuu,
    // },
    // {
    //     path: "/calls/:linkedid",
    //     permission: "",
    //     title: "Chi tiết cuộc gọi",
    //     name: "calldetails",
    //     icon: "tags",
    //     showInMenu: false,
    //     component: CallDetail,
    // },
    // {
    //     path: "/callhistories",
    //     permission: "",
    //     title: "Lịch sử cuộc gọi",
    //     name: "callhistories",
    //     icon: "tags",
    //     showInMenu: true,
    //     component: Call,
    // },
    // {
    //     path: "/tiepNhanThongTins",
    //     permission: "",
    //     title: "Yêu cầu đã gửi",
    //     name: "tiepNhanThongTins",
    //     icon: "tags",
    //     showInMenu: true,
    //     component: TiepNhanThongTins,
    // },
    // {
    //     path: "/lapDatMois",
    //     permission: "",
    //     title: "Lắp đặt mới",
    //     name: "lapDatMois",
    //     icon: "tags",
    //     showInMenu: true,
    //     component: LapDatMoiTraCuuDons,
    // },
    // {
    //     path: "/LapDatMois/:maddk",
    //     permission: "",
    //     title: "Chi tiết lắp đặt mới",
    //     icon: "tags",
    //     name: "DHH_TongHopPhieuBaoHongTheoNgay",
    //     showInMenu: false,
    //     component: LapDatMoiDetail,
    // },
    // {
    //     path: "/thaythedonghos",
    //     permission: "",
    //     title: "Thay thế đồng hồ",
    //     name: "lapDatMois",
    //     icon: "tags",
    //     showInMenu: true,
    //     component: TongHopThayTheDongHo,
    // },
    // {
    //     path: "/ThayTheDongHos/:maddk",
    //     // permission: 'Pages.ThayTheDongHo',
    //     title: "Chi tiết hồ sơ thay thế đồng hồ",
    //     icon: "tags",
    //     name: "DHH_TongHopPhieuBaoHongTheoNgay",
    //     showInMenu: false,
    //     component: ThayTheDongHoDetail,
    // },
    // {
    //     path: "/caitaodonghos",
    //     permission: "",
    //     title: "Cải tạo đồng hồ",
    //     name: "lapDatMois",
    //     icon: "tags",
    //     showInMenu: true,
    //     component: TongHopCaiTaoDongHo,
    // },
    // {
    //     path: "/CaiTaoDongHos/:maddk",
    //     // permission: 'Pages.ThayTheDongHo',
    //     title: "Chi tiết hồ sơ cải tạo đồng hồ",
    //     icon: "tags",
    //     name: "DHH_TongHopPhieuBaoHongTheoNgay",
    //     showInMenu: false,
    //     component: CaiTaoDongHoDetail,
    // },
    // {
    //     path: "/tiepNhanThongTins/:tiepNhanThongTinID",
    //     permission: "",
    //     title: "Yêu cầu đã gửi",
    //     name: "tiepNhanThongTins",
    //     icon: "tags",
    //     showInMenu: false,
    //     component: TiepNhanThongTinDetail,
    // },
    // {
    //     path: "/tiepNhanThongTinAddNew",
    //     permission: "",
    //     title: "Thêm mới thông tin tiếp nhận",
    //     name: "tiepNhanThongTinAddNew",
    //     icon: "tags",
    //     showInMenu: false,
    //     component: AddYeuCau,
    // },
    // {
    //     path: "/thutaiquay",
    //     permission: "",
    //     title: "Thu tại quầy",
    //     icon: "tags",
    //     name: "TheoDoiCatNuocs",
    //     showInMenu: true,
    //     component: CongNoDanhSachKyHoaDonConNos,
    // },
    {
        path: "/CallCustomer",
        permission: "",
        title: "Gọi điện khách hàng",
        icon: "tags",
        name: "CallCustomer",
        showInMenu: true,
        component: GoiDienKhachHang,
    },
    {
        path: "/HocKyNang",
        permission: "",
        title: "HocKyNang",
        icon: "tags",
        name: "HocKyNang",
        showInMenu: true,
        component: HocKyNang,
    },
    // {
    //     path: "/khachhangs",
    //     permission: "",
    //     title: "Khách hàng",
    //     icon: "tags",
    //     name: "Khachhangs",
    //     showInMenu: false,
    //     component: ScanHopDongKhachHang,
    // },
];

export const routers = [...userRouter, ...appRouters];

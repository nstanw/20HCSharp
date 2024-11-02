import { Tag } from "antd";

import moment from "moment";

const tiepNhanThongTinColumns = [
    {
        title: "Số máy gọi",
        dataIndex: "soDienThoaiKhachHang",
        key: "soDienThoaiKhachHang",
        width: 150,
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Họ tên khách hàng",
        dataIndex: "hoTenKhachHang",
        key: "displayName",
        width: 150,
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Nhóm thông tin",
        dataIndex: "nhomThongTin",
        key: "loaiThongTin",
        width: 150,
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Nội dung yêu cầu",
        dataIndex: "noiDungYeuCau",
        key: "ghiChu",
        width: 150,
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Đơn vị tiếp nhận",
        dataIndex: "tenpb",
        key: "tenpb",
        width: 150,
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Họ tên người nhập",
        dataIndex: "name",
        key: "name",
        width: 150,
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Thời gian nhập",
        dataIndex: "creationTime",
        key: "creationTime",
        width: 150,
        render: (creationTime: Date) => <div>{moment(creationTime).format("DD/MM/YYYY HH:ss")}</div>,
    },
    {
        title: "Xử lý thông tin",
        dataIndex: "trangThai",
        key: "trangThai",
        width: 150,
        render: (text: string) => {
            if (text === "TiepNhan") {
                return <Tag color="red">Tiếp nhận</Tag>;
            } else if (text === "Huy") {
                return <Tag color="green">Hủy</Tag>;
            } else if (text === "DangXuLy") {
                return <Tag color="green">Đang xử lý</Tag>;
            } else if (text === "HoanThanh") return <Tag color="blue">Hoàn thành</Tag>;
            else if (text === "ChoTiepNhan") return <Tag color="#f50">Chờ tiếp nhận</Tag>;

            return <Tag color="red">Chưa rõ</Tag>;
        },
    },
];
export default tiepNhanThongTinColumns;

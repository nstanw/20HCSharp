import moment from "moment";

const columns = [
    {
        title: "STT",
        dataIndex: "index",
        key: "index",
        render: (_: any, __: any, index: number) => <div>{index + 1}</div>,
    },
    {
        title: "Mã đơn",
        dataIndex: "maddk",
        key: "maddk",
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Số điện thoại",
        dataIndex: "didong",
        key: "didong",
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Tên khách hàng",
        dataIndex: "tenkh",
        key: "tenkh",
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Địa chỉ",
        dataIndex: "diachild",
        key: "diachild",
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Khách hàng nghe máy",
        dataIndex: "luyKeSoLanKhachKhongNgheMayTrongNgay",
        key: "luyKeSoLanKhachKhongNgheMayTrongNgay",
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Lũy kế số lần khách hàng không nghe máy",
        dataIndex: "khachHangTraLoi",
        key: "khachHangTraLoi",
        render: (text: string) => <div>{text ? "Nghe máy" : "Chưa nghe máy"}</div>,
    },
    {
        title: "Thời gian gọi gần nhất",
        dataIndex: "thoiGianGoiDienThoaiGanNhat",
        key: "thoiGianGoiDienThoaiGanNhat",
        render: (ThoiGianGoiDienThoaiGanNhat) => (
            <div>
                {ThoiGianGoiDienThoaiGanNhat ? moment(ThoiGianGoiDienThoaiGanNhat).format(" HH:mm:ss DD/MM/yyyy") : ""}
            </div>
        ),
    },
];
export default columns;

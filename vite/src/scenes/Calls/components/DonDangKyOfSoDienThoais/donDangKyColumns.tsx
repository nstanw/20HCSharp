import { Progress, Tag } from "antd";
import moment from "moment";

const donDangKyColumns = [
    {
        title: "Mã DDK",
        sorter: true,
        dataIndex: "maddk",
        key: "maddk",
        fixed: true,
        width: 40,
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Tên khách hàng",
        dataIndex: "tenkh",
        key: "tenkh",
        width: 80,
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Địa chỉ",
        dataIndex: "diachild",
        key: "diachild",
        width: 100,
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Số điện thoại",
        sorter: true,
        dataIndex: "didong",
        key: "didong",
        width: 40,
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Thời gian nhập đơn",
        dataIndex: "ngaydk",
        key: "ngaydk",
        width: 50,
        sorter: true,
        render: (ngaydk: Date) => <div>{moment(ngaydk).format("DD/MM/YYYY HH:ss")}</div>,
    },
    {
        title: "Loại đơn",
        dataIndex: "loaidk",
        key: "loaidk",
        width: 50,
        filters: [
            { text: "Lắp đặt mới", value: "DK" },
            { text: "Thay thế đồng hồ", value: "TDH" },
            { text: "Cải tạo", value: "CT" },
        ],
        render: (text: string) => {
            if (text === "DK") {
                return <Tag color="red">Lắp đặt mới</Tag>;
            } else if (text === "CT") {
                return <Tag color="green">Cải tạo</Tag>;
            } else if (text === "TDH") {
                return <Tag color="geekblue">Thay thế đồng hồ</Tag>;
            } else {
                return <Tag color="volcano"></Tag>;
            }
        },
    },
    {
        title: "Đăng ký",
        dataIndex: "ttdk",
        key: "ttdk",
        width: 30,
        render: (text: string) => {
            if (text === "DK_A") {
                return <Progress percent={100} showInfo={false} />;
            } else {
                return <Progress percent={50} showInfo={false} />;
            }
        },
    },
    {
        title: "Dự toán",
        dataIndex: "ttct",
        key: "ttct",
        width: 30,
        render: (text: string) => {
            if (text === "CT_A") {
                return <Progress percent={100} showInfo={false} />;
            } else {
                return <Progress percent={50} showInfo={false} />;
            }
        },
    },
    {
        title: "Hợp đồng",
        dataIndex: "tthd",
        key: "tthd",
        width: 30,
        render: (text: string) => {
            if (text === "HD_A") {
                return <Progress percent={100} showInfo={false} />;
            } else {
                return <Progress percent={50} showInfo={false} />;
            }
        },
    },
    {
        title: "Quyết toán",
        dataIndex: "ttqt",
        key: "ttqt",
        width: 30,
        render: (text: string) => {
            if (text === "QT_A") {
                return <Progress percent={100} showInfo={false} />;
            } else {
                return <Progress percent={50} showInfo={false} />;
            }
        },
    },
];
export default donDangKyColumns;

import moment from "moment";

const lapDatMoiBieu10Columns = [
    {
        title: "Mã đơn",
        dataIndex: "maddk",
        key: "maddk",
        width: 120,
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Mã dự toán",
        dataIndex: "maDuToan",
        key: "maDuToan",
        width: 120,
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Thời gian tiếp nhận",
        dataIndex: "ngaydk",
        key: "ngaydk",
        width: 150,
        render: (value: Date) => <div>{moment(value).format("DD/MM/YYYY HH:mm")}</div>,
    },
    {
        title: "Số điện thoại",
        dataIndex: "didong",
        key: "didong",
        width: 130,
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Tên khách hàng",
        dataIndex: "tenkh",
        key: "tenkh",
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Địa chỉ lắp đặt",
        dataIndex: "diachild",
        key: "diachild",
        render: (text: string) => <div>{text}</div>,
    },
];
export default lapDatMoiBieu10Columns;

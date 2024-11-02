const columns = [
    {
        title: "Mã khách hàng",
        dataIndex: "idkh",
        key: "sodb",
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Tên khách hàng",
        dataIndex: "tenkh",
        key: "tenkh",
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Số điện thoại",
        dataIndex: "sdt",
        key: "sdt",
        width: 130,
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Địa chỉ",
        dataIndex: "diachi",
        key: "diachi",
        render: (text: string) => <div>{text}</div>,
    },
];
export default columns;

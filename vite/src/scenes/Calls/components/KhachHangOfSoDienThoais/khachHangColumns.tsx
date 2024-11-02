const khachHangColumns = [
    {
        title: "IDKH",
        sorter: true,
        dataIndex: "idkh",
        key: "idkh",
        fixed: true,
        width: 40,
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Mã KH",
        sorter: true,
        dataIndex: ["sodb"],
        key: "sodb",
        fixed: true,
        width: 40,
        render: (text: string, row: any) => (
            <a target="blank" href={"http://nawasco.com.vn/HoaDonDienTu/TraCuuHoaDon/" + row.idkh}>
                {text}
            </a>
        ),
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
        dataIndex: "diachi",
        key: "diachi",
        width: 100,
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Số điện thoại",
        sorter: true,
        dataIndex: "sdt",
        key: "sdt",
        width: 40,
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Mục đích sử dụng",
        dataIndex: "mamdsd",
        key: "mamdsd",
        width: 50,
        render: (mamdsd: string) => <div>{mamdsd}</div>,
    },
];
export default khachHangColumns;

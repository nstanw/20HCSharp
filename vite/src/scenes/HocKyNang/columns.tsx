const columns = [
    {
        title: "Mã học kỹ năng",
        dataIndex: "maHocKyNang",
        key: "maHocKyNang",
        render: (text: number) => <div>{text}</div>,
    },
    {
        title: "Tên kỹ năng",
        dataIndex: "tenKyNang",
        key: "tenKyNang",
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Mô tả",
        dataIndex: "moTa",
        key: "moTa",
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Thời lượng",
        dataIndex: "thoiLuong",
        key: "thoiLuong",
        render: (text: number) => <div>{text.toFixed(1)}</div>,
    },
    {
        title: "TTKN",
        dataIndex: "ttkn",
        key: "ttkn",
        render: (text: string) => <div>{text}</div>,
    },

];

export default columns;

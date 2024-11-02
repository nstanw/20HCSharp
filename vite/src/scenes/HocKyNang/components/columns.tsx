const columns = [
    {
        title: "STT",
        dataIndex: "index",
        key: "index",
        render: (_: any, __: any, index: number) => <div>{index + 1}</div>,
    },

    {
        title: "Thời gian bắt đầu",
        dataIndex: "thoiGianBatDau",
        key: "thoiGianBatDau",
        render: (text: string) => <div>{new Date(text).toLocaleString()}</div>,
    },
    {
        title: "Thời gian kết thúc",
        dataIndex: "thoiGianKetThuc",
        key: "thoiGianKetThuc",
        render: (text: string) => <div>{new Date(text).toLocaleString()}</div>,
    },
    {
        title: "Nội dung",
        dataIndex: "noiDung",
        key: "noiDung",
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "TTKN",
        dataIndex: "ttkn",
        key: "ttkn",
        render: (text: string) => <div>{text}</div>,
    },
];

export default columns;

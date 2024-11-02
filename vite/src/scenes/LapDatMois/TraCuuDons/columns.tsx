import { Tag } from "antd";
import moment from "moment";

const lapDatMoiBieu02Columns = [
    {
        title: "Mã đơn",
        dataIndex: "maddk",
        key: "maddk",
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
    {
        title: "Trạng thái khảo sát",
        dataIndex: "ttpl",
        key: "ttpl",
        render: (text: string) => {
            if (!text) {
                return <Tag color="magenta">Chưa khảo sát</Tag>;
            } else if (text === "PL_A") {
                return <Tag color="blue">Đủ điều kiện lắp đặt</Tag>;
            } else if (text === "PL_P") {
                return <Tag color="orange">Chờ lắp mới</Tag>;
            }
            return <div>{text}</div>;
        },
    },
];
export default lapDatMoiBieu02Columns;

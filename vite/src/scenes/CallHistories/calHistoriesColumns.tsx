import { ArrowDownOutlined, ArrowUpOutlined, PlaySquareTwoTone } from "@ant-design/icons";
import { Tag } from "antd";
import moment from "moment";
import { ViewCELReport } from "../../services/asterisk/dto/viewCELReport";
const columns = [
    {
        dataIndex: "channame",
        key: "channame",
        width: 5,
        render: (channame: string, row: any) => {
            if (row.awswer) {
                if (channame.includes("SIP/VNPT")) {
                    return <ArrowDownOutlined style={{ color: "#08c" }} rotate={30} />;
                } else {
                    return <ArrowUpOutlined style={{ color: "#32a852" }} rotate={30} />;
                }
            } else {
                if (channame.includes("SIP/VNPT")) {
                    return <ArrowDownOutlined style={{ color: "red" }} rotate={30} />;
                } else {
                    return <ArrowUpOutlined style={{ color: "red" }} rotate={30} />;
                }
            }
        },
    },
    {
        title: "Thời gian gọi",
        dataIndex: "eventtime",
        key: "eventtime",
        width: 150,
        render: (thoiGianGoi: Date) => <div>{moment(thoiGianGoi).format("DD/MM/YYYY HH:ss")}</div>,
    },
    {
        title: "Số máy gọi",
        dataIndex: "exten",
        key: "exten",
        width: 150,
        render: (_text: string, row: ViewCELReport) => {
            if (row.channame.includes("SIP/VNPT")) {
                return <div>{row.cid_num}</div>;
            }
            return <div>{row.exten}</div>;
        },
    },
    {
        title: "Họ tên khách hàng",
        dataIndex: "hoTenKhachHang",
        key: "hoTenKhachHang",
        width: 150,
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Nội dung yêu cầu",
        dataIndex: "noiDungYeuCau",
        key: "noiDungYeuCau",
        width: 150,
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: "Xử lý thông tin",
        dataIndex: "trangThaiCuocGoi",
        key: "trangThaiCuocGoi",
        width: 150,
        render: (text: string, row: any) => {
            return text === "TiepNhan" ? (
                <Tag color="red">Tiếp nhận chưa tạo yêu cầu</Tag>
            ) : text === "Huy" ? (
                <Tag color="green">Hủy yêu cầu</Tag>
            ) : text === "DangXuLy" ? (
                <Tag color="blue">Đang gửi xử lý</Tag>
            ) : text === "HoanThanh" ? (
                <Tag color="#2e7d32">Hoàn thành</Tag>
            ) : row.awswer ? (
                <Tag color="#9a0007">Chưa cập nhật thông tin</Tag>
            ) : (
                <Tag color="magenta">Cuộc gọi nhỡ</Tag>
            );
        },
    },
    {
        title: "Ghi âm",
        dataIndex: "trangThaiCuocGoi",
        key: "trangThaiCuocGoi",
        width: 50,
        render: (_text: string) => <PlaySquareTwoTone style={{ verticalAlign: "middle" }} />,
    },
];
export default columns;

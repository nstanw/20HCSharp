import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import dayjs from "dayjs";
import { observer } from "mobx-react";
import * as React from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../../helpers/use-store";
import { IFilterDto } from "../../../models/IFilterDto";
import { pushFilterDto2 } from "../../../utils/pushFilterDto2";
const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";
const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { span: 24 },
};
const LapDatMoiBieu02Searchs = observer(() => {
    const [expand, setExpand] = React.useState(false);
    const [form] = useForm();
    const { lapDatMoiStore } = useStore();
    const { traCuuDonLapDatMois } = lapDatMoiStore;
    const { idKhachHang } = useParams<{ idKhachHang: string }>();

    React.useEffect(() => {
        if (idKhachHang) {
            (async function run() {
                traCuuDonLapDatMois.skipCount = 0;
                traCuuDonLapDatMois.q = idKhachHang;
                traCuuDonLapDatMois.filter = "";
                traCuuDonLapDatMois.filterO = [];
                await lapDatMoiStore.getTraCuuDonLapDatMois();
            })();
        }
    }, []);

    const getFields = () => {
        const children: any[] = [];
        if (expand) {
            children.push(
                <Col key="searchMADDK" span={12}>
                    <Form.Item label="Mã đơn" name="maddk">
                        <Input placeholder="Mã đơn đăng ký" />
                    </Form.Item>
                </Col>
            );
            children.push(
                <Col key="searchTenKH" span={12}>
                    <Form.Item label="Tên khách hàng" name="tenkh">
                        <Input placeholder="Tên khách hàng" />
                    </Form.Item>
                </Col>
            );
            children.push(
                <Col key="searchMANVKS" span={12}>
                    <Form.Item label="Mã nhân viên khảo sát" name="nv_khaosat_manv">
                        <Input placeholder="Mã nhân viên khảo sát" />
                    </Form.Item>
                </Col>
            );
            children.push(
                <Col key="searchDiaChi" span={12}>
                    <Form.Item label="Địa chỉ khách hàng" name="diachild">
                        <Input placeholder="Số nhà, tên đường, tên phường..." />
                    </Form.Item>
                </Col>
            );
            children.push(
                <Col key="searchSoCT" span={12}>
                    <Form.Item label="Mã dự toán" name="soct">
                        <Input placeholder="..." />
                    </Form.Item>
                </Col>
            );
            children.push(
                <Col key="searchNgaydk" span={12}>
                    <Form.Item name="ngaydk" label="Thời gian gửi yêu cầu">
                        <RangePicker
                            ranges={{
                                "Hôm nay": [dayjs(), dayjs()],
                                "Tháng này": [dayjs().startOf("month"), dayjs().endOf("month")],
                            }}
                            format={dateFormat}
                        />
                    </Form.Item>
                </Col>
            );
            children.push(
                <Col key="searchttpl" span={12}>
                    <Form.Item name="ttpl" label="Trạng thái khảo sát">
                        <Select style={{ width: "100%" }} allowClear>
                            <Option value="PL_A">Đủ điều kiện lắp đặt</Option>
                            <Option value="PL_P">Chờ lắp đặt</Option>
                            <Option value="null">Chưa khảo sát</Option>
                        </Select>
                    </Form.Item>
                </Col>
            );
        } else {
            children.push(
                <Col key="searchE" span={24}>
                    <Form.Item {...tailLayout} name="q">
                        <Input placeholder="Tìm kiếm" />
                    </Form.Item>
                </Col>
            );
        }
        return children;
    };

    const onFinish = async (values: any) => {
        if (expand) {
            const filterDtos: IFilterDto[] = [];
            for (const k in values) {
                if (values[k]) {
                    if (k === "nv_khaosat_manv" || k === "manhanvienthicong") {
                        pushFilterDto2(filterDtos, {
                            property: k,
                            value: values[k].value,
                            operator: "in",
                        });
                    } else if (k === "ttpl" && values[k] === "null") {
                        pushFilterDto2(filterDtos, {
                            property: "TTTK",
                            value: "TK_A",
                            operator: "neq",
                        });
                    } else {
                        pushFilterDto2(filterDtos, {
                            property: k,
                            value: values[k],
                            operator: values[k].length === 1 ? "eq" : "in",
                        });
                    }
                }
            }
            traCuuDonLapDatMois.skipCount = 0;
            traCuuDonLapDatMois.q = values.q;
            traCuuDonLapDatMois.filterO = filterDtos;
            await lapDatMoiStore.getTraCuuDonLapDatMois();
        } else {
            traCuuDonLapDatMois.skipCount = 0;
            traCuuDonLapDatMois.q = values.q;
            traCuuDonLapDatMois.filter = "";
            traCuuDonLapDatMois.filterO = [];
            await lapDatMoiStore.getTraCuuDonLapDatMois();
        }
    };

    return (
        <Form {...layout} form={form} name="advanced_search" className="ant-advanced-search-form" onFinish={onFinish}>
            <Row gutter={24}>{getFields()}</Row>
            <Row>
                <Col span={24} style={{ textAlign: "right" }}>
                    <Button type="primary" htmlType="submit">
                        Tìm kiếm
                    </Button>
                    <Button
                        style={{ margin: "0 8px" }}
                        onClick={() => {
                            form.resetFields();
                            traCuuDonLapDatMois.skipCount = 0;
                            traCuuDonLapDatMois.q = "";
                            traCuuDonLapDatMois.filter = "";
                            traCuuDonLapDatMois.filterO = [];
                            lapDatMoiStore.getTraCuuDonLapDatMois();
                        }}
                    >
                        Xóa bộ lọc
                    </Button>
                    <a
                        style={{ fontSize: 12 }}
                        onClick={() => {
                            setExpand(!expand);
                        }}
                    >
                        {expand ? <UpOutlined /> : <DownOutlined />} Nâng cao
                    </a>
                </Col>
            </Row>
        </Form>
    );
});

export default LapDatMoiBieu02Searchs;

import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import dayjs from "dayjs";
import { observer } from "mobx-react";
import * as React from "react";
import { useStore } from "../../../helpers/use-store";
import { IFilterDto } from "../../../models/IFilterDto";
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

interface ISearch2Props {
    handleSubmit: () => void;
}

const Search2 = observer(({ handleSubmit }: ISearch2Props) => {
    const [expand, setExpand] = React.useState(false);
    const [form] = useForm();
    const { caiTaoDongHoStore } = useStore();
    const { traCuuHoSos } = caiTaoDongHoStore;

    const onFinish = async (values: any) => {
        console.log(values);
        if (expand) {
            const filterDtos: IFilterDto[] = [];
            for (const k in values) {
                if (values[k]) {
                    if (k === "ttpl" && values[k] === "null") {
                        filterDtos.push({
                            property: "TTTK",
                            value: "TK_A",
                            operator: "neq",
                        });
                    } else if (k === "manhanvienkythuat") {
                        filterDtos.push({
                            property: k,
                            value: values[k].value,
                            operator: "in",
                        });
                    } else if (k === "matoxaylap") {
                        filterDtos.push({
                            property: k,
                            value: values[k].value,
                            operator: "in",
                        });
                    } else {
                        filterDtos.push({
                            property: k,
                            value: values[k],
                            operator: values[k].length === 1 ? "eq" : "in",
                        });
                    }
                }
            }
            console.log(filterDtos);
            traCuuHoSos.skipCount = 0;
            traCuuHoSos.q = values.q;
            traCuuHoSos.filterO = filterDtos;
            await handleSubmit();
        } else {
            traCuuHoSos.skipCount = 0;
            traCuuHoSos.q = values.q;
            traCuuHoSos.filter = "";
            traCuuHoSos.filterO = [];
            await handleSubmit();
        }
    };
    const resetForm = async () => {
        form.resetFields();
        traCuuHoSos.skipCount = 0;
        traCuuHoSos.q = "";
        traCuuHoSos.filter = "";
        traCuuHoSos.filterO = [];
        // thayTheDongHoStore.getTongHop();
        await handleSubmit();
    };

    return (
        <Form {...layout} form={form} name="advanced_search" className="ant-advanced-search-form" onFinish={onFinish}>
            {expand === true ? (
                <Row gutter={24}>
                    <Col key="searchMADDK" span={12}>
                        <Form.Item label="Mã đơn" name="maddk">
                            <Input placeholder="Mã đơn đăng ký" />
                        </Form.Item>
                    </Col>

                    <Col key="searchTenKH" span={12}>
                        <Form.Item label="Tên khách hàng" name="tenkh">
                            <Input placeholder="Tên khách hàng" />
                        </Form.Item>
                    </Col>

                    <Col key="searchMaKH" span={12}>
                        <Form.Item label="Mã khách hàng" name="makh">
                            <Input placeholder="Mã khách hàng" />
                        </Form.Item>
                    </Col>

                    <Col key="searchSoDienThoai" span={12}>
                        <Form.Item label="Số điện thoại" name="phone">
                            <Input placeholder="Nhập số điện thoại..." />
                        </Form.Item>
                    </Col>
                    <Col key="searchDiaChi" span={12}>
                        <Form.Item label="Địa chỉ khách hàng" name="diachild">
                            <Input placeholder="Số nhà, tên đường, tên phường..." />
                        </Form.Item>
                    </Col>

                    <Col key="searchLoaiThayThe" span={12}>
                        <Form.Item label="Loại đơn" name="loaithaythe">
                            <Select placeholder="Loại đơn đăng ký" style={{ width: 420 }}>
                                <Option value="%">Tất cả</Option>
                                <Option value="TDH1">Nhân viên ghi thu báo</Option>
                                <Option value="THD2">Khách hàng báo</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col key="searchLyDoYeuCau" span={12}>
                        <Form.Item label="Nội dung yêu cầu" name="LyDoYeuCau">
                            <Select placeholder="Nội dung yêu cầu" style={{ width: 420 }}>
                                <Option value="Đồng hồ chết">Đồng hồ chết</Option>
                                <Option value="Đồng hồ mờ">Đồng hồ mờ</Option>
                                <Option value="Tránh thất thoát">Tránh thất thoát</Option>
                                <Option value="Khó đọc chỉ số">Khó đọc chỉ số</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col key="searchHienTrangDongHo" span={12}>
                        <Form.Item label="Hiện trạng đồng hồ" name="hienTrangDongHo">
                            <Select placeholder="Hiện trạng đồng hồ" style={{ width: 420 }}>
                                <Option value="Đồng hồ chết">Đồng hồ chết</Option>
                                <Option value="Đồng hồ mờ">Đồng hồ mờ</Option>
                                <Option value="Tránh thất thoát">Tránh thất thoát</Option>
                                <Option value="Khó đọc chỉ số">Khó đọc chỉ số</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col key="searchNgaydk" span={12}>
                        <Form.Item name="ngaydk" label="Thời gian gửi yêu cầu">
                            <RangePicker
                                ranges={{
                                    "Hôm nay": [dayjs(), dayjs()],
                                    "Tháng này": [dayjs().startOf("month"), dayjs().endOf("month")],
                                    "Năm nay": [dayjs().startOf("year"), dayjs().endOf("year")],
                                }}
                                format={dateFormat}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            ) : (
                <Row gutter={24}>
                    <Col key="searchE" span={24}>
                        <Form.Item {...tailLayout} name="q">
                            <Input placeholder="Tìm kiếm" />
                        </Form.Item>
                    </Col>
                </Row>
            )}
            <Row>
                <Col span={24} style={{ textAlign: "right" }}>
                    <Button type="primary" htmlType="submit">
                        Tìm kiếm
                    </Button>
                    <Button
                        style={{ margin: "0 8px" }}
                        onClick={() => {
                            resetForm();
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

export default Search2;

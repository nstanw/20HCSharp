import { observer } from "mobx-react";
import { Button, Row, Col, Form, Input, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { IFilterDto } from "../../models/IFilterDto";
const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { span: 24 },
};
const Searchs = observer(({ handleSubmit }) => {
    const [form] = useForm();
    const getFields = () => {
        const children: any[] = [];
        children.push(
            <Col key="action" span={24}>
                <Form.Item name="action" label="Trạng thái">
                    <Select placeholder="Chọn trạng thái">
                        <Option key="CAN_GOI_DT" value="CAN_GOI_DT">
                            Cần gọi điện khách hàng
                        </Option>
                        <Option key="DA_GOI_DT" value="DA_GOI_DT">
                            Đã gọi điện khách hàng
                        </Option>
                    </Select>
                </Form.Item>
            </Col>
        );

        return children;
    };

    const onFinish = async (values) => {
        const filterDtos: IFilterDto[] = [];
        for (let k in values) {
            if (values[k]) {
                filterDtos.push({
                    property: k,
                    value: values[k],
                    operator: values[k].length === 1 ? "eq" : "in",
                });
            }
        }
        await handleSubmit(filterDtos);
    };

    const resetForm = async () => {
        form.resetFields();
        let values = form.getFieldsValue();
        await onFinish(values);
    };

    const initialValues = { action: "CAN_GOI_DT" };
    return (
        <Form
            initialValues={initialValues}
            {...layout}
            form={form}
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={onFinish}
        >
            <Row gutter={20}>
                <Col key="searchE" span={12}>
                    <Form.Item {...tailLayout} name="q">
                        <Input placeholder="Tìm kiếm theo tên nhân viên hoặc id khách hàng" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Row>{getFields()}</Row>
                </Col>
            </Row>
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
                </Col>
            </Row>
        </Form>
    );
});

export default Searchs;

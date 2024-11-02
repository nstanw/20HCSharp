import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../helpers/use-store";
import LoginModel from "../../models/Login/loginModel";
import "./index.less";
const { Option } = Select;

const Login = () => {
    const [form] = Form.useForm();
    const [, forceUpdate] = React.useState<{}>();
    const { authenticationStore, sessionStore } = useStore();
    const navigate = useNavigate();

    const handleSubmit = async (_e: any) => {
        try {
            if (form.getFieldsError().filter(({ errors }) => errors.length).length === 0) {
                const values = form.getFieldsValue();
                await authenticationStore!.login({
                    ...new LoginModel(),
                    userNameOrEmailAddress: values.userNameOrEmailAddress,
                    password: values.password,
                    exten: values.exten,
                });
                sessionStorage.setItem("rememberMe", "1");
                navigate("/callhistories");
                await sessionStore!.getCurrentLoginInformations();
            }
        } catch (error) {
            console.error("Failed: ", error);
        }
    };

    // To disable submit button at the beginning.
    React.useEffect(() => {
        forceUpdate({});
    }, []);

    React.useEffect(() => {
        if (!!authenticationStore.token || !!window.localStorage.getItem("accessToken")) navigate("/");
    }, []);

    return (
        <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={{ span: 6, offset: 9 }} style={{ marginTop: 20 }}>
                <Card>
                    <h3>Đăng nhập</h3>
                    <p>Tổng đài tiếp nhận thông tin</p>
                    <Form form={form} name="basic" onFinish={handleSubmit}>
                        <Form.Item name="userNameOrEmailAddress" rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên đăng nhập " />
                        </Form.Item>
                        <Form.Item name="exten" rules={[{ required: true }]}>
                            <Select placeholder="Số máy lẻ" allowClear>
                                <Option value="200">200</Option>
                                <Option value="201">201</Option>
                                <Option value="202">202</Option>
                                {/* <Option value="203">K0 NHAN</Option> */}
                            </Select>
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Mật khẩu" />
                        </Form.Item>
                        <Form.Item shouldUpdate={true}>
                            {() => (
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    disabled={!form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length > 0}
                                >
                                    Đăng nhập
                                </Button>
                            )}
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default Login;

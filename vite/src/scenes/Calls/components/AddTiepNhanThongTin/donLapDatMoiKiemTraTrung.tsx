import { Row, Col, Spin, Button, Modal, Table, Tag, Form, Input, Switch, message } from "antd";
import React, { useState } from "react";
import { observer } from "mobx-react";
import { useStore } from "../../../../helpers/use-store";
import moment from "moment";
import { IFilterDto } from "../../../../models/IFilterDto";
import { pushFilterDto2 } from "../../../../utils/pushFilterDto2";

export interface IPaneTab {
    title: string;
    content: any;
    key: string;
}
export interface IParameterTinTrung {
    tenkh?: string;
    didong?: string;
    maKhoiXom?: string;
    tenKhoiXom?: string;
    cmnd?: string;
    soNha?: string;
    maDuongPho?: string;
    tenDuongPho?: string;
    qsddaT_SoGiayChungNhan?: string;
    loaiKiemTra?: string;
}
interface IPhanCongThiCong {
    parameters?: IParameterTinTrung;
    visible: boolean;
    onDone: (khachHangNopTienDauNoiLai: boolean, maDonKhaoSatTruoc: string) => void;
    onCancel: () => void;
}
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const DialogDonLapDatMoiKiemTraTrung: React.FC<IPhanCongThiCong> = observer(
    ({ parameters, visible, onDone, onCancel }) => {
        const { lapDatMoiStore } = useStore();
        const { donDangKyTrungs } = lapDatMoiStore;
        const [spinning, setSpinning] = useState(false);
        const [skipCount, setSkipCount] = React.useState(0);
        const [pageSize, setPageSize] = React.useState(10);
        const [form] = Form.useForm();

        React.useEffect(() => {
            (async function run() {
                if (parameters) {
                    form.setFieldsValue({
                        tenkh: parameters.tenkh,
                        didong: parameters.didong,
                        tenDuongPho: parameters.tenDuongPho,
                        tenKhoiXom: parameters.tenKhoiXom,
                        sogiaychungnhan: parameters.qsddaT_SoGiayChungNhan,
                        sonha: parameters.soNha,
                        madpld: parameters.maDuongPho,
                        cmnd: parameters.cmnd,
                        tenkh_check: true,
                        didong_check: true,
                        cmnd_check: true,
                        tenDuongPho_check: true,
                        tenKhoiXom_check: true,
                    });
                    setSpinning(true);
                    await lapDatMoiStore.getDonDangKyTrungs();
                    setSpinning(false);
                }
            })();
        }, [parameters]);
        React.useEffect(() => {
            (async function run() {
                donDangKyTrungs.sizePage = pageSize;
                donDangKyTrungs.skipCount = skipCount;
                await lapDatMoiStore.getDonDangKyTrungs();
            })();
        }, [skipCount]);
        const onFinish = async (values: any) => {
            setSpinning(false);
            const filterDtos: IFilterDto[] = [];
            if (values.tenkh_check === true) {
                pushFilterDto2(filterDtos, {
                    property: "tenkh",
                    value: values?.tenkh,
                    operator: "eq",
                });
            }
            if (values.didong_check === true) {
                pushFilterDto2(filterDtos, {
                    property: "didong",
                    value: values?.didong,
                    operator: "eq",
                });
            }
            if (values.cmnd_check === true) {
                pushFilterDto2(filterDtos, {
                    property: "cmnd",
                    value: values?.cmnd,
                    operator: "eq",
                });
            }
            if (values.sonha_check === true) {
                pushFilterDto2(filterDtos, {
                    property: "sonha",
                    value: values?.sonha,
                    operator: "eq",
                });
            }
            if (values.tenKhoiXom_check === true && parameters?.maKhoiXom) {
                pushFilterDto2(filterDtos, {
                    property: "makhoi",
                    value: parameters?.maKhoiXom,
                    operator: "eq",
                });
            }
            if (values.tenDuongPho_check === true && parameters?.maDuongPho) {
                pushFilterDto2(filterDtos, {
                    property: "madpld",
                    value: parameters?.maDuongPho,
                    operator: "eq",
                });
            }
            if (values.sogiaychungnhan_check === true) {
                pushFilterDto2(filterDtos, {
                    property: "sogiaychungnhan",
                    value: values?.sogiaychungnhan,
                    operator: "eq",
                });
            }
            donDangKyTrungs.skipCount = 0;
            donDangKyTrungs.q = values.q;
            donDangKyTrungs.filterO = filterDtos;
            await lapDatMoiStore.getDonDangKyTrungs();
        };
        return (
            <Modal
                title="Đơn đăng ký lắp đặt mới trùng"
                open={visible}
                width="95%"
                okButtonProps={{ disabled: spinning }}
                onCancel={() => onCancel()}
                footer={[
                    <Button
                        key="back"
                        onClick={() => {
                            onCancel();
                        }}
                    >
                        Đóng
                    </Button>,
                    <Button
                        type="primary"
                        key="khongTrung"
                        onClick={() => {
                            onDone(false, "");
                        }}
                    >
                        Xác nhận không trùng đơn đã khảo sát trước đó
                    </Button>,
                ]}
            >
                <Row>
                    <Col span={24}>
                        <Spin spinning={spinning}>
                            <Form
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 14 }}
                                form={form}
                                layout="horizontal"
                                size="small"
                                onFinish={onFinish}
                            >
                                <Form.Item label="Tên khách hàng" style={{ marginBottom: 0 }}>
                                    <Form.Item
                                        name="tenkh"
                                        style={{ display: "inline-block", width: "calc(70% - 8px)" }}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="tenkh_check"
                                        valuePropName="checked"
                                        style={{ display: "inline-block", width: "calc(30% - 8px)", margin: "0 8px" }}
                                    >
                                        <Switch />
                                    </Form.Item>
                                </Form.Item>
                                <Form.Item label="Số điện thoại" style={{ marginBottom: 0 }}>
                                    <Form.Item
                                        name="didong"
                                        style={{ display: "inline-block", width: "calc(70% - 8px)" }}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="didong_check"
                                        valuePropName="checked"
                                        style={{ display: "inline-block", width: "calc(30% - 8px)", margin: "0 8px" }}
                                    >
                                        <Switch />
                                    </Form.Item>
                                </Form.Item>
                                <Form.Item label="Số CMND" style={{ marginBottom: 0 }}>
                                    <Form.Item
                                        name="cmnd"
                                        style={{ display: "inline-block", width: "calc(70% - 8px)" }}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="cmnd_check"
                                        valuePropName="checked"
                                        style={{ display: "inline-block", width: "calc(30% - 8px)", margin: "0 8px" }}
                                    >
                                        <Switch />
                                    </Form.Item>
                                </Form.Item>
                                <Form.Item label="Vị trí lắp đặt (Số nhà)" style={{ marginBottom: 0 }}>
                                    <Form.Item
                                        name="sonha"
                                        style={{ display: "inline-block", width: "calc(70% - 8px)" }}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="sonha_check"
                                        valuePropName="checked"
                                        style={{ display: "inline-block", width: "calc(30% - 8px)", margin: "0 8px" }}
                                    >
                                        <Switch />
                                    </Form.Item>
                                </Form.Item>
                                <Form.Item label="Vị trí lắp đặt (Khối/Xóm)" style={{ marginBottom: 0 }}>
                                    <Form.Item
                                        name="tenKhoiXom"
                                        style={{ display: "inline-block", width: "calc(70% - 8px)" }}
                                    >
                                        <Input disabled />
                                    </Form.Item>
                                    <Form.Item
                                        name="tenKhoiXom_check"
                                        valuePropName="checked"
                                        style={{ display: "inline-block", width: "calc(30% - 8px)", margin: "0 8px" }}
                                    >
                                        <Switch />
                                    </Form.Item>
                                </Form.Item>
                                <Form.Item label="Vị trí lắp đặt (Tên đường)" style={{ marginBottom: 0 }}>
                                    <Form.Item
                                        name="tenDuongPho"
                                        style={{ display: "inline-block", width: "calc(70% - 8px)" }}
                                    >
                                        <Input disabled />
                                    </Form.Item>
                                    <Form.Item
                                        name="tenDuongPho_check"
                                        valuePropName="checked"
                                        style={{ display: "inline-block", width: "calc(30% - 8px)", margin: "0 8px" }}
                                    >
                                        <Switch />
                                    </Form.Item>
                                </Form.Item>
                                <Form.Item label="Số hiệu thửa đất" style={{ marginBottom: 0 }}>
                                    <Form.Item
                                        name="sogiaychungnhan"
                                        style={{ display: "inline-block", width: "calc(70% - 8px)" }}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="sogiaychungnhan_check"
                                        valuePropName="checked"
                                        style={{ display: "inline-block", width: "calc(30% - 8px)", margin: "0 8px" }}
                                    >
                                        <Switch />
                                    </Form.Item>
                                </Form.Item>
                                <Form.Item {...tailLayout}>
                                    <Button htmlType="submit" type="primary">
                                        Tìm kiếm
                                    </Button>
                                </Form.Item>
                            </Form>
                            <Table
                                rowKey={(record) => `donDangKyLapDatMoiTrung${record.id}`}
                                bordered={true}
                                pagination={{
                                    pageSize: 10,
                                    total: donDangKyTrungs.result === undefined ? 0 : donDangKyTrungs.result.count,
                                    defaultCurrent: 1,
                                }}
                                onChange={(pagination: any) => {
                                    setPageSize(pagination.pageSize);
                                    setSkipCount((pagination.current - 1) * 10!);
                                }}
                                columns={[
                                    {
                                        title: "Mã đơn",
                                        dataIndex: "maddk",
                                        key: "maddk",
                                        width: 120,
                                        render: (text: string, record) => (
                                            <Button
                                                type="link"
                                                onClick={() => {
                                                    if (record.ttct == "CT_A" && record.isHuy == true) {
                                                        Modal.confirm({
                                                            title: "Khách hàng đã khảo sát trước đó!",
                                                            content: "Khách hàng nộp tiền 500.000 tiền khảo sát lại",
                                                            onOk: () => {
                                                                onDone(true, text);
                                                            },
                                                        });
                                                    } else {
                                                        message.info("Khách hàng đang thực hiện");
                                                    }
                                                }}
                                            >
                                                {text}
                                            </Button>
                                        ),
                                    },
                                    {
                                        title: "Thời gian tiếp nhận",
                                        dataIndex: "ngaydk",
                                        key: "ngaydk",
                                        width: 150,
                                        render: (value: Date) => (
                                            <div>{moment(value).utc().format("DD/MM/YYYY HH:mm")}</div>
                                        ),
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
                                        title: "Số hiệu thửa đất",
                                        width: 130,
                                        dataIndex: "qsddaT_SoGiayChungNhan",
                                        key: "qsddaT_SoGiayChungNhan",
                                        render: (text: string) => <div>{text}</div>,
                                    },
                                    {
                                        title: "Trạng thái",
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
                                ]}
                                loading={spinning}
                                dataSource={
                                    donDangKyTrungs?.result?.items === undefined ? [] : donDangKyTrungs?.result?.items
                                }
                            />
                        </Spin>
                    </Col>
                </Row>
            </Modal>
        );
    }
);

export default DialogDonLapDatMoiKiemTraTrung;

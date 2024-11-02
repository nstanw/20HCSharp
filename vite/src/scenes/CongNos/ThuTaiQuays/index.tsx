import * as React from "react";
import { observer } from "mobx-react";
import { Card, Row, Form, Button, Descriptions, Spin, Table, Modal, message } from "antd";
import { useStore } from "../../../helpers/use-store";
import { FormInstance } from "antd/lib/form";
import khachHangService from "../../../services/khachHang/khachHangService";
import { KhachHangDto } from "../../../services/khachHang/dto/khachHangDto";
import ChiTietThanhToanDto from "../../../models/CongNos/ChiTietThanhToanDto";
import congNoService from "../../../services/congNos/congNoService";
import InputThuTienMatDto from "../../../models/CongNos/InputThuTienMatDto";
import PrintDialog from "../../../components/Prints/PrintDialog";
import KhachHangSelect from "../../../components/KhachHangs/khachHangSelect";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const formatter = new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
});
const CongNoDanhSachKyHoaDonConNos = observer(() => {
    const { congNoStore, sessionStore } = useStore();
    const { thanhToan } = congNoStore;
    const [loaddingKhachhang, setLoaddingKhachhang] = React.useState(false);
    const [khachHang, setKhachHang] = React.useState<KhachHangDto>();
    const [thanhToanDtoSelected, setThanhToanDtoSelected] = React.useState<ChiTietThanhToanDto>();
    const [confirmLoadingThanhToan, setConfirmLoadingThanhToan] = React.useState(false);
    const [ModalText, setModalText] = React.useState("");
    const [url, setUrl] = React.useState("");
    const [parameters, setParameters] = React.useState({});
    const [visiblePrint, setVisiblePrint] = React.useState(false);

    const formRef = React.createRef<FormInstance>();
    const [form] = Form.useForm();
    React.useEffect(() => {
        sessionStore.title = "Thu tại quầy";
        sessionStore.subTitle = "";
    }, []);
    React.useEffect(() => {
        if (thanhToanDtoSelected) {
            setModalText("Bạn có chắc chắn thu tiền với sô tiền là: " + formatter.format(thanhToanDtoSelected.soTienThanhToan));
        } else {
            setModalText("");
        }
    }, [thanhToanDtoSelected]);
    const onFinish = async (idkh: string) => {
        setLoaddingKhachhang(true);
        try {
            var khachHang = await khachHangService.getViewKhachHang(idkh);
            await congNoStore.getThanhToans(khachHang.idkh);
            setKhachHang(khachHang);
            setLoaddingKhachhang(false);
        } catch (ex) {
            setLoaddingKhachhang(false);
        }
    };
    const handleOkThanhToan = async () => {
        setConfirmLoadingThanhToan(true);
        if (thanhToanDtoSelected) {
            try {
                await congNoService.thuTaiQuay({
                    ...new InputThuTienMatDto(),
                    idkh: thanhToanDtoSelected.idkh,
                    thang: thanhToanDtoSelected.thang,
                    nam: thanhToanDtoSelected.nam,
                    soTien: thanhToanDtoSelected.soTienThanhToan,
                });
                message.success("Thanh toán thành công");
                await congNoStore.getThanhToans(thanhToanDtoSelected.idkh);
                setConfirmLoadingThanhToan(false);
            } catch (er) {
                setConfirmLoadingThanhToan(false);
            }
            setThanhToanDtoSelected(undefined);
        }
    };
    const handleCancelThanhToan = async () => {
        setThanhToanDtoSelected(undefined);
    };
    return (
        <Card>
            <Form form={form} {...formItemLayout} ref={formRef}>
                <Form.Item label="Mã khách hàng" name="sodb" rules={[{ required: true, message: "Vui lòng nhập trường này" }]}>
                    <KhachHangSelect
                        onChange={(value) => {
                            onFinish(value.value as string);
                        }}
                    ></KhachHangSelect>
                </Form.Item>
            </Form>

            <Spin spinning={loaddingKhachhang}>
                <Row style={{ display: khachHang ? "" : "none" }}>
                    <Descriptions
                        bordered={true}
                        style={{ paddingTop: 10 }}
                        title="Thông tin khách hàng"
                        column={{ xxl: 2, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                    >
                        <Descriptions.Item label="Mã khách hàng">{khachHang?.sodb}</Descriptions.Item>
                        <Descriptions.Item label="Tên khách hàng">{khachHang?.tenkh}</Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ khách hàng">{khachHang?.diachi}</Descriptions.Item>
                        <Descriptions.Item label="Tổng tiền còn nợ">
                            <div>{formatter.format(thanhToan.tongTienConNo)}</div>
                        </Descriptions.Item>
                    </Descriptions>
                </Row>
                <Row>
                    <Table
                        rowKey={(record) => record.thang + "" + record.nam}
                        bordered={true}
                        pagination={false}
                        columns={[
                            {
                                title: "Kỳ hóa đơn",
                                dataIndex: "thang",
                                key: "thang",
                                width: 120,
                                render: (_text: string, record: ChiTietThanhToanDto) => <div> {record.thang + "/" + record.nam} </div>,
                            },
                            {
                                title: "Tổng tiền phát sinh",
                                dataIndex: "tongtien",
                                key: "tongtien",
                                width: 250,
                                render: (text: number) => <div>{formatter.format(text)}</div>,
                            },
                            {
                                title: "Số tiền còn nợ",
                                dataIndex: "tienconno",
                                key: "tienconno",
                                width: 250,
                                render: (text: number) => <div>{formatter.format(text)}</div>,
                            },
                            {
                                title: "Xác nhận",
                                key: "action",
                                render: (_text, record) => (
                                    <Button
                                        type="link"
                                        onClick={() => {
                                            setThanhToanDtoSelected(record);
                                        }}
                                    >
                                        Thanh toán
                                    </Button>
                                ),
                            },
                            {
                                title: "In phiếu thu",
                                key: "action",
                                render: (_text: string, record: ChiTietThanhToanDto) => (
                                    <Button
                                        type="link"
                                        onClick={() => {
                                            setParameters({
                                                THANG: record.thang,
                                                NAM: record.nam,
                                                IDKH: record.idkh,
                                            });
                                            setUrl("/NAWASCO.ERP.Report/CN_PhieuThuTaiQuays");
                                            setVisiblePrint(true);
                                        }}
                                    >
                                        In phiếu thu
                                    </Button>
                                ),
                            },
                        ]}
                        dataSource={thanhToan?.kyThanhToans === undefined ? [] : thanhToan.kyThanhToans}
                    />
                </Row>
                <Modal
                    title="Title"
                    visible={thanhToanDtoSelected !== undefined}
                    onOk={handleOkThanhToan}
                    confirmLoading={confirmLoadingThanhToan}
                    onCancel={handleCancelThanhToan}
                >
                    <p>{ModalText}</p>
                </Modal>
                <PrintDialog
                    url={url}
                    parameters={parameters}
                    onPrintDone={() => {
                        setVisiblePrint(false);
                    }}
                    visible={visiblePrint}
                ></PrintDialog>
            </Spin>
        </Card>
    );
});
export default CongNoDanhSachKyHoaDonConNos;

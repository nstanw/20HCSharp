import { Modal, Spin, Form, message, Input, Card, Descriptions, Space, Button } from "antd";
import React, { useState } from "react";
import { observer } from "mobx-react";
import { DonDangKyDto } from "../../../services/donDangKy/dto/donDangKyDto";
import moment from "moment";
import lichSuDienThoaiService from "../../../services/lichSuDienThoai/lichSuDienThoaiService";
import { AddLichSuDienThoaiOfKhachHangNgheMayInput } from "../../../services/lichSuDienThoai/dto/AddLichSuDienThoaiOfKhachHangNgheMayInput";

interface IXacDinhLoTrinhGhiThu {
    onDone: () => void;
    onCancel: () => void;
    open: boolean;
    selectedDonDangKyDto: DonDangKyDto;
}
const DialogAddLichSuDienThoai: React.FC<IXacDinhLoTrinhGhiThu> = observer(({ open, onDone, onCancel,selectedDonDangKyDto }) => {
    const [isLoadding, setIsLoadding] = useState(false);
    const [form] = Form.useForm();

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 24 },
    };

    const formatDate = (date: Date | undefined): string => {
        return date ? moment(date).format("DD/MM/yyyy") : "";
    };

    const handleNgheMay = async () => {
        form.validateFields()
            .then(async (values) => {
                setIsLoadding(true);
                try {
                    const input: AddLichSuDienThoaiOfKhachHangNgheMayInput = {
                        maddk: selectedDonDangKyDto.maddk,
                        noiDungYKienKhachHang: values.noiDungYKienKhachHang,
                    };
                    await lichSuDienThoaiService.addLichSuDienThoaiOfKhachHangNgheMay(input);
                    form.resetFields();
                    message.success("Xác nhận khách hàng đã nghe máy thành công");
                    if (onDone) {
                        onDone();
                    }
                } catch (error) {
                    message.error("Lỗi khi xác nhận khách hàng đã nghe máy");
                    console.error(error);
                } finally {
                    setIsLoadding(false);
                }
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    const handleKhongNgheMay = async () => {
        setIsLoadding(true);
        try {
            const input: AddLichSuDienThoaiOfKhachHangNgheMayInput = {
                maddk: selectedDonDangKyDto.maddk,
                noiDungYKienKhachHang: "",
            };
            await lichSuDienThoaiService.addLichSuDienThoaiOfKhachHangKhongNgheMay(input);
            form.resetFields();
            message.success("Xác nhận khách hàng không nghe máy thành công");
            onDone();
        } catch (error) {
            message.error("Lỗi khi xác nhận khách hàng không nghe máy");
            console.error(error);
        } finally {
            setIsLoadding(false);
        }
    };

    return (
        <>
            <Modal
                title="Gọi điện thoại cho khách hàng"
                width="60%"
                open={open}
                footer={[
                    <Space>
                        <Button onClick={handleNgheMay} type="primary">
                            Xác nhận đã gọi
                        </Button>
                        <Button onClick={handleKhongNgheMay} type="primary" danger>
                            Khách hàng không nghe máy
                        </Button>
                        <Button
                            onClick={() => {
                                onDone();
                            }}
                        >
                            Đóng
                        </Button>
                    </Space>,
                ]}
                onCancel={() => {
                    onCancel();
                }}
            >
                <Card>
                    <Spin spinning={isLoadding}>
                        <Card title="Thông tin khách hàng">
                            {selectedDonDangKyDto && (
                                <Descriptions>
                                    <Descriptions.Item label="Mã đơn">{selectedDonDangKyDto.maddk}</Descriptions.Item>
                                    <Descriptions.Item label="Mã KV">{selectedDonDangKyDto.makv}</Descriptions.Item>
                                    <Descriptions.Item label="Tên khách hàng">
                                        {selectedDonDangKyDto.tenkh}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Địa chỉ">
                                        {selectedDonDangKyDto.diachild}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Số nhà">{selectedDonDangKyDto.sonha}</Descriptions.Item>
                                    <Descriptions.Item label="Điện thoại">
                                        {selectedDonDangKyDto.dienthoai}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Ngày đăng ký">
                                        {formatDate(selectedDonDangKyDto.ngaydk)}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Ngày HK">
                                        {formatDate(selectedDonDangKyDto.ngayhks)}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Ngày DT">
                                        {formatDate(selectedDonDangKyDto.ngaydt)}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Loại ĐK">{selectedDonDangKyDto.loaidk}</Descriptions.Item>
                                    <Descriptions.Item label="MST">{selectedDonDangKyDto.mst}</Descriptions.Item>
                                    <Descriptions.Item label="Tên KH HĐ">
                                        {selectedDonDangKyDto.tenkH_INHOADON}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Địa chỉ HĐ">
                                        {selectedDonDangKyDto.diachI_INHOADON}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Di động">{selectedDonDangKyDto.didong}</Descriptions.Item>
                                    <Descriptions.Item label="Số đăng ký">
                                        {selectedDonDangKyDto.sodangky}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="IDKH">{selectedDonDangKyDto.idkh}</Descriptions.Item>
                                    <Descriptions.Item label="Hộ khẩu thường trú">
                                        {selectedDonDangKyDto.hoKhauThuongTru}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Công việc hiện nay">
                                        {selectedDonDangKyDto.congViecHienNay}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Tên xuất hóa đơn">
                                        {selectedDonDangKyDto.tenXuatHoaDon}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="ID">{selectedDonDangKyDto.id}</Descriptions.Item>
                                </Descriptions>
                            )}
                        </Card>
                        <Card style={{ margin: 20 }} title={`Lũy kế số lần khách hàng không nghe máy: ${selectedDonDangKyDto?.luyKeSoLanKhachKhongNgheMayTrongNgay ?? 0}`}>
                            <Form {...layout} form={form} initialValues={{ ngayDangKyGhi: 3 }} layout="vertical">
                                <Form.Item
                                    name="noiDungYKienKhachHang"
                                    label="Nội dung ý kiến khách hàng"
                                    rules={[{ required: true, message: "Trường bắt buộc phải nhập!" }]}
                                >
                                    <Input.TextArea rows={5} />
                                </Form.Item>
                            </Form>
                        </Card>
                    </Spin>
                </Card>
            </Modal>
        </>
    );
});
export default DialogAddLichSuDienThoai;

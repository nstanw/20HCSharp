import { Modal, Spin, Form, message, Input, Card, Descriptions, Space, Button, Table } from "antd";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { ViewHocKyNang } from "../../../services/hocKyNang/dto/hocKyNangDto";
import hocKyNangCTService from "../../../services/hocKyNang/hocKyNangCTService";
import type { ViewHocKyNangCT } from "../../../services/hocKyNang/dto/viewHocKyNangCT";
import type { PagedResultTotalDto } from "../../../services/dto/pagedResultTotalDto";
import type { IFilterDto } from "../../../models/IFilterDto";
import columns from "./columns";

interface IXacDinhLoTrinhGhiThu {
    onDone: () => void;
    onCancel: () => void;
    open: boolean;
    selectedHocKyNangDto: ViewHocKyNang | undefined;
}

const DialogHocKyNangCT: React.FC<IXacDinhLoTrinhGhiThu> = observer(
    ({ open, onDone, onCancel, selectedHocKyNangDto }) => {
        const [isLoadding, setIsLoadding] = useState(false);
        const [form] = Form.useForm();
        const [hocKyNangCTData, setHocKyNangCTData] = useState<PagedResultTotalDto<ViewHocKyNangCT>>();

        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 24 },
        };

        // const formatDate = (date: string | undefined): string => {
        //     return date ? moment(date).format("DD/MM/yyyy") : "";
        // };

        const handleSave = async () => {
            form.validateFields()
                .then(async (values) => {
                    setIsLoadding(true);
                    try {
                        // TODO: Implement save logic for ViewHocKyNang
                        console.log("Saving ViewHocKyNang:", { ...selectedHocKyNangDto, ...values });
                        message.success("Lưu thông tin học kỹ năng thành công");
                        if (onDone) {
                            onDone();
                        }
                    } catch (error) {
                        message.error("Lỗi khi lưu thông tin học kỹ năng");
                        console.error(error);
                    } finally {
                        setIsLoadding(false);
                    }
                })
                .catch((info) => {
                    console.log("Validate Failed:", info);
                });
        };

        useEffect(() => {
            const fetchHocKyNangCTData = async () => {
                if (selectedHocKyNangDto) {
                    try {
                        let filter: IFilterDto[] = [{ property: "mahockynang", value: selectedHocKyNangDto.maHocKyNang, operator: "eq" }];
                        const data = await hocKyNangCTService.getAll({
                            filter: JSON.stringify(filter),
                        });
                        setHocKyNangCTData(data);
                    } catch (error) {
                        message.error("Lỗi khi lấy thông tin chi tiết học kỹ năng");
                        console.error(error);
                    }
                }
            };

            fetchHocKyNangCTData();
        }, [selectedHocKyNangDto]);

        const handleStartSession = async () => {
            if (selectedHocKyNangDto) {
                try {
                    // TODO: Implement start session logic using /api/services/app/HocKyNangAppServices/CreateHocKyNang
                    console.log("Starting session for ViewHocKyNang:", selectedHocKyNangDto.id);
                    message.success("Bắt đầu phiên học thành công");
                    // Refresh hocKyNangCTData after starting a new session
                    // const data = await hocKyNangCTService.getAll(selectedHocKyNangDto.id);
                    // setHocKyNangCTData(data);
                } catch (error) {
                    message.error("Lỗi khi bắt đầu phiên học");
                    console.error(error);
                }
            }
        };

        const handleEndSession = async () => {
            if (selectedHocKyNangDto) {
                try {
                    // TODO: Implement end session logic using /api/services/app/HocKyNangAppServices/HoanThanhKyNang
                    console.log("Ending session for ViewHocKyNang:", selectedHocKyNangDto.id);
                    message.success("Kết thúc phiên học thành công");
                    // Refresh hocKyNangCTData after ending a session
                    //  const data = await hocKyNangCTService.getAll(selectedHocKyNangDto.id);
                    // setHocKyNangCTData(data);
                } catch (error) {
                    message.error("Lỗi khi kết thúc phiên học");
                    console.error(error);
                }
            }
        };

        return (
            <>
                <Modal
                    title="Chi tiết học kỹ năng"
                    width="80%"
                    open={open}
                    footer={[
                        <Space>
                            <Button onClick={handleStartSession} type="primary">
                                Bắt đầu phiên học
                            </Button>
                            <Button onClick={handleEndSession} type="primary" danger>
                                Kết thúc phiên học
                            </Button>
                            <Button onClick={handleSave} type="primary">
                                Lưu
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
                            <Card title="Thông tin học kỹ năng">
                                {selectedHocKyNangDto && (
                                    <Descriptions>
                                        <Descriptions.Item label="Mã học kỹ năng">
                                            {selectedHocKyNangDto.maHocKyNang}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Tên học kỹ năng">
                                            {selectedHocKyNangDto.tenKyNang}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Mô tả">{selectedHocKyNangDto.moTa}</Descriptions.Item>
                                        <Descriptions.Item label="Thời gian học">
                                            {selectedHocKyNangDto.thoiLuong}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Trạng thái">
                                            {selectedHocKyNangDto.trangThai ? "Hoạt động" : "Không hoạt động"}
                                        </Descriptions.Item>
                                        {/* Add more descriptions for other properties of ViewHocKyNang */}
                                    </Descriptions>
                                )}
                            </Card>
                            <Card style={{ margin: 20 }} title="Chi tiết các phiên học">
                                <Table
                                    columns={columns}
                                    dataSource={hocKyNangCTData === undefined ? [] : hocKyNangCTData.items}
                                />
                            </Card>
                            <Card style={{ margin: 20 }} title="Ghi chú">
                                <Form {...layout} form={form} layout="vertical">
                                    <Form.Item name="ghiChu" label="Ghi chú">
                                        <Input.TextArea rows={5} />
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Spin>
                    </Card>
                </Modal>
            </>
        );
    }
);
export default DialogHocKyNangCT;

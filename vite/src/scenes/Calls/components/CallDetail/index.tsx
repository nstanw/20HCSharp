import { useParams } from "react-router-dom";
import { Descriptions, Col, Card, Row, Spin, Tag, Tabs, Popover, Button } from "antd";
import React, { useState } from "react";
import Moment from "moment";
import TiepNhanThongTinOfLinkedIDs from "../../../TiepNhanThongTins/listOfLinkedID";
import TiepNhanThongTinOfSoDienThoais from "../../../TiepNhanThongTins/listOfSoDienThoai";
import { useStore } from "../../../../helpers/use-store";
import { observer } from "mobx-react";
import NoiDungCuocGoi from "../NoiDungCuocGoi";
import AddTiepNhanThongTin from "../AddTiepNhanThongTin";
import { PlusOutlined } from "@ant-design/icons";
import CallHistoriesOfSoDienThoai from "../CallHistoriesOfSoDienThoais";
import DonDangKyOfSoDienThoais from "../DonDangKyOfSoDienThoais";
import KhachHangOfSoDienThoais from "../KhachHangOfSoDienThoais";

export interface IPaneTab {
    title: string;
    content: any;
    key: string;
}
const TabPane = Tabs.TabPane;
const CallDetail = observer(() => {
    const { asteriskStore, sessionStore } = useStore();
    const { callLogModel } = asteriskStore;
    const { linkedid } = useParams<{ linkedid: string }>();
    const [panes, setPanes] = useState<IPaneTab[]>([]);
    const [activeKey, setTabActive] = React.useState("1");
    React.useEffect(() => {
        sessionStore.title = "Chi tiết cuộc gọi";
        sessionStore.subTitle = "";
    }, []);
    React.useEffect(() => {
        (async function run() {
            await asteriskStore.get(linkedid!);
        })();
    }, [asteriskStore, linkedid]);

    const add = () => {
        var pannes2 = Object.assign([], panes);
        if (pannes2.length === 0 && !!linkedid) {
            let addNewTab: IPaneTab = {
                title: "Thêm mới yêu cầu",
                content: (
                    <AddTiepNhanThongTin
                        linkedID={linkedid}
                        soDienThoai={callLogModel ? callLogModel.soDienThoaiKhachHang : ""}
                        tenKhachHang={callLogModel ? callLogModel.hoTenKhachHang : ""}
                        onSuccess={() => {
                            setPanes([]);
                            setTabActive("1");
                        }}
                    ></AddTiepNhanThongTin>
                ),
                key: "6",
            };
            pannes2.push(addNewTab);
            setPanes(pannes2);
        }
        setTabActive("6");
    };
    return (
        <Col>
            <Card>
                <Row>
                    <Spin spinning={callLogModel === undefined ? true : false}>
                        <Descriptions size="middle" column={{ xxl: 3, xl: 3, lg: 2, md: 1, sm: 1, xs: 1 }}>
                            <Descriptions.Item label={<Tag>Số điện thoại</Tag>}>
                                <Tag color="magenta">{callLogModel.soDienThoaiKhachHang}</Tag>
                            </Descriptions.Item>

                            <Descriptions.Item label={<Tag>Họ tên khách hàng</Tag>}>
                                <Popover
                                    overlayStyle={{
                                        width: 500,
                                    }}
                                    placement="topLeft"
                                    title="Cập nhật thông tin gọi đến"
                                    content={<NoiDungCuocGoi model={callLogModel}></NoiDungCuocGoi>}
                                    trigger="click"
                                >
                                    <a>{callLogModel.hoTenKhachHang || "Cập nhật"}</a>
                                </Popover>
                            </Descriptions.Item>
                            <Descriptions.Item label={<Tag>Nội dung yêu cầu</Tag>}>
                                <Popover
                                    overlayStyle={{
                                        width: 500,
                                    }}
                                    placement="topLeft"
                                    title="Cập nhật thông tin gọi đến"
                                    content={<NoiDungCuocGoi model={callLogModel}></NoiDungCuocGoi>}
                                    trigger="click"
                                >
                                    <a>{callLogModel.noiDungYeuCau || "Cập nhật"}</a>
                                </Popover>
                            </Descriptions.Item>
                            <Descriptions.Item label={<Tag>Thời gian gọi</Tag>}>
                                {Moment(callLogModel.thoiGianGoi).format("DD/MM/YYYY HH:ss")}
                            </Descriptions.Item>
                            <Descriptions.Item label={<Tag>Status</Tag>}>
                                {callLogModel.trangThaiCuocGoi === "TiepNhan" ? (
                                    <Tag color="red">Tiếp nhận chưa tạo yêu cầu</Tag>
                                ) : callLogModel.trangThaiCuocGoi === "Huy" ? (
                                    <Tag color="red">Hủy yêu cầu</Tag>
                                ) : callLogModel.trangThaiCuocGoi === "DangXuLy" ? (
                                    <Tag color="blue">Đang gửi xử lý</Tag>
                                ) : callLogModel.trangThaiCuocGoi === "HoanThanh" ? (
                                    <Tag color="green">Hoàn thành</Tag>
                                ) : (
                                    <Tag color="red">Chưa cập nhật</Tag>
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item>
                                <Button type="primary" onClick={() => add()} icon={<PlusOutlined />}>
                                    Thêm mới nội dung tiếp nhận
                                </Button>
                            </Descriptions.Item>
                        </Descriptions>
                    </Spin>
                </Row>
                <Row style={{ marginTop: 10 }}>
                    <div>
                        <Tabs hideAdd type="editable-card" activeKey={activeKey} onChange={(activeKey) => setTabActive(activeKey)}>
                            <TabPane tab="Thông tin đã tiếp nhận của cuộc gọi" key="1">
                                <TiepNhanThongTinOfLinkedIDs linkedid={callLogModel.linkedid}></TiepNhanThongTinOfLinkedIDs>
                            </TabPane>
                            <TabPane tab="Thông tin đã tiếp nhận trước đó theo số điện thoại" key="2">
                                <TiepNhanThongTinOfSoDienThoais soDienThoai={callLogModel.soDienThoaiKhachHang}></TiepNhanThongTinOfSoDienThoais>
                            </TabPane>
                            <TabPane tab="Thông tin khách hàng liên quan" key="3">
                                <Tabs>
                                    <TabPane tab="Khách hàng" key="3_1">
                                        <KhachHangOfSoDienThoais soDienThoai={callLogModel.soDienThoaiKhachHang}></KhachHangOfSoDienThoais>
                                    </TabPane>
                                    <TabPane tab="Đơn đăng ký" key="3_2">
                                        <DonDangKyOfSoDienThoais soDienThoai={callLogModel.soDienThoaiKhachHang} />
                                    </TabPane>
                                </Tabs>
                            </TabPane>
                            <TabPane tab="Lịch sử cuộc gọi" key="4">
                                <CallHistoriesOfSoDienThoai soDienThoai={callLogModel.soDienThoaiKhachHang} />
                            </TabPane>
                            {panes.map((pane) => (
                                <TabPane tab={pane.title} key={pane.key}>
                                    {pane.content}
                                </TabPane>
                            ))}
                        </Tabs>
                    </div>
                </Row>
            </Card>
        </Col>
    );
});
export default CallDetail;

import { useParams } from "react-router-dom";
import { Col, Card, Row, Tabs, Divider } from "antd";
import React from "react";
import { observer } from "mobx-react";
import TiepNhanThongTinOfSoDienThoais from "../../TiepNhanThongTins/listOfSoDienThoai";
import { useStore } from "../../../helpers/use-store";
import CallHistoriesOfSoDienThoai from "../../Calls/components/CallHistoriesOfSoDienThoais";
import DonDangKyOfSoDienThoais from "../../Calls/components/DonDangKyOfSoDienThoais";
import KhachHangOfSoDienThoais from "../../Calls/components/KhachHangOfSoDienThoais";

export interface IPaneTab {
    title: string;
    content: any;
    key: string;
}
const TabPane = Tabs.TabPane;
const DetailKhachHang = observer(() => {
    const { sessionStore } = useStore();
    const { sdt } = useParams<{ sdt: string }>();
    React.useEffect(() => {
        sessionStore.title = "Lịch sử gọi";
        sessionStore.subTitle = "";
        console.log(sdt);
    }, []);

    return (
        <Col>
            <Card>
                <Row style={{ marginTop: 10 }}>
                    <div>
                        <Tabs>
                            <TabPane tab="Khách hàng" key="3_1">
                                <KhachHangOfSoDienThoais soDienThoai={sdt}></KhachHangOfSoDienThoais>
                            </TabPane>
                            <TabPane tab="Đơn đăng ký" key="3_2">
                                <DonDangKyOfSoDienThoais soDienThoai={sdt} />
                            </TabPane>
                        </Tabs>

                        <Divider style={{ marginTop: 10 }}>Thông tin đã tiếp nhận trước đó theo số điện thoại</Divider>
                        <TiepNhanThongTinOfSoDienThoais soDienThoai={sdt}></TiepNhanThongTinOfSoDienThoais>
                        <Divider style={{ marginTop: 10 }}>Lịch sử cuộc gọi</Divider>
                        <CallHistoriesOfSoDienThoai soDienThoai={sdt} />
                    </div>
                </Row>
            </Card>
        </Col>
    );
});
export default DetailKhachHang;

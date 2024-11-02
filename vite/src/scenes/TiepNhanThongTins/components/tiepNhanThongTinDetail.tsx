import { useParams } from "react-router-dom";
import { Descriptions, Col, Card, Row, Spin, Tag, Timeline, List, Tooltip, Avatar, Typography } from "antd";
import React, { useState } from "react";
import { observer } from "mobx-react";
import { useStore } from "../../../helpers/use-store";
import moment from "moment";
import ViewTiepNhanThongTinModel from "../../../models/TiepNhanThongTins/tiepNhanThongTinModel";
import tiepNhanThongTinServices from "../../../services/tiepNhanThongTin/tiepNhanThongTinServices";
const { Text } = Typography;

export interface IPaneTab {
    title: string;
    content: any;
    key: string;
}

const TiepNhanThongTinDetail = observer(() => {
    const { tiepNhanThongTinStore, sessionStore, phieuYeuCauLogStore } = useStore();
    const { tiepNhanThongTinID } = useParams();
    //const { viewTiepNhanThongTinModel } = tiepNhanThongTinStore;
    const { phieuYeuCauLogs } = phieuYeuCauLogStore;
    const { congViecPhieuYeuCaus } = phieuYeuCauLogStore;
    const [isLoadding, setIsLoadding] = useState(true);
    const [isLoaddingPhieuYeuCauLog, setIsLoaddingPhieuYeuCauLog] = useState(false);
    const [isLoaddingCongViecPhieuYeuCaus, setIsLoaddingCongViecPhieuYeuCaus] = useState(false);
    const [viewTiepNhanThongTinModel, setViewTiepNhanThongTinModel] = useState(new ViewTiepNhanThongTinModel());

    React.useEffect(() => {
        sessionStore.title = "Chi tiết yêu cầu xử lý";
        sessionStore.subTitle = "";
        phieuYeuCauLogs.result = { count: 0, items: [] };
        congViecPhieuYeuCaus.result = { count: 0, items: [] };
    }, []);
    React.useEffect(() => {
        (async function run() {
            setIsLoadding(true);
            var item = await tiepNhanThongTinServices.get(tiepNhanThongTinID!);
            setViewTiepNhanThongTinModel(item.result);
            console.log("run -> item", item.result);

            // await tiepNhanThongTinStore.get(tiepNhanThongTinID!);
            // sessionStore.subTitle = viewTiepNhanThongTinModel.soDienThoaiKhachHang;
            //console.log('run1 -> viewTiepNhanThongTinModel', item);
            // console.log("run -> viewTiepNhanThongTinModel.phieuYeuCauID", viewTiepNhanThongTinModel.phieuYeuCauID)
            setIsLoadding(false);
        })();
    }, [tiepNhanThongTinStore, tiepNhanThongTinID]);

    React.useEffect(() => {
        (async function run() {
            if (viewTiepNhanThongTinModel.phieuYeuCauID) {
                setIsLoaddingCongViecPhieuYeuCaus(true);
                setIsLoaddingPhieuYeuCauLog(true);
                await phieuYeuCauLogStore.getAll(viewTiepNhanThongTinModel.phieuYeuCauID);
                setIsLoaddingPhieuYeuCauLog(false);
                await phieuYeuCauLogStore.getAllCongViecPhieuYeuCau(viewTiepNhanThongTinModel.phieuYeuCauID);
                setIsLoaddingCongViecPhieuYeuCaus(false);
            } else {
                phieuYeuCauLogs.result = { count: 0, items: [] };
                congViecPhieuYeuCaus.result = { count: 0, items: [] };
            }
        })();
    }, [viewTiepNhanThongTinModel]);

    return (
        <Col>
            <Card>
                <Row>
                    <Spin spinning={isLoadding}>
                        {/* Thông tin người gọi điện thoại */}
                        <Descriptions
                            title="Thông tin tiếp nhận ban đầu"
                            column={{ xxl: 3, xl: 3, lg: 2, md: 1, sm: 1, xs: 1 }}
                        >
                            <Descriptions.Item label={<Tag>Số điện thoại</Tag>}>
                                <Tag color="magenta">{viewTiepNhanThongTinModel.soDienThoaiKhachHang}</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label={<Tag>Họ tên khách hàng</Tag>}>
                                {viewTiepNhanThongTinModel.hoTenNguoiBaoTin}
                            </Descriptions.Item>
                            <Descriptions.Item label={<Tag>Nội dung yêu cầu</Tag>}>
                                {viewTiepNhanThongTinModel.noiDungTomTat}
                            </Descriptions.Item>
                        </Descriptions>
                        {/* Thông tin người yêu cầu */}
                        <Descriptions
                            title="Thông tin yêu cầu xử lý"
                            column={{ xxl: 3, xl: 3, lg: 2, md: 1, sm: 1, xs: 1 }}
                        >
                            <Descriptions.Item label={<Tag>Họ tên khách hàng</Tag>}>
                                {viewTiepNhanThongTinModel.hoTenKhachHang}
                            </Descriptions.Item>
                            <Descriptions.Item label={<Tag>Nội dung yêu cầu</Tag>}>
                                {viewTiepNhanThongTinModel.noiDungYeuCau}
                            </Descriptions.Item>
                            <Descriptions.Item label={<Tag>Địa chỉ</Tag>}>
                                {viewTiepNhanThongTinModel.diaChiLamViec}
                            </Descriptions.Item>
                            <Descriptions.Item label={<Tag>Ghi chú</Tag>}>
                                {viewTiepNhanThongTinModel.ghiChu}
                            </Descriptions.Item>
                            <Descriptions.Item label={<Tag>Đơn vị xử lý</Tag>}>
                                {viewTiepNhanThongTinModel.tenpb}
                            </Descriptions.Item>
                            <Descriptions.Item label={<Tag>Status</Tag>}>
                                {viewTiepNhanThongTinModel.trangThai === "TiepNhan" ? (
                                    <Tag color="red">Tiếp nhận chưa tạo yêu cầu</Tag>
                                ) : viewTiepNhanThongTinModel.trangThai === "ChoTiepNhan" ? (
                                    <Tag color="#f50">Chờ tiếp nhận</Tag>
                                ) : viewTiepNhanThongTinModel.trangThai === "Huy" ? (
                                    <Tag color="red">Hủy yêu cầu</Tag>
                                ) : viewTiepNhanThongTinModel.trangThai === "DangXuLy" ? (
                                    <Tag color="blue">Đang gửi xử lý</Tag>
                                ) : viewTiepNhanThongTinModel.trangThai === "HoanThanh" ? (
                                    <Tag color="green">Hoàn thành</Tag>
                                ) : (
                                    <Tag color="red">Chưa cập nhật</Tag>
                                )}
                            </Descriptions.Item>
                        </Descriptions>
                    </Spin>
                </Row>
                <Row>
                    <Col span={12}>
                        <h4>Trạng thái xử lý</h4>
                        <Spin spinning={isLoaddingCongViecPhieuYeuCaus}>
                            <Timeline style={{ width: "100%", paddingTop: 10 }}>
                                {congViecPhieuYeuCaus.result?.items.map((item) => {
                                    return (
                                        <Timeline.Item
                                            key={item?.congViecPhieuYeuCauID}
                                            color={item.trangThaiXuLy === "HoanThanh" ? "green" : "gray"}
                                        >
                                            <p>
                                                {moment(item.thoiGianBatDau)
                                                    .subtract(1, "days")
                                                    .format("DD-MM-YYYY HH:mm:ss")}
                                            </p>
                                            <p>{item.moTaYeuCau}</p>
                                            <p>{item.moTaKetQua}</p>
                                        </Timeline.Item>
                                    );
                                })}
                            </Timeline>
                        </Spin>
                    </Col>
                    <Col span={12}>
                        <h4>Thông tin cập nhật</h4>
                        <Spin spinning={isLoaddingPhieuYeuCauLog}>
                            <List
                                className="comment-list"
                                itemLayout="horizontal"
                                dataSource={phieuYeuCauLogs.result ? phieuYeuCauLogs.result!.items : undefined}
                                renderItem={(item) => (
                                    <li>
                                        <Card style={{ marginBottom: 16 }}>
                                            <Card.Meta
                                                avatar={
                                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                                }
                                                title={<a>{item.creatorBy}</a>}
                                                description={
                                                    <>
                                                        <div>
                                                            {item.noiDung} {/* Phần nội dung comment */}
                                                        </div>
                                                        <Tooltip
                                                            title={moment(item.creationTime)
                                                                .subtract(1, "days")
                                                                .format("DD-MM-YYYY HH:mm:ss")}
                                                        >
                                                            <Text type="secondary">
                                                                {moment(item.creationTime)
                                                                    .subtract(1, "days")
                                                                    .fromNow()}
                                                            </Text>
                                                        </Tooltip>
                                                    </>
                                                }
                                            />
                                        </Card>
                                    </li>
                                )}
                            />
                        </Spin>
                    </Col>
                </Row>
            </Card>
        </Col>
    );
});
export default TiepNhanThongTinDetail;

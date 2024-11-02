import { Button, Card, Col, Descriptions, Row, Table } from "antd";
import { observer } from "mobx-react";
import moment from "moment";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../helpers/use-store";
import ViewLapDatMoi2 from "../../../models/LapDatMois/ViewLapDatMoi2";
import LapDatMoiDetailThongTinKhachHang from "../components/thongTinKhachHang";
import LapDatMoiDetailThongTinTuToTNTT from "../components/thongTinTuToTNTT";
import LapDatMoiDetailTrangThaiXuLy from "../components/trangThaiXuLy";
import lapDatMoiBieu02Columns from "./columns";
import LapDatMoiBieu02Searchs from "./search";

const LapDatMoiTraCuuDons = observer(() => {
    const { lapDatMoiStore, sessionStore } = useStore();
    const { traCuuDonLapDatMois } = lapDatMoiStore;
    const navigate = useNavigate();

    const [pageSize, setPageSize] = React.useState(20);
    const [skipCount, setSkipCount] = React.useState(0);

    const handleOnRow = (record: ViewLapDatMoi2) => {
        navigate("/LapDatMois/" + record.maddk);
    };
    React.useEffect(() => {
        sessionStore.title = "Tra cứu đơn lắp đặt mới";
        sessionStore.subTitle = "";
        return function clearUp() {
            traCuuDonLapDatMois.q = "";
            traCuuDonLapDatMois.filter = "";
            traCuuDonLapDatMois.result = undefined;
        };
    }, []);
    React.useEffect(() => {
        (async function run() {
            traCuuDonLapDatMois.sizePage = pageSize;
            traCuuDonLapDatMois.skipCount = skipCount;
            await lapDatMoiStore.getTraCuuDonLapDatMois();
        })();
    }, [lapDatMoiStore, skipCount, pageSize]);

    return (
        <Card>
            <LapDatMoiBieu02Searchs />

            <Row style={{ marginTop: 20 }}>
                <Col span={24}>
                    <Table
                        rowKey={(record) => `lapDatMoiTraCUuDon${record.id}`}
                        bordered={true}
                        pagination={{
                            pageSize: pageSize,
                            total: traCuuDonLapDatMois.result === undefined ? 0 : traCuuDonLapDatMois.result.count,
                            defaultCurrent: 1,
                        }}
                        rowClassName={(record) => {
                            // chưa hoàn thành công việc thiết kế
                            if (record.ttdk === "DK_A" && record.tttk !== "TK_A") {
                                if (moment.duration(moment(Date.now()).diff(moment(record.ngaydk))).asHours() > 49) {
                                    return "data-row red-3";
                                }
                            }
                            // neu da phan cong nhan vien ky thuat thi chuyen sang mau vang
                            // if (record.nv_khaosat_manv) {
                            //     return "data-row orange-3";
                            // }
                            return "data-row";
                        }}
                        expandable={{
                            expandedRowRender: (record) => (
                                <>
                                    <LapDatMoiDetailThongTinKhachHang lapDatMoiDetail={record} />
                                    <LapDatMoiDetailThongTinTuToTNTT lapDatMoiDetail={record} />
                                    <Descriptions title="Quyền sử dụng đất">
                                        <Descriptions.Item label="Loại giấy chứng nhận">
                                            {record.qsddaT_LoaiGiayChungNhan}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Số giấy chứng nhận">
                                            {record.qsddaT_SoGiayChungNhan}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Ngày cấp">
                                            {moment(record.qsddaT_NgayCap).format("DD/MM/YYYY HH:mm")}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Họ tên">{record.qsddaT_HoTen}</Descriptions.Item>
                                        <Descriptions.Item label="Địa chỉ lô đất">
                                            {record.qsddaT_DiaChiLoDat}
                                        </Descriptions.Item>
                                    </Descriptions>
                                    <Descriptions title="Thông tin khác">
                                        <Descriptions.Item label="Loại lắp đặt">
                                            {record.hinhThucLapDat}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Nhu cầu sử dụng nước">
                                            {record.nhuCauSuDungNuoc}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Mục đích sử dụng nước">
                                            {record.mucDichSuDungNuoc}
                                        </Descriptions.Item>
                                        {/* <Descriptions.Item label="Thời gian KH cần lắp mới">
                                            {moment(record.thoiGianKhachHangCanLapMoi).format("DD/MM/YYYY")}
                                        </Descriptions.Item> */}
                                        <Descriptions.Item label="Thời gian tổ trưởng tổ 2 nhận TT">
                                            {moment(record.ngaydk).format("DD/MM/YYYY HH:mm")}
                                        </Descriptions.Item>
                                        {/* <Descriptions.Item label="Nhân viên khảo sát">
                                            {record.nv_khaosat_hoten}
                                        </Descriptions.Item> */}
                                        <Descriptions.Item label="Số ngày đã hoàn thành khảo sát">
                                            {moment
                                                .duration(moment(Date.now()).diff(moment(record.ngayhks)))
                                                .asDays()
                                                .toFixed()}
                                        </Descriptions.Item>
                                    </Descriptions>
                                    <LapDatMoiDetailTrangThaiXuLy lapDatMoiDetail={record} />
                                    <Button
                                        type="link"
                                        onClick={() => {
                                            handleOnRow(record);
                                        }}
                                    >
                                        Xem chi tiết
                                    </Button>
                                </>
                            ),
                            expandRowByClick: true,
                        }}
                        columns={lapDatMoiBieu02Columns}
                        loading={traCuuDonLapDatMois.isLoadding}
                        dataSource={traCuuDonLapDatMois.result === undefined ? [] : traCuuDonLapDatMois.result.items}
                        onChange={(pagination: any) => {
                            setPageSize(pagination.pageSize);
                            setSkipCount((pagination.current - 1) * pageSize!);
                        }}
                        onRow={(record) => ({
                            onDoubleClick: () => {
                                handleOnRow(record);
                            },
                        })}
                    />
                </Col>
            </Row>
        </Card>
    );
});
export default LapDatMoiTraCuuDons;

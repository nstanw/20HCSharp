import { useParams } from "react-router-dom";
import { Col, Card, Row, Spin } from "antd";
import React, { useState } from "react";
import { observer } from "mobx-react";
import { useStore } from "../../../helpers/use-store";
import "./index.css";
import LapDatMoiDetailThongTinKhachHang from "../components/thongTinKhachHang";
import LapDatMoiDetailThongTinDuDieuKienLapDat from "./thongTinDuDieuKienLapDat";
import LapDatMoiDetailThongTinKhongDuDieuKienLapDat from "./thongTinKhongDuDieuKienLapDat";
import LapDatMoiDetailThongTinChoLapDat from "./thongTinChoLapDat";
import LapDatMoiDetailTrangThaiXuLy from "../components/trangThaiXuLy";
import LapDatMoiDetailThongTinTuToTNTT from "../components/thongTinTuToTNTT";
import LapDatMoiDetailThongTinThoiGianKhaoSat from "../components/thongTinThoiGianKhaoSat";
import PhieuYeuCauLogs from "../../../components/PhieuYeuCaus/phieuYeuCauLogs";
import PhieuYeuCauCongViecs from "../../../components/PhieuYeuCaus/phieuYeuCauCongViecs";

const LapDatMoiDetail = observer(() => {
    const { lapDatMoiStore, sessionStore } = useStore();
    const { maddk } = useParams<{ maddk: string }>();
    const { lapDatMoiDetail } = lapDatMoiStore;
    const [isLoadding, setIsLoadding] = useState(true);
    React.useEffect(() => {
        sessionStore.title = "Biên bản kiểm tra hiện trường và dự toán";
        sessionStore.subTitle = "";
        document.title = "Biên bản kiểm tra hiện trường và dự toán";
    }, []);

    React.useEffect(() => {
        (async function run() {
            setIsLoadding(true);
            await lapDatMoiStore.getViewLapDatMoi(maddk!);
            setIsLoadding(false);
        })();
    }, [maddk]);

    return (
        <Card>
            <Col>
                <Row>
                    <Spin spinning={isLoadding}>
                        <LapDatMoiDetailTrangThaiXuLy lapDatMoiDetail={lapDatMoiDetail} />
                        <LapDatMoiDetailThongTinThoiGianKhaoSat lapDatMoiDetail={lapDatMoiDetail} />
                        <LapDatMoiDetailThongTinTuToTNTT lapDatMoiDetail={lapDatMoiDetail} />
                        <LapDatMoiDetailThongTinKhachHang lapDatMoiDetail={lapDatMoiDetail} />
                        <LapDatMoiDetailThongTinDuDieuKienLapDat lapDatMoiDetail={lapDatMoiDetail} />
                        <LapDatMoiDetailThongTinKhongDuDieuKienLapDat lapDatMoiDetail={lapDatMoiDetail} />
                        <LapDatMoiDetailThongTinChoLapDat lapDatMoiDetail={lapDatMoiDetail} />
                    </Spin>
                </Row>
                <Row>
                    <Col span={12}>
                        <PhieuYeuCauCongViecs phieuYeuCauID={lapDatMoiDetail.phieuYeuCauID} />
                    </Col>
                    <Col span={12}>
                        <PhieuYeuCauLogs phieuYeuCauID={lapDatMoiDetail.phieuYeuCauID}></PhieuYeuCauLogs>
                    </Col>
                </Row>
            </Col>
        </Card>
    );
});
export default LapDatMoiDetail;

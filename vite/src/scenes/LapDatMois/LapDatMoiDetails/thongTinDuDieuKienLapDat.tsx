import { Descriptions } from "antd";
import { observer } from "mobx-react";
import moment from "moment";
import "./index.css";
import { ILapDatMoiDto } from "../dtos/lapDatMoiDto";

export interface IPaneTab {
    title: string;
    content: any;
    key: string;
}

const LapDatMoiDetailThongTinDuDieuKienLapDat = observer(({ lapDatMoiDetail }: ILapDatMoiDto) => {
    var content = <></>;
    if (lapDatMoiDetail.ttct == "CT_A") {
        var qsddat = lapDatMoiDetail.chiphI_KH ? (
            <></>
        ) : (
            <>
                <br />
                Loại giấy chứng nhận: {lapDatMoiDetail?.qsddaT_LoaiGiayChungNhan}
                <br />
                Họ tên: {lapDatMoiDetail?.qsddaT_HoTen}
                <br />
                Địa chỉ lô đất: {lapDatMoiDetail?.qsddaT_DiaChiLoDat}
                <br />
                Số giấy chứng nhận: {lapDatMoiDetail?.qsddaT_SoGiayChungNhan}
                <br />
                Ngày cấp: {moment(lapDatMoiDetail?.qsddaT_NgayCap).format("DD/MM/YYYY")}
                <br />
                Nội dung khác: {lapDatMoiDetail?.qsddaT_NoiDungKhac}
            </>
        );
        content = (
            <Descriptions
                style={{ paddingTop: 10 }}
                className="ldm_description"
                bordered={true}
                title="Kết quả khảo sát"
                column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
            >
                <Descriptions.Item label="Nhu cầu sử dụng nước">{lapDatMoiDetail?.nhuCauSuDungNuoc}</Descriptions.Item>
                <Descriptions.Item label="Lịch sử dùng nước">{lapDatMoiDetail?.hinhThucLapDat}</Descriptions.Item>
                <Descriptions.Item label="Mục đích sử dụng nước">
                    {lapDatMoiDetail?.mucDichSuDungNuoc}
                </Descriptions.Item>
                {/* <Descriptions.Item label="Vị trí cấp nguồn">
                    Chủ sở hữu: {lapDatMoiDetail?.nguoN_ChuSoHuu}
                    <br />
                    Kích thước: {lapDatMoiDetail?.nguoN_KICHTHUOC}
                </Descriptions.Item> */}
                <Descriptions.Item label="Quyền sử dụng đất">
                    {lapDatMoiDetail?.chiphI_KH ? "Chi phí khách hàng" : "Chi phí công ty"}
                    {qsddat}
                </Descriptions.Item>
            </Descriptions>
        );
    }
    return content;
});
export default LapDatMoiDetailThongTinDuDieuKienLapDat;

import { Descriptions } from "antd";
import { observer } from "mobx-react";
import { ILapDatMoiDto } from "../dtos/lapDatMoiDto";

const LapDatMoiDetailThongTinTuToTNTT = observer(({ lapDatMoiDetail }: ILapDatMoiDto) => {
    return (
        <>
            <Descriptions
                style={{ paddingTop: 10, display: lapDatMoiDetail?.tttk === "TK_A" ? "none" : "" }}
                title="Thông tin từ tổ TNTT"
                column={{ xxl: 3, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
            >
                <Descriptions.Item label={<>Họ và tên</>}>{lapDatMoiDetail?.tenkh}</Descriptions.Item>
                <Descriptions.Item label={<>Địa chỉ lắp đặt</>}>{lapDatMoiDetail?.diachild}</Descriptions.Item>
                <Descriptions.Item label={<>Địa chỉ thường trú</>}>
                    {lapDatMoiDetail?.hoKhauThuongTru}
                </Descriptions.Item>
                <Descriptions.Item label={<>Số điện thoại liên lạc</>}>{lapDatMoiDetail?.didong}</Descriptions.Item>
                <Descriptions.Item label={<>Số CMND</>}>{lapDatMoiDetail?.cmnd}</Descriptions.Item>
                <Descriptions.Item label={<>Số CMND</>}>{lapDatMoiDetail?.nhuCauSuDungNuoc}</Descriptions.Item>
                <Descriptions.Item label={<>Số CMND</>}>{lapDatMoiDetail?.mucDichSuDungNuoc}</Descriptions.Item>
                <Descriptions.Item label={<>Quyền sử dụng đất</>}>
                    {lapDatMoiDetail?.qsddaT_LoaiGiayChungNhan}
                </Descriptions.Item>
            </Descriptions>
        </>
    );
});
export default LapDatMoiDetailThongTinTuToTNTT;

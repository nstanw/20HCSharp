import { Descriptions } from "antd";
import { observer } from "mobx-react";
import moment from "moment";
import { ILapDatMoiDto } from "../dtos/lapDatMoiDto";

const LapDatMoiDetailThongTinKhachHang = observer(({ lapDatMoiDetail }: ILapDatMoiDto) => {
    return (
        <>
            <div style={{ paddingTop: 10, display: lapDatMoiDetail?.tttk === "TK_A" ? "" : "none" }}>
                <Descriptions
                    style={{ paddingTop: 10 }}
                    title="Thông tin khách hàng"
                    column={{ xxl: 3, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                >
                    <Descriptions.Item label={<>Họ và tên</>}>{lapDatMoiDetail?.tenkh}</Descriptions.Item>
                    <Descriptions.Item label={<>Địa chỉ thường trú</>}>
                        {lapDatMoiDetail?.hoKhauThuongTru}
                    </Descriptions.Item>
                    <Descriptions.Item label={<>Số điện thoại liên lạc</>}>{lapDatMoiDetail?.didong}</Descriptions.Item>
                    <Descriptions.Item label={<>Số CMND</>}>{lapDatMoiDetail?.cmnd}</Descriptions.Item>
                    <Descriptions.Item label={<>Ngày cấp CMND</>}>
                        {moment(lapDatMoiDetail?.ngaycapcmnd).format("DD/MM/YYYY")}
                    </Descriptions.Item>
                    <Descriptions.Item label={<>Nơi cấp CMND</>}>{lapDatMoiDetail?.noicapcmnd}</Descriptions.Item>
                </Descriptions>
                <Descriptions
                    style={{ paddingTop: 10 }}
                    title="Thông tin hóa đơn"
                    column={{ xxl: 3, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                >
                    <Descriptions.Item label="Tên đơn vị">{lapDatMoiDetail?.tenkH_INHOADON}</Descriptions.Item>
                    <Descriptions.Item label="Mã số thuế">{lapDatMoiDetail?.mst}</Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ">{lapDatMoiDetail?.diachI_INHOADON}</Descriptions.Item>
                </Descriptions>
                <Descriptions
                    style={{ paddingTop: 10 }}
                    title="Địa chỉ lắp đặt"
                    column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                >
                    <Descriptions.Item label="Địa chỉ lắp đặt">{lapDatMoiDetail?.diachild}</Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
});
export default LapDatMoiDetailThongTinKhachHang;

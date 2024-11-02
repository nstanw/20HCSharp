import { Descriptions } from "antd";
import { observer } from "mobx-react";
import moment from "moment";
import { ILapDatMoiDto } from "../dtos/lapDatMoiDto";

const LapDatMoiDetailThongTinThoiGianKhaoSat = observer(({ lapDatMoiDetail }: ILapDatMoiDto) => {
    return (
        <>
            <Descriptions
                className="ldm_description"
                bordered={true}
                style={{ paddingTop: 10 }}
                title="Thực hiện khảo sát"
                column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
            >
                <Descriptions.Item label={<>Thời gian tổ trưởng tổ 2 nhận tin</>}>
                    {moment(lapDatMoiDetail?.ngaydk).format("DD/MM/YYYY HH:mm")}
                </Descriptions.Item>
                {/* <Descriptions.Item label={<>Thời gian nhân viên kỹ thuật nhận tin báo</>}>
                    {moment(lapDatMoiDetail?.thoiGianTo2NhanTin).format("DD/MM/YYYY HH:mm")}
                </Descriptions.Item>
                <Descriptions.Item label="Nhân viên kỹ thuật">{lapDatMoiDetail?.nv_khaosat_hoten}</Descriptions.Item> */}
                <Descriptions.Item label="Số điện thoại"> </Descriptions.Item>
            </Descriptions>
        </>
    );
});
export default LapDatMoiDetailThongTinThoiGianKhaoSat;

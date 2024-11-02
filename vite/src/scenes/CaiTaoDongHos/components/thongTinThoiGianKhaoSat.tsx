import { Descriptions } from "antd";
import { observer } from "mobx-react";
import moment from "moment";

interface IProps {
    caiTaoDongHoDetail: any;
}

const CaiTaoDongHoDetailThongTinThoiGianKhaoSat = observer(({ caiTaoDongHoDetail }: IProps) => {
    return (
        <>
            <Descriptions
                className="ldm_description"
                style={{ paddingTop: 10 }}
                title="Thực hiện khảo sát"
                column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }}
            >
                <Descriptions.Item label={<>Mã đơn</>}>
                    {moment(caiTaoDongHoDetail?.maddk).format("DD/MM/YYYY HH:mm")}
                </Descriptions.Item>
                <Descriptions.Item label={<>Thời gian TP.KT nhận tin</>}>
                    {moment(caiTaoDongHoDetail?.ngaydk).format("DD/MM/YYYY HH:mm")}
                </Descriptions.Item>
                <Descriptions.Item label="Nhân viên kỹ thuật">{caiTaoDongHoDetail?.nv_khaosat_hoten}</Descriptions.Item>
                <Descriptions.Item label="Số điện thoại"> </Descriptions.Item>
            </Descriptions>
        </>
    );
});
export default CaiTaoDongHoDetailThongTinThoiGianKhaoSat;

import { Descriptions } from "antd";
import { observer } from "mobx-react";
import moment from "moment";

interface IKetQuaNghiemThuLapDatLapDatMoiProps {
    lapDatMoiDetail: any;
    quyetToan: any;
}

const KetQuaNghiemThuLapDatLapDatMoi = observer(({ lapDatMoiDetail, quyetToan }: IKetQuaNghiemThuLapDatLapDatMoiProps) => {
    var content = <></>;
    if (lapDatMoiDetail.ttqt === "QT_A" || lapDatMoiDetail.ttqt === "QT_P") {
        content = (
            <Descriptions
                style={{ paddingTop: 10 }}
                className="ldm_description"
                bordered={true}
                title="Kết quả nghiệm thu lắp đặt"
                column={{ xxl: 3, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
            >
                <Descriptions.Item label="Thời gian nghiệm thu">{moment(quyetToan?.ngayqt).format("DD/MM/YYYY")}</Descriptions.Item>
                <Descriptions.Item label="Thời gian đưa vào khai thác">{moment(quyetToan?.ngayqt).format("DD/MM/YYYY")}</Descriptions.Item>
                <Descriptions.Item label="Loại đồng hồ">{quyetToan?.maLoaiDongHo}</Descriptions.Item>
                <Descriptions.Item label="Đường kính đồng hồ">{quyetToan?.duongKinhDongHo}</Descriptions.Item>
                <Descriptions.Item label="Chỉ số đồng hồ">{quyetToan?.chiSoDongHo}</Descriptions.Item>
                <Descriptions.Item label="Có hộp đồng hồ">{quyetToan?.hopDongHo ? "Có hộp đồng hồ" : "Không có hộp đồng hồ"}</Descriptions.Item>
                <Descriptions.Item label="Vị trí đồng hồ">{quyetToan?.trongNgoaiHangRao ? "Ngoài hàng rào" : "Trong hàng rào"}</Descriptions.Item>
                <Descriptions.Item label="Năm sản xuất đồng hồ">{quyetToan?.namSanXuat}</Descriptions.Item>
            </Descriptions>
        );
    }

    return content;
});
export default KetQuaNghiemThuLapDatLapDatMoi;

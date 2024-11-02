import { Descriptions } from "antd";
import { observer } from "mobx-react";
import moment from "moment";

const ThayTheDongHoDetailThongTinKhachHang = observer(({ thayTheDongHoDetail }: { thayTheDongHoDetail: any }) => {
    if (thayTheDongHoDetail.ttpl === "PL_A") {
        return (
            <>
                <div>
                    <Descriptions style={{ paddingTop: 10 }} title="Thông tin khách hàng" column={{ xxl: 3, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
                        <Descriptions.Item label={<>Mã khách hàng</>}>{thayTheDongHoDetail?.idkh}</Descriptions.Item>
                        <Descriptions.Item label={<>Họ và tên</>}>{thayTheDongHoDetail?.tenkh}</Descriptions.Item>
                        <Descriptions.Item label={<>Số điện thoại liên lạc</>}>{thayTheDongHoDetail?.didong}</Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ lắp đặt">{thayTheDongHoDetail?.diachild}</Descriptions.Item>
                    </Descriptions>
                    <Descriptions style={{ paddingTop: 10 }} title="Thông tin khảo sát" column={{ xxl: 3, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
                        <Descriptions.Item label={<>Phương án xử lý</>}>Thay thế/di chuyển đồng hồ</Descriptions.Item>
                        <Descriptions.Item label={<>Hiện trạng đồng hồ</>}>{thayTheDongHoDetail?.hienTrangDongHo}</Descriptions.Item>
                        <Descriptions.Item label="Thời gian dự kiến thay thế">
                            {moment(thayTheDongHoDetail?.thoiGianDuKienThayThe).format("DD/MM/YYYY")}
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            </>
        );
    } else if (thayTheDongHoDetail.ttpl === "PL_R") {
        return (
            <>
                <div>
                    <Descriptions style={{ paddingTop: 10 }} title="Thông tin khách hàng" column={{ xxl: 3, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
                        <Descriptions.Item label={<>Họ và tên</>}>{thayTheDongHoDetail?.tenkh}</Descriptions.Item>
                        <Descriptions.Item label={<>Số điện thoại liên lạc</>}>{thayTheDongHoDetail?.didong}</Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ lắp đặt">{thayTheDongHoDetail?.diachild}</Descriptions.Item>
                    </Descriptions>
                    <Descriptions style={{ paddingTop: 10 }} title="Thông tin khảo sát" column={{ xxl: 3, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
                        <Descriptions.Item label={<>Phương án xử lý</>}>
                            <span>Không thực hiện thay thế hoặc di chuyển đồng hồ</span>
                        </Descriptions.Item>
                        <Descriptions.Item label={<>Lý do không thay thế</>}>{thayTheDongHoDetail?.lyDoKhongThayThe}</Descriptions.Item>
                    </Descriptions>
                </div>
            </>
        );
    } else return <>Chưa có phương án xử lý</>;
});
export default ThayTheDongHoDetailThongTinKhachHang;

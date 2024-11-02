import { Descriptions } from "antd";
import { observer } from "mobx-react";
import { ILapDatMoiDto } from "../dtos/lapDatMoiDto";
import "./index.css";

export interface IPaneTab {
    title: string;
    content: any;
    key: string;
}

const LapDatMoiDetailThongTinKhongDuDieuKienLapDat = observer(({ lapDatMoiDetail }: ILapDatMoiDto) => {
    var content = <></>;
    if (lapDatMoiDetail.ttpl == "PL_R") {
        content = (
            <>
                <Descriptions
                    style={{ paddingTop: 10 }}
                    className="ldm_description"
                    bordered={true}
                    title="Kết quả khảo sát"
                    column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                >
                    <Descriptions.Item label="Kết luận khảo sát">Không đủ điều kiện lắp đặt</Descriptions.Item>
                </Descriptions>
                <Descriptions
                    style={{ paddingTop: 10 }}
                    className="ldm_description"
                    bordered={true}
                    title="Nội dung không đủ điều kiện"
                    column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                >
                    <Descriptions.Item
                        style={{ display: lapDatMoiDetail?.nguoN_KHONGDUDIEUKIEN ? "" : "none" }}
                        label="Không đủ điều kiện do không có nguồn đầu nối"
                    >
                        {lapDatMoiDetail?.nguoN_LYDOKHONGDU}
                    </Descriptions.Item>
                    <Descriptions.Item
                        style={{ display: lapDatMoiDetail?.qsddaT_KHONGDUDIEUKIEN ? "" : "none" }}
                        label="Không đủ điều kiện do không cung cấp được giấy chứng nhận quyền sử dụng đất"
                    >
                        {lapDatMoiDetail?.qsddaT_LYDOKHONGDU}
                    </Descriptions.Item>
                    <Descriptions.Item
                        style={{ display: lapDatMoiDetail?.nhucaU_KHONGDUDIEUKIEN ? "" : "none" }}
                        label="Không đủ điều kiện do không có nhu cầu sử dụng"
                    >
                        {lapDatMoiDetail?.nhucaU_LYDOKHONGDU}
                    </Descriptions.Item>
                </Descriptions>
            </>
        );
    }
    return content;
});
export default LapDatMoiDetailThongTinKhongDuDieuKienLapDat;

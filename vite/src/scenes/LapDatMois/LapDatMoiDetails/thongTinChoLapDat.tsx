import { Descriptions } from "antd";
import { observer } from "mobx-react";
import { ILapDatMoiDto } from "../dtos/lapDatMoiDto";
import "./index.css";

export interface IPaneTab {
    title: string;
    content: any;
    key: string;
}

const LapDatMoiDetailThongTinChoLapDat = observer(({ lapDatMoiDetail }: ILapDatMoiDto) => {
    var content = <></>;
    if (lapDatMoiDetail.ttpl == "PL_P") {
        content = (
            <div>
                <Descriptions
                    style={{ paddingTop: 10 }}
                    className="ldm_description"
                    bordered={true}
                    title="Kết quả khảo sát"
                    column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                >
                    <Descriptions.Item label="Kết luận khảo sát">Chờ lắp đặt</Descriptions.Item>
                </Descriptions>
                {/* <Descriptions
                    style={{ paddingTop: 10 }}
                    className="ldm_description"
                    bordered={true}
                    title="Nội dung chờ"
                    column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                >
                    <Descriptions.Item
                        label="Chờ nhu cầu sử dụng nước"
                        style={{ display: lapDatMoiDetail?.choNhuCauSuDung ? "" : "none" }}
                    >
                        <CheckSquareFilled twoToneColor="#eb2f96" />
                    </Descriptions.Item>

                    <Descriptions.Item
                        label="Chờ tìm kiếm mã khách hàng đấu nối lại"
                        style={{ display: lapDatMoiDetail?.choTimMaKhachHang ? "" : "none" }}
                    >
                        <CheckSquareFilled twoToneColor="#eb2f96" />
                    </Descriptions.Item>
                    <Descriptions.Item
                        label="Chờ khách hàng nộp tiền đầu tư"
                        style={{ display: lapDatMoiDetail?.choKhachHangNopTien ? "" : "none" }}
                    >
                        <CheckSquareFilled twoToneColor="#eb2f96" />
                    </Descriptions.Item>
                </Descriptions> */}
            </div>
        );
    }
    return content;
});
export default LapDatMoiDetailThongTinChoLapDat;

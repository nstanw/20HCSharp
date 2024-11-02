import { Steps } from "antd";
import { observer } from "mobx-react";
import { ILapDatMoiDto } from "../dtos/lapDatMoiDto";
const { Step } = Steps;

const LapDatMoiDetailTrangThaiXuLy = observer(({ lapDatMoiDetail }: ILapDatMoiDto) => {
    // const getTrangThaiNhanDon = () => {
    //   if (lapDatMoiDetail.ttdk === 'DK_A') {
    //     return <Progress type="circle" percent={100} width={50} />;
    //   }
    //   return <Progress type="circle" percent={50} width={50} />;
    // };
    // const getTrangThaiKhaoSat = () => {
    //   if (lapDatMoiDetail.tttk === 'TK_A') {
    //     return <Progress type="circle" percent={100} width={50} />;
    //   }
    //   return <Progress type="circle" percent={0} width={50} format={() => <MinusOutlined style={{ color: 'blue' }} />} />;
    // };
    // const getTrangThaiThiCong = () => {
    //   if (lapDatMoiDetail.tttc === 'TC_A') {
    //     return <Progress type="circle" percent={100} width={50} />;
    //   }
    //   return <Progress type="circle" percent={0} width={80} format={() => <MinusOutlined style={{ color: 'blue' }} />} />;
    // };
    const getCurrentStatus = () => {
        // if (lapDatMoiDetail.ttqt == "QT_A") {
        //     return 4;
        // }
        if (lapDatMoiDetail.tttc === "TC_A") {
            return 3;
        }
        if (lapDatMoiDetail.tttk === "TK_A") {
            return 2;
        }

        if (lapDatMoiDetail.ttdk === "DK_A") {
            return 1;
        }
        return 0;
    };
    var content = (
        <>
            <Steps current={getCurrentStatus()}>
                <Step title="Nhận đơn" description="Nhận yêu cầu đăng ký lắp đặt." />
                <Step title="Khảo sát dự toán" description="Nhân viên tổ 2 khảo sát thiết kế." />
                <Step title="Thi công" description="Nhân viên xí nghiệp xây lắp thi công." />
                <Step title="Quyết toán" description="Xác nhận hoàn thành quyết toán." />
            </Steps>
        </>
    );
    return content;
});
export default LapDatMoiDetailTrangThaiXuLy;

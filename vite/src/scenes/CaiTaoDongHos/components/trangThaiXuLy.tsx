import { Steps } from "antd";
import { observer } from "mobx-react";
const { Step } = Steps;

interface IProps {
    caiTaoDongHoDetail: any;
}

const CaiTaoDongHoDetailTrangThaiXuLy = observer(({ caiTaoDongHoDetail }: IProps) => {
    const getCurrentStatus = () => {
        if (caiTaoDongHoDetail.ttqt === "QT_A") {
            return 4;
        }
        if (caiTaoDongHoDetail.tttc === "TC_A") {
            return 3;
        }
        if (caiTaoDongHoDetail.tttk === "TK_A") {
            return 2;
        }

        if (caiTaoDongHoDetail.ttdk === "DK_A") {
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
export default CaiTaoDongHoDetailTrangThaiXuLy;

import { Card } from "antd";
import { observer } from "mobx-react";
import "./index.less";

const CallRing = observer((input: any) => {
    const { linkDto } = input;
    const getTitle = () => {
        if (linkDto.loaiCuocGoi === "CuocGoiDi") return "Cuộc gọi đi: " + linkDto.soDienThoai;
        else return "Cuộc gọi đến: " + linkDto.soDienThoai;
    };

    return (
        <div className="_5qib">
            <div className="item-ring item-call">
                <div className="ring-call">
                    <Card style={{ width: 300 }} title={getTitle()}>
                        <div className="wrapper">
                            <div className="call-ring">
                                <div className="coccoc-alo-phone coccoc-alo-green coccoc-alo-show">
                                    <div className="coccoc-alo-ph-circle"></div>
                                    <div className="coccoc-alo-ph-circle-fill"></div>
                                    <div className="coccoc-alo-ph-img-circle"></div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
});
export default CallRing;

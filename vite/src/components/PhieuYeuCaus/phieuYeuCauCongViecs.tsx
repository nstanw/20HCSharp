import { Spin, List, Avatar } from "antd";
import React, { useState } from "react";
import { observer } from "mobx-react";
import moment from "moment";
import { useStore } from "../../helpers/use-store";
import { CheckOutlined, MinusOutlined } from "@ant-design/icons";

export interface ICongViecPhieuYeuCauProp {
    congViecPhieuYeuCauID: number;
    trangThaiXuLy: string;
    phieuYeuCauID: number;
}

const PhieuYeuCauCongViecs = observer(({ phieuYeuCauID }: { phieuYeuCauID: number }) => {
    const { phieuYeuCauLogStore } = useStore();
    const { congViecPhieuYeuCaus } = phieuYeuCauLogStore;
    const [isLoadding, setIsLoadding] = useState(false);
    React.useEffect(() => {
        (async function run() {
            if (phieuYeuCauID) {
                setIsLoadding(true);
                await phieuYeuCauLogStore.getAllCongViecPhieuYeuCau(phieuYeuCauID);
                setIsLoadding(false);
            } else {
                congViecPhieuYeuCaus.result = { count: 0, items: [] };
            }
        })();
    }, [phieuYeuCauID]);
    return (
        <>
            <h4 style={{ marginTop: 10 }}>Trạng thái xử lý</h4>
            <Spin spinning={isLoadding}>
                <List
                    itemLayout="horizontal"
                    dataSource={congViecPhieuYeuCaus.result ? congViecPhieuYeuCaus.result!.items : undefined}
                    renderItem={(item) => (
                        <List.Item actions={[]}>
                            <List.Item.Meta
                                avatar={
                                    item.trangThaiCongViec == "HoanThanh" ? (
                                        <Avatar style={{ backgroundColor: "#87d068" }} icon={<CheckOutlined />} />
                                    ) : (
                                        <Avatar style={{ backgroundColor: "#3281a8" }} icon={<MinusOutlined />} />
                                    )
                                }
                                title={item.moTaYeuCau.replace(new RegExp("\r?\n", "g"), "<br/>")}
                                description={
                                    <>
                                        <div>{item.moTaKetQua}</div>
                                        <p>
                                            {moment(item?.thoiGianHoanThanh || item.thoiGianBatDau)
                                                .subtract(1, "days")
                                                .format("DD-MM-YYYY HH:mm:ss")}
                                        </p>
                                    </>
                                }
                            />
                        </List.Item>
                    )}
                />
            </Spin>
        </>
    );
});
export default PhieuYeuCauCongViecs;

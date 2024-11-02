import * as React from "react";
import { observer } from "mobx-react";
import { Card, Row, Col, Table } from "antd";
import { useStore } from "../../../helpers/use-store";
import lapDatMoiBieu05Columns from "./columns";
import ViewThayTheDongHo from "../../../models/ThayTheDongHos/ViewThayTheDongHo";
import Search from "./search";
import { useNavigate } from "react-router-dom";
// import TongHopSearchs from './search';

const TongHop = observer(() => {
    const { thayTheDongHoStore, sessionStore } = useStore();
    const { traCuuHoSos } = thayTheDongHoStore;
    const navigate = useNavigate();

    const [pageSize, setPageSize] = React.useState(20);
    const [skipCount, setSkipCount] = React.useState(0);

    const handleOnRow = (record: ViewThayTheDongHo) => {
        navigate("/ThayTheDongHos/" + record.maddk);
    };
    React.useEffect(() => {
        sessionStore.title = "Tra cứu hồ sơ thay thế cụm đồng hồ";
        sessionStore.subTitle = "";
        return function clearUp() {
            traCuuHoSos.filterO = [];
            traCuuHoSos.q = "";
            traCuuHoSos.filter = "";
            traCuuHoSos.result = undefined;
        };
    }, []);
    React.useEffect(() => {
        (async function run() {
            traCuuHoSos.sizePage = pageSize;
            traCuuHoSos.skipCount = skipCount;
            await thayTheDongHoStore.getTraCuuHoSos();
        })();
    }, [thayTheDongHoStore, skipCount, pageSize]);

    const SubmitFormSearch = async () => {
        await thayTheDongHoStore.getTraCuuHoSos();
    };

    return (
        <Card>
            {/* <TongHopSearchs /> */}
            <Search handleSubmit={() => SubmitFormSearch()} />
            <Row style={{ marginTop: 20 }}>
                <Col span={24}>
                    <Table
                        rowKey={(record) => `traCuuHoSoThayTheDongHo${record.id}`}
                        bordered={true}
                        pagination={{
                            pageSize: pageSize,
                            total: traCuuHoSos.result === undefined ? 0 : traCuuHoSos.result.count,
                            defaultCurrent: 1,
                        }}
                        columns={lapDatMoiBieu05Columns}
                        loading={traCuuHoSos.isLoadding}
                        dataSource={traCuuHoSos.result === undefined ? [] : traCuuHoSos.result.items}
                        onChange={(pagination: any) => {
                            setPageSize(pagination.pageSize);
                            setSkipCount((pagination.current - 1) * pageSize!);
                        }}
                        onRow={(record) => ({
                            onDoubleClick: () => {
                                handleOnRow(record);
                            },
                        })}
                    />
                </Col>
            </Row>
        </Card>
    );
});
export default TongHop;

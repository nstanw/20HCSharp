import * as React from "react";
import { observer } from "mobx-react";
import { Card, Row, Col, Table, Button } from "antd";
import { useStore } from "../../helpers/use-store";
import { IFilterDto } from "../../models/IFilterDto";
import { PagedResultTotalDto } from "../../services/dto/pagedResultTotalDto";
import { pushFilterDto2 } from "../../utils/pushFilterDto2";
import GiaoKhoanSearchs from "./search";
import columns from "./columns";
import lichSuDienThoaiService from "../../services/lichSuDienThoai/lichSuDienThoaiService";
import { DonDangKyDto } from "../../services/donDangKy/dto/donDangKyDto";
import DialogAddLichSuDienThoai from "./components/dialogAddLichSuDienThoai";

const GoiDienKhachHang = observer(() => {
    const { sessionStore } = useStore();
    const [pageSize, setPageSize] = React.useState(50);
    const [skipCount, setSkipCount] = React.useState(0);
    const [donDangKyDto, setDonDangKyDto] = React.useState<PagedResultTotalDto<DonDangKyDto>>();
    const [selectedDonDangKyDto, setSelectedDonDangKyDto] = React.useState<DonDangKyDto>();
    const [isLoadding, setIsLoadding] = React.useState(false);
    const [openDialogAddLichSuDienThoai, setOpenDialogAddLichSuDienThoai] = React.useState(false);
    const defaultFilter = [
        {
            property: "action",
            value: "CAN_GOI_DT",
            operator: "eq",
        },
    ];
    const [filterDtos, setFilterDtos] = React.useState<IFilterDto[]>(defaultFilter);
    React.useEffect(() => {
        sessionStore.title = "Danh sách khách hàng cần gọi điện thoại";
    }, []);

    const getAllDanhSachCanGoiDienThoai = async () => {
        try {
            setIsLoadding(true);
            const donDangKyDto = await lichSuDienThoaiService.getAllDanhSachCanGoiDienThoai({
                filter: JSON.stringify(filterDtos),
                limit: pageSize,
                start: skipCount,
            });
            setDonDangKyDto(donDangKyDto);
            setIsLoadding(false);
        } catch (error) {
            setIsLoadding(false);
        }
    };

    React.useEffect(() => {
        (async function run() {
            await getAllDanhSachCanGoiDienThoai();
        })();
    }, [filterDtos, skipCount, pageSize]);

    return (
        <Card>
            <GiaoKhoanSearchs
                handleSubmit={async (filters) => {
                    const filterDtos: IFilterDto[] = [];
                    if (filters) {
                        filters.forEach((value) => {
                            pushFilterDto2(filterDtos, value);
                        });
                    }
                    setFilterDtos(filterDtos);
                }}
            />
            <Row style={{ marginTop: 20 }}>
                <Col span={24}>
                    <Table
                        rowKey={(record) => `goiDienKhachHang${record.id}`}
                        id="maddk"
                        bordered={true}
                        pagination={{
                            pageSize: pageSize,
                            total: donDangKyDto === undefined ? 0 : donDangKyDto.count,
                            defaultCurrent: 1,
                        }}
                        columns={[
                            ...columns,
                            {
                                title: "Chi tiết",
                                dataIndex: "action",
                                key: "action",
                                render: (_, record) => (
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            if (record) {
                                                setSelectedDonDangKyDto(record);
                                            }
                                            setOpenDialogAddLichSuDienThoai(true);
                                        }}
                                    >
                                        Chi tiết
                                    </Button>
                                ),
                            },
                        ]}
                        loading={isLoadding}
                        dataSource={donDangKyDto === undefined ? [] : donDangKyDto.items}
                        onChange={(pagination: any) => {
                            setPageSize(pagination.pageSize);
                            setSkipCount((pagination.current - 1) * pageSize!);
                        }}
                    />
                </Col>
            </Row>
            {/* {selectedDonDangKyDto && ( */}
            <DialogAddLichSuDienThoai
                open={openDialogAddLichSuDienThoai}
                selectedDonDangKyDto={selectedDonDangKyDto!}
                onDone={() => {
                    setOpenDialogAddLichSuDienThoai(false);
                    getAllDanhSachCanGoiDienThoai();
                }}
                onCancel={() => {
                    setOpenDialogAddLichSuDienThoai(false);
                }}
            />
            {/* )} */}
        </Card>
    );
});
export default GoiDienKhachHang;

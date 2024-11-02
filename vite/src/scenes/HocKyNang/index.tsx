/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { observer } from "mobx-react";
import { Card, Row, Col, Button, Space, Pagination, Table, Switch } from "antd";
import { useStore } from "../../helpers/use-store";
import { IFilterDto } from "../../models/IFilterDto";
import { PagedResultTotalDto } from "../../services/dto/pagedResultTotalDto";
import { pushFilterDto2 } from "../../utils/pushFilterDto2";
import HocKyNangSearchs from "./search";
import columns from "./columns";
import hocKyNangService from "../../services/hocKyNang/hocKyNangService";
import { ViewHocKyNang } from "../../services/hocKyNang/dto/hocKyNangDto";
import DialogHocKyNangCT from "./components/dialogHocKyNangCT";

const HocKyNang = observer(() => {
    const { sessionStore } = useStore();
    const [pageSize, setPageSize] = React.useState(50);
    const [skipCount, setSkipCount] = React.useState(0);
    const [hocKyNangDto, setHocKyNangDto] = React.useState<PagedResultTotalDto<ViewHocKyNang>>();
    const [selectedHocKyNangDto, setSelectedHocKyNangDto] = React.useState<ViewHocKyNang | undefined>();
    const [isLoading, setIsLoading] = React.useState(false);
    const [openDialogAddHocKyNang, setOpenDialogAddHocKyNang] = React.useState(false);
    const [isCardView, setIsCardView] = React.useState(true);
    const defaultFilter = [
        {
            property: "action",
            value: "CAN_HOC_KN",
            operator: "eq",
        },
    ];
    const [filterDtos, setFilterDtos] = React.useState<IFilterDto[]>(defaultFilter);
    React.useEffect(() => {
        sessionStore.title = "Danh sách học kỹ năng";
    }, []);

    const getAllDanhSachHocKyNang = async () => {
        try {
            setIsLoading(true);
            const hocKyNangDto = await hocKyNangService.getAll({
                filter: JSON.stringify(filterDtos),
                limit: pageSize,
                start: skipCount,
            });
            setHocKyNangDto(hocKyNangDto);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        (async function run() {
            await getAllDanhSachHocKyNang();
        })();
    }, [filterDtos, skipCount, pageSize]);

    const handleCreateHocKyNang = () => {
        setSelectedHocKyNangDto(undefined);
        setOpenDialogAddHocKyNang(true);
    };

    const handleHoanThanhKyNang = async (record: ViewHocKyNang) => {
        try {
            await hocKyNangService.hoanThanhKyNang(record.id);
            getAllDanhSachHocKyNang();
        } catch (error) {
            console.error(error);
        }
    };

    const tableColumns = [
        ...columns,
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record: ViewHocKyNang) => (
                <Space>
                    <Button
                                                type="primary"
                                                onClick={() => {
                                                    setSelectedHocKyNangDto(record);
                                                    setOpenDialogAddHocKyNang(true);
                                                }}
                                            >
                                                Chi tiết
                                            </Button>
                                            <Button type="primary" onClick={() => handleHoanThanhKyNang(record)}>
                                                Hoàn thành
                                            </Button>
                                        </Space>
            ),
        },
    ];

    return (
        <Card>
            <Space direction="horizontal" style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={handleCreateHocKyNang}>
                    Tạo mới
                </Button>
                <Switch
                    checkedChildren="Card"
                    unCheckedChildren="Table"
                    checked={isCardView}
                    onChange={(checked) => setIsCardView(checked)}
                        />
            </Space>
            <HocKyNangSearchs
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
                    {isCardView ? (
                        <Row gutter={[16, 16]}>
                            {hocKyNangDto?.items.map((record) => (
                                <Col xs={24} sm={12} md={8} lg={6} key={`hocKyNang${record.id}`}>
                                    <Card
                                        title={record.tenKyNang}
                                        extra={
                                            <Space>
                                                <Button
                                                    type="primary"
                                                    onClick={() => {
                                                        setSelectedHocKyNangDto(record);
                                                        setOpenDialogAddHocKyNang(true);
                                                    }}
                                                >
                                                    Chi tiết
                                                </Button>
                                                <Button type="primary" onClick={() => handleHoanThanhKyNang(record)}>
                                                    Hoàn thành
                                                </Button>
                                            </Space>
                                        }
                                    >
                                        {columns.map((column) => (
                                            <p key={column.dataIndex as string}>
                                                <strong>{column.title}: </strong>
                                                {record[column.dataIndex as keyof ViewHocKyNang]}
                                            </p>
                                        ))}
        </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <Table
                            columns={tableColumns}
                            dataSource={hocKyNangDto?.items}
                            rowKey={(record) => record.id}
                            pagination={false}
                        />
                    )}
                    <Row justify="end" style={{ marginTop: 16 }}>
                        <Pagination
                            total={hocKyNangDto?.count || 0}
                            pageSize={pageSize}
                            current={Math.floor(skipCount / pageSize) + 1}
                            onChange={(page, pageSize) => {
                                setPageSize(pageSize);
                                setSkipCount((page - 1) * pageSize);
                            }}
                            showSizeChanger
                            showQuickJumper
                        />
                    </Row>
                </Col>
            </Row>
            <DialogHocKyNangCT
                open={openDialogAddHocKyNang}
                selectedHocKyNangDto={selectedHocKyNangDto}
                onDone={() => {
                    setOpenDialogAddHocKyNang(false);
                    getAllDanhSachHocKyNang();
                }}
                onCancel={() => {
                    setOpenDialogAddHocKyNang(false);
                }}
            />
        </Card>
    );
});
export default HocKyNang;

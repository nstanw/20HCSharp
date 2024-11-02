import { Button, Col, Progress, Row, Table, Tag } from "antd";
import Modal from "antd/lib/modal/Modal";
import { observer } from "mobx-react";
import moment from "moment";
import { ColumnType } from "rc-table/lib/interface";
import { useCallback, useEffect, useState } from "react";
import { IFilterDto } from "../../models/IFilterDto";
import donDangKyService from "../../services/donDangKy/donDangKyService";
import { DonDangKyDto } from "../../services/donDangKy/dto/donDangKyDto";
import { PagedResultTotalDto } from "../../services/dto/pagedResultTotalDto";
import getColumnSearchProps from "../../utils/getColumnSearchProps";

export interface ISorterDto {
    property?: ColumnType<DonDangKyDto> | undefined;
    order: string;
}
export interface ITableAction {
    curentPage: number;
    pageSize: number;
    q?: string;
    filter?: IFilterDto[];
    sorter?: ISorterDto;
}

interface IDonDangKyModelSelectProps {
    visible: boolean;
    handleOk: (item: { value: string; label: string[]; key: string }) => void;
    handleCancel: () => void;
}

const DonDangKyModelSelect = observer(({ visible, handleOk, handleCancel }: IDonDangKyModelSelectProps) => {
    const [tableAction, setTableAction] = useState<ITableAction>();
    const [fetching, setFetching] = useState(true);
    const [pagination, setPagination] = useState({ pageSize: 10, total: 0, defaultCurrent: 1, current: 1 });
    const [selection, setSelection] = useState<DonDangKyDto>();
    const [donDangKys, setDonDangKys] = useState<PagedResultTotalDto<DonDangKyDto>>();

    const fetchData = useCallback(() => {
        (async function run() {
            setFetching(true);
            var items = await donDangKyService.getAll({
                limit: pagination.pageSize,
                start: (pagination.current - 1) * pagination.pageSize,
                filter: JSON.stringify(tableAction?.filter),
                sort: tableAction?.sorter?.property?.dataIndex?.toString(),
                order: tableAction?.sorter?.order,
            });

            setPagination({ ...pagination, total: items.count });
            setDonDangKys(items);
            setFetching(false);
        })();
    }, [tableAction]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const rowSelection = {
        onChange: (_selectedRowKeys: any, object: any) => {
            if (object.length > 0) setSelection(object[0]);
        },
    };
    const columns = [
        {
            title: "Mã DDK",
            sorter: true,
            dataIndex: "maddk",
            key: "maddk",
            fixed: true,
            width: 40,
            render: (text: string) => <div>{text}</div>,
            ...getColumnSearchProps("maddk"),
        },
        {
            title: "Tên khách hàng",
            dataIndex: "tenkh",
            key: "tenkh",
            width: 80,
            ...getColumnSearchProps("tenkh"),
            render: (text: string) => <div>{text}</div>,
        },
        {
            title: "Địa chỉ",
            dataIndex: "diachild",
            key: "diachild",
            width: 100,
            ...getColumnSearchProps("diachild"),
            render: (text: string) => <div>{text}</div>,
        },
        {
            title: "Số điện thoại",
            sorter: true,
            dataIndex: "didong",
            key: "didong",
            width: 40,
            ...getColumnSearchProps("didong"),
            render: (text: string) => <div>{text}</div>,
        },
        {
            title: "Thời gian nhập đơn",
            dataIndex: "ngaydk",
            key: "ngaydk",
            width: 50,
            sorter: true,
            render: (ngaydk: Date) => <div>{moment(ngaydk).format("DD/MM/YYYY HH:ss")}</div>,
        },
        {
            title: "Loại đơn",
            dataIndex: "loaidk",
            key: "loaidk",
            width: 50,
            filters: [
                { text: "Lắp đặt mới", value: "DK" },
                { text: "Thay thế đồng hồ", value: "TDH" },
                { text: "Cải tạo", value: "CT" },
            ],
            render: (text: string) => {
                if (text === "DK") {
                    return <Tag color="red">Lắp đặt mới</Tag>;
                } else if (text === "CT") {
                    return <Tag color="green">Cải tạo</Tag>;
                } else if (text === "TDH") {
                    return <Tag color="geekblue">Thay thế đồng hồ</Tag>;
                } else {
                    return <Tag color="volcano"></Tag>;
                }
            },
        },
        {
            title: "Đăng ký",
            dataIndex: "ttdk",
            key: "ttdk",
            width: 30,
            render: (text: string) => {
                if (text === "DK_A") {
                    return <Progress percent={100} showInfo={false} />;
                } else {
                    return <Progress percent={50} showInfo={false} />;
                }
            },
        },
        {
            title: "Dự toán",
            dataIndex: "ttct",
            key: "ttct",
            width: 30,
            render: (text: string) => {
                if (text === "CT_A") {
                    return <Progress percent={100} showInfo={false} />;
                } else {
                    return <Progress percent={50} showInfo={false} />;
                }
            },
        },
        {
            title: "Hợp đồng",
            dataIndex: "tthd",
            key: "tthd",
            width: 30,
            render: (text: string) => {
                if (text === "HD_A") {
                    return <Progress percent={100} showInfo={false} />;
                } else {
                    return <Progress percent={50} showInfo={false} />;
                }
            },
        },
        {
            title: "Quyết toán",
            dataIndex: "ttqt",
            key: "ttqt",
            width: 30,
            render: (text: string) => {
                if (text === "QT_A") {
                    return <Progress percent={100} showInfo={false} />;
                } else {
                    return <Progress percent={50} showInfo={false} />;
                }
            },
        },
    ];
    return (
        <>
            <Modal
                okButtonProps={{ disabled: selection === undefined }}
                onOk={() => {
                    if (selection) {
                        handleOk({
                            value: selection.maddk,
                            label: [selection.maddk, "-", selection.tenkh],
                            key: selection.maddk,
                        });
                    }
                }}
                onCancel={() => {
                    handleCancel();
                }}
                open={visible}
                title="Đơn đăng ký"
                width={"90%"}
            >
                <Row>
                    <Col
                        xs={{ span: 24, offset: 0 }}
                        sm={{ span: 24, offset: 0 }}
                        md={{ span: 24, offset: 0 }}
                        lg={{ span: 24, offset: 0 }}
                        xl={{ span: 24, offset: 0 }}
                        xxl={{ span: 24, offset: 0 }}
                    >
                        <div className="table-operations">
                            <Button
                                onClick={() => {
                                    setTableAction({
                                        ...tableAction,
                                        pageSize: pagination.pageSize,
                                        curentPage: pagination.current,
                                        filter: [],
                                    });
                                }}
                            >
                                Xóa bộ lọc
                            </Button>
                            <Button
                                onClick={() => {
                                    setTableAction({
                                        ...tableAction,
                                        pageSize: pagination.pageSize,
                                        curentPage: pagination.current,
                                        filter: [],
                                        sorter: undefined,
                                    });
                                }}
                            >
                                Xóa sắp xếp và bộ lọc
                            </Button>
                        </div>
                        <Table
                            rowSelection={{
                                type: "radio",
                                ...rowSelection,
                            }}
                            rowKey={(record) => `donDangKySelect${record.id}`}
                            bordered={true}
                            pagination={pagination}
                            onChange={(pagination: any, filters: any, sorter: any) => {
                                const filterDtos: IFilterDto[] = [];
                                for (const k in filters) {
                                    if (filters[k] != null) {
                                        filterDtos.push({
                                            property: k,
                                            value: filters[k]!.join(),
                                            operator: filters[k].length === 1 ? "eq" : "in",
                                        });
                                    }
                                }
                                if (Array.isArray(sorter)) {
                                    //throw new Error('Unexpected action');
                                    sorter = sorter[0];
                                }
                                setTableAction({
                                    ...tableAction,
                                    pageSize: pagination.pageSize,
                                    curentPage: pagination.current,
                                    sorter: {
                                        property: sorter.column,
                                        order: sorter.order === "ascend" ? "ASC" : "DESC",
                                    },
                                    filter: filterDtos,
                                });
                                setPagination(pagination);
                            }}
                            columns={columns as ColumnType<DonDangKyDto>[]}
                            loading={fetching}
                            scroll={{ x: 1500, y: 300 }}
                            dataSource={donDangKys?.items ?? []}
                        />
                    </Col>
                </Row>
            </Modal>
        </>
    );
});
export default DonDangKyModelSelect;

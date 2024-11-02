import { Button, Col, Row, Table } from "antd";
import Modal from "antd/lib/modal/Modal";
import { observer } from "mobx-react";
import { ColumnType } from "rc-table/lib/interface";
import { useCallback, useEffect, useState } from "react";
import { IFilterDto } from "../../models/IFilterDto";
import { PagedResultTotalDto } from "../../services/dto/pagedResultTotalDto";
import { KhachHangDto } from "../../services/khachHang/dto/khachHangDto";
import khachHangService from "../../services/khachHang/khachHangService";
import getColumnSearchProps from "../../utils/getColumnSearchProps";

export interface ISorterDto {
    property?: ColumnType<KhachHangDto>;
    order: string;
}
export interface ITableAction {
    curentPage: number;
    pageSize: number;
    q?: string;
    filter?: IFilterDto[];
    sorter?: ISorterDto;
}

interface IKhachHangModelSelectProps {
    visible?: boolean;
    handleOk?: (item: { value: string; label: string[]; key: string }, selection: KhachHangDto) => void;
    handleCancel?: () => void;
    searchs?: IFilterDto[];
}

const KhachHangModelSelect = observer(({ visible, handleOk, handleCancel, searchs }: IKhachHangModelSelectProps) => {
    const [tableAction, setTableAction] = useState<ITableAction>();
    const [fetching, setFetching] = useState(true);
    const [pagination, setPagination] = useState({ pageSize: 10, total: 0, defaultCurrent: 1, current: 1 });
    const [selection, setSelection] = useState<KhachHangDto>();
    const [khachHangs, setKhachHangs] = useState<PagedResultTotalDto<KhachHangDto>>();

    const fetchData = useCallback(() => {
        (async function run() {
            setFetching(true);
            let filter = searchs && tableAction?.filter?.concat(searchs);
            filter = filter === undefined ? searchs : filter;

            var items = await khachHangService.getAll({
                limit: pagination.pageSize,
                start: (pagination.current - 1) * pagination.pageSize,
                filter: JSON.stringify(filter),
                sort: tableAction?.sorter?.property?.dataIndex?.toString(),
                order: tableAction?.sorter?.order,
            });

            setPagination({ ...pagination, total: items.count });
            setKhachHangs(items);
            setFetching(false);
        })();
    }, [tableAction, searchs]);

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
            title: "IDKH",
            sorter: true,
            dataIndex: "idkh",
            key: "idkh",
            fixed: true,
            width: 40,
            render: (text: string) => <div>{text}</div>,
            ...getColumnSearchProps("idkh"),
        },
        {
            title: "Mã KH",
            sorter: true,
            dataIndex: ["sodb"],
            key: "sodb",
            fixed: true,
            width: 40,
            render: (text: string, row: any) => (
                <a target="blank" href={"http://nawasco.com.vn/HoaDonDienTu/TraCuuHoaDon/" + row.idkh}>
                    {text}
                </a>
            ),
            ...getColumnSearchProps("sodb"),
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
            dataIndex: "diachi",
            key: "diachi",
            width: 100,
            ...getColumnSearchProps("diachi"),
            render: (text: string) => <div>{text}</div>,
        },
        {
            title: "Số điện thoại",
            sorter: true,
            dataIndex: "sdt",
            key: "sdt",
            width: 40,
            ...getColumnSearchProps("sdt"),
            render: (text: string) => <div>{text}</div>,
        },
        {
            title: "Mục đích sử dụng",
            dataIndex: "mamdsd",
            key: "mamdsd",
            width: 50,
            render: (mamdsd: string) => <div>{mamdsd}</div>,
        },
    ];
    return (
        <>
            <Modal
                okButtonProps={{ disabled: selection === undefined }}
                onOk={() => {
                    if (selection) {
                        handleOk &&
                            handleOk(
                                {
                                    value: selection.idkh,
                                    label: [selection.idkh, "-", selection.tenkh],
                                    key: selection.idkh,
                                },
                                selection
                            );
                    }
                }}
                onCancel={() => {
                    handleCancel && handleCancel();
                }}
                open={visible}
                title="Khách hàng"
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
                            rowKey={(record) => `khachHangSelect${record.id}`}
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
                            columns={columns as ColumnType<KhachHangDto>[]}
                            loading={fetching}
                            scroll={{ x: 1500, y: 300 }}
                            dataSource={khachHangs === undefined ? [] : khachHangs.items}
                        />
                    </Col>
                </Row>
            </Modal>
        </>
    );
});
export default KhachHangModelSelect;

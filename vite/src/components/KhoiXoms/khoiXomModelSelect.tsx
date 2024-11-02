import { Button, Col, Row, Table } from "antd";
import Modal from "antd/lib/modal/Modal";
import { observer } from "mobx-react";
import { ColumnType } from "rc-table/lib/interface";
import { useCallback, useEffect, useState } from "react";
import { IFilterDto } from "../../models/IFilterDto";
import { PagedResultTotalDto } from "../../services/dto/pagedResultTotalDto";
import { KhoiXomDto } from "../../services/khoiXom/dto/khoiXomDto";
import khoiXomService from "../../services/khoiXom/khoiXomService";
import getColumnSearchProps from "../../utils/getColumnSearchProps";
import { LabeledValue } from "antd/es/select";

export interface ISorterDto {
    property?: ColumnType<KhoiXomDto>;
    order: string;
}
export interface ITableAction {
    curentPage: number;
    pageSize: number;
    q?: string;
    filter?: IFilterDto[];
    sorter?: ISorterDto;
}

interface IKhoiXomModelSelectProps {
    visible: boolean;
    handleOk: (item: LabeledValue) => void;
    handleCancel: () => void;
}

const KhoiXomModelSelect = observer(({ visible, handleOk, handleCancel }: IKhoiXomModelSelectProps) => {
    const [tableAction, setTableAction] = useState<ITableAction>();
    const [fetching, setFetching] = useState(true);
    const [pagination, setPagination] = useState({ pageSize: 10, total: 0, defaultCurrent: 1, current: 1 });
    const [selection, setSelection] = useState<KhoiXomDto>();
    const [khoiXoms, setKhoiXoms] = useState<PagedResultTotalDto<KhoiXomDto>>();

    const fetchData = useCallback(() => {
        (async function run() {
            setFetching(true);
            var items = await khoiXomService.getAll({
                limit: pagination.pageSize,
                start: (pagination.current - 1) * pagination.pageSize,
                filter: JSON.stringify(tableAction?.filter),
                sort: tableAction?.sorter?.property?.dataIndex?.toString(),
                order: tableAction?.sorter?.order,
            });

            setPagination({ ...pagination, total: items.count });
            setKhoiXoms(items);
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
            title: "Mã khối",
            sorter: true,
            dataIndex: ["makhoi"],
            key: "makhoi",
            fixed: true,
            width: 120,
            render: (text: string) => ({ text }),
            ...getColumnSearchProps("makhoi"),
        },
        {
            title: "Tên khối",
            dataIndex: "tenkhoi",
            key: "tenkhoi",
            width: 150,
            ...getColumnSearchProps("tenkhoi"),
            render: (text: string) => <div>{text}</div>,
        },
        {
            title: "Mã phường",
            dataIndex: "maphuong",
            key: "maphuong",
            width: 120,
            ...getColumnSearchProps("maphuong"),
            render: (text: string) => <div>{text}</div>,
        },
        {
            title: "Tên phường",
            dataIndex: "tenphuong",
            key: "tenphuong",
            width: 150,
            ...getColumnSearchProps("tenphuong"),
            render: (text: string) => <div>{text}</div>,
        },
        {
            title: "Địa chỉ",
            sorter: true,
            dataIndex: "tenKhoiPhuongQuan",
            key: "tenKhoiPhuongQuan",
            ...getColumnSearchProps("q"),
            render: (text: string) => <div>{text}</div>,
        },
    ];
    return (
        <>
            <Modal
                okButtonProps={{ disabled: selection === undefined }}
                onOk={() => {
                    if (selection) {
                        handleOk({
                            value: selection.makhoi,
                            label: [selection.tenKhoiPhuongQuan],
                            key: selection.makhoi,
                        });
                    }
                }}
                onCancel={() => {
                    handleCancel();
                }}
                open={visible}
                title="Khối xóm, phường"
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
                            rowKey={(record) => `khoiXomSelect${record.id}`}
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
                            columns={columns as ColumnType<KhoiXomDto>[]}
                            loading={fetching}
                            scroll={{ x: 1500, y: 300 }}
                            dataSource={khoiXoms === undefined ? [] : khoiXoms.items}
                        />
                    </Col>
                </Row>
            </Modal>
        </>
    );
});
export default KhoiXomModelSelect;

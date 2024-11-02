import { Button, Col, Row, Table } from "antd";
import Modal from "antd/lib/modal/Modal";
import { observer } from "mobx-react";
import { ColumnType } from "rc-table/lib/interface";
import { useCallback, useEffect, useState } from "react";
import { IFilterDto } from "../../models/IFilterDto";
import { PagedResultTotalDto } from "../../services/dto/pagedResultTotalDto";
import { DuongPhoLapDatDto } from "../../services/duongPhoLapDat/dto/duongPhoLapDatDto";
import duongPhoLapDatService from "../../services/duongPhoLapDat/duongPhoLapDatService";
import getColumnSearchProps from "../../utils/getColumnSearchProps";

export interface ISorterDto {
    property?: ColumnType<DuongPhoLapDatDto>;
    order: string;
}
export interface ITableAction {
    currentPage: number;
    pageSize: number;
    q?: string;
    filter?: IFilterDto[];
    sorter?: ISorterDto;
}

interface IDuongPhoLapDatModelSelectProps {
    visible: boolean;
    handleOk: (item: { value: string; label: string[]; key: string }) => void;
    handleCancel: () => void;
}

const DuongPhoLapDatModelSelect = observer(({ visible, handleOk, handleCancel }: IDuongPhoLapDatModelSelectProps) => {
    const [tableAction, setTableAction] = useState<ITableAction>();
    const [fetching, setFetching] = useState(true);
    const [pagination, setPagination] = useState({ pageSize: 10, total: 0, defaultCurrent: 1, current: 1 });
    const [selection, setSelection] = useState<DuongPhoLapDatDto>();
    const [duongPhoLapDats, setDuongPhoLapDats] = useState<PagedResultTotalDto<DuongPhoLapDatDto>>();

    const fetchData = useCallback(() => {
        (async function run() {
            setFetching(true);
            var items = await duongPhoLapDatService.getAll({
                limit: pagination.pageSize,
                start: (pagination.current - 1) * pagination.pageSize,
                filter: JSON.stringify(tableAction?.filter),
                sort: tableAction?.sorter?.property?.dataIndex?.toString(),
                order: tableAction?.sorter?.order,
            });

            setPagination({ ...pagination, total: items.count });
            setDuongPhoLapDats(items);
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
            title: "Mã đường phố",
            sorter: true,
            dataIndex: ["madpld"],
            key: "madpld",
            fixed: true,
            width: 120,
            render: (text: string, _row: any) => ({ text }),
            ...getColumnSearchProps("madpld"),
        },
        {
            title: "Tên đường",
            dataIndex: "tenduongld",
            key: "tenduongld",
            ...getColumnSearchProps("tenduongld"),
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
                            value: selection.madpld,
                            label: [selection.tenduongld],
                            key: selection.madpld,
                        });
                    }
                }}
                onCancel={() => {
                    handleCancel();
                }}
                open={visible}
                title="Đường"
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
                                        currentPage: pagination.current,
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
                                        currentPage: pagination.current,
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
                            rowKey={(record) => `duongPhoLapDatSelect${record.id}`}
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
                                    currentPage: pagination.current,
                                    sorter: {
                                        property: sorter.field as ColumnType<DuongPhoLapDatDto>,
                                        order: sorter.order === "ascend" ? "ASC" : "DESC",
                                    },
                                    filter: filterDtos,
                                });
                                setPagination(pagination);
                            }}
                            columns={columns as ColumnType<DuongPhoLapDatDto>[]}
                            loading={fetching}
                            scroll={{ x: 1500, y: 300 }}
                            dataSource={duongPhoLapDats === undefined ? [] : duongPhoLapDats.items}
                        />
                    </Col>
                </Row>
            </Modal>
        </>
    );
});
export default DuongPhoLapDatModelSelect;

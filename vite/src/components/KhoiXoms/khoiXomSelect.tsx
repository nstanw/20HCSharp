import { PlusOutlined } from "@ant-design/icons";
import { Divider, Select, Spin } from "antd";
import { LabeledValue } from "antd/lib/select";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { KhoiXomDto } from "../../services/khoiXom/dto/khoiXomDto";
import khoiXomService from "../../services/khoiXom/khoiXomService";
import useDebounce from "../../utils/useDebounce";
import KhoiXomModelSelect from "./khoiXomModelSelect";
const { Option } = Select;

interface ISelectInputProps {
    value?: LabeledValue;
    allowClear?: boolean;
    onClear?: () => void;
    onChange?: (value: LabeledValue) => void;
    defaultValue?: LabeledValue;
    onDropdownVisibleChange?: (open: boolean) => void;
}

const KhoiXomSelect: React.FC<ISelectInputProps> = observer(
    ({ value = undefined, allowClear, onClear, onChange, onDropdownVisibleChange }) => {
        const [fetching, setFetching] = useState(false);
        const [searchTerm, setSearchTerm] = useState("");
        const debouncedSearchTerm = useDebounce(searchTerm, 1000);
        const [khoiXoms, setKhoiXoms] = useState<KhoiXomDto[]>([]);
        const [modelVisible, setModelVisible] = useState<boolean>(false);
        const [selected, setSelected] = useState<string | number | LabeledValue>();

        useEffect(() => {
            (async function run() {
                setFetching(true);
                if (debouncedSearchTerm) {
                    var items = await khoiXomService.getAll({ limit: 5, q: debouncedSearchTerm });
                    setKhoiXoms(items.items);
                } else {
                    setKhoiXoms((await khoiXomService.getAll({ limit: 5 })).items);
                }
                setFetching(false);
            })();
        }, [debouncedSearchTerm]);

        const triggerChange = (changedValue: any) => {
            if (onChange) {
                onChange(changedValue);
            }
        };

        const onSearch = (value: any) => {
            setSearchTerm(value);
        };
        return (
            <>
                <Select
                    allowClear={allowClear}
                    showSearch
                    dropdownRender={(menu) => (
                        <div>
                            {menu}
                            <Divider style={{ margin: "4px 0" }} />
                            <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
                                <a onClick={() => setModelVisible(true)}>
                                    <PlusOutlined /> Tìm kiếm nâng cao
                                </a>
                            </div>
                        </div>
                    )}
                    labelInValue
                    notFoundContent={
                        fetching ? (
                            <Spin size="small" />
                        ) : (
                            <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
                                Không tìm thấy địa chỉ
                            </div>
                        )
                    }
                    onSearch={(value) => onSearch(value)}
                    value={selected || value}
                    filterOption={false}
                    onChange={(selection, _object) => {
                        setSelected(selection);
                        triggerChange(selection);
                    }}
                    onClear={onClear}
                    onDropdownVisibleChange={(open) => onDropdownVisibleChange && onDropdownVisibleChange(open)}
                >
                    {khoiXoms.map((d) => (
                        <Option value={d.makhoi} key={d.makhoi}>
                            {d.tenKhoiPhuongQuan}
                        </Option>
                    ))}
                </Select>
                <KhoiXomModelSelect
                    visible={modelVisible}
                    handleOk={(selection) => {
                        setSelected(selection);
                        triggerChange(selection);
                        setModelVisible(false);
                    }}
                    handleCancel={() => {
                        setModelVisible(false);
                    }}
                ></KhoiXomModelSelect>
            </>
        );
    }
);
export default KhoiXomSelect;

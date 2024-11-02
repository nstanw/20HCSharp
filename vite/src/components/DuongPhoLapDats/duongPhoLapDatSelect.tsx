import React, { useEffect, useState } from "react";
import { Divider } from "antd";
import { Select, Spin } from "antd";
import { observer } from "mobx-react";
import { PlusOutlined } from "@ant-design/icons";
import duongPhoLapDatService from "../../services/duongPhoLapDat/duongPhoLapDatService";
import { DuongPhoLapDatDto } from "../../services/duongPhoLapDat/dto/duongPhoLapDatDto";
import DuongPhoLapDatModelSelect from "./duongPhoLapDatModelSelect";
import { LabeledValue } from "antd/lib/select";
import useDebounce from "../../utils/useDebounce";
const { Option } = Select;

interface ISelectInputProps {
    value?: LabeledValue;
    allowClear?: boolean;
    onClear?: () => void;
    onChange?: (value: LabeledValue) => void;
    defaultValue?: LabeledValue;
}

const DuongPhoLapDatSelect: React.FC<ISelectInputProps> = observer(({ value = undefined, allowClear, onClear, onChange }) => {
    const [fetching, setFetching] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);
    const [duongPhoLapDats, setDuongPhoLapDats] = useState<DuongPhoLapDatDto[]>([]);
    const [modelVisible, setModelVisible] = useState<boolean>(false);
    const [selected, setSelected] = useState<string | number | LabeledValue>();

    useEffect(() => {
        (async function run() {
            setFetching(true);
            if (debouncedSearchTerm) {
                var items = await duongPhoLapDatService.getAll({
                    limit: 5,
                    q: debouncedSearchTerm,
                });
                setDuongPhoLapDats(items.items);
            } else {
                setDuongPhoLapDats((await duongPhoLapDatService.getAll({ limit: 5 })).items);
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
                    fetching ? <Spin size="small" /> : <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>Không tìm thấy đường phố</div>
                }
                onSearch={(value) => onSearch(value)}
                value={selected || value}
                filterOption={false}
                onChange={(selection, _object) => {
                    setSelected(selection);
                    triggerChange(selection);
                }}
                onClear={onClear}
            >
                {duongPhoLapDats.map((d) => (
                    <Option value={d.madpld} key={d.madpld}>
                        {d.tenduongld}
                    </Option>
                ))}
            </Select>
            <DuongPhoLapDatModelSelect
                visible={modelVisible}
                handleOk={(selection) => {
                    setSelected(selection);
                    triggerChange(selection);
                    setModelVisible(false);
                }}
                handleCancel={() => {
                    setModelVisible(false);
                }}
            ></DuongPhoLapDatModelSelect>
        </>
    );
});
export default DuongPhoLapDatSelect;

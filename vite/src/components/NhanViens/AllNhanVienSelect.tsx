import React, { useEffect, useState } from "react";
import { Select, Spin } from "antd";
import { observer } from "mobx-react";
import nhanVienService from "../../services/nhanViens/nhanVienService";
import { NhanVienDto } from "../../services/nhanViens/dto/nhanVienDto";
import { LabeledValue } from "antd/lib/select";
import useDebounce from "../../utils/useDebounce";
const { Option } = Select;

interface ISelectInputProps {
    value?: LabeledValue;
    onChange?: (value: LabeledValue) => void;
    defaultValue?: LabeledValue;
    style?: React.CSSProperties;
}

const AllNhanVienSelect: React.FC<ISelectInputProps> = observer(({ value = undefined, onChange, style }) => {
    const [fetching, setFetching] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);
    const [nhanViens, setNhanViens] = useState<NhanVienDto[]>([]);
    const [selected, setSelected] = useState<string | number | LabeledValue>();

    useEffect(() => {
        (async function run() {
            if (debouncedSearchTerm) {
                // Set isSearching state
                setNhanViens([]);
                setFetching(true);
                // Fire off our API call
                var items = await nhanVienService.getAllViewNhanVien({
                    limit: 500,
                    q: debouncedSearchTerm,
                });
                // Set back to false since request finished
                setFetching(false);
                // Set results state
                setNhanViens(items.items);
            } else {
                setNhanViens((await nhanVienService.getAllViewNhanVien({ limit: 500 })).items);
            }
            setFetching(true);
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
                showSearch
                style={style}
                labelInValue
                allowClear={true}
                notFoundContent={
                    fetching ? (
                        <Spin size="small" />
                    ) : (
                        <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
                            Không tìm thấy đơn nhân viên
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
            >
                {nhanViens.map((d) => (
                    <Option value={d.maNhanVien} key={d.id}>
                        {d.maNhanVien} - {d.hoVaTen}
                    </Option>
                ))}
            </Select>
        </>
    );
});
export default AllNhanVienSelect;

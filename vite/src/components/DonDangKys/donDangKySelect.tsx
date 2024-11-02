import { PlusOutlined } from "@ant-design/icons";
import { Divider, Select, Spin } from "antd";
import { LabeledValue } from "antd/lib/select";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import donDangKyService from "../../services/donDangKy/donDangKyService";
import { DonDangKyDto } from "../../services/donDangKy/dto/donDangKyDto";
import useDebounce from "../../utils/useDebounce";
import DonDangKyModelSelect from "./donDangKyModelSelect";
const { Option } = Select;

interface ISelectInputProps {
    value?: LabeledValue;
    onChange?: (value: LabeledValue) => void;
    defaultValue?: LabeledValue;
}

const DonDangKySelect: React.FC<ISelectInputProps> = observer(({ value = undefined, onChange }) => {
    const [fetching, setFetching] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);
    const [donDangKys, setDonDangKys] = useState<DonDangKyDto[]>([]);
    const [modelVisible, setModelVisible] = useState<boolean>(false);
    const [selected, setSelected] = useState<string | number | LabeledValue>();

    useEffect(() => {
        (async function run() {
            if (debouncedSearchTerm) {
                // Set isSearching state
                setDonDangKys([]);
                setFetching(true);
                // Fire off our API call
                var items = await donDangKyService.getAll({ limit: 5, q: debouncedSearchTerm });
                // Set back to false since request finished
                setFetching(false);
                // Set results state
                setDonDangKys(items.items);
            } else {
                setDonDangKys((await donDangKyService.getAll({ limit: 5 })).items);
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
                        <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>Không tìm thấy đơn đăng ký</div>
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
                {donDangKys.map((d) => (
                    <Option value={d.maddk} key={d.maddk}>
                        {d.maddk}-{d.tenkh}
                    </Option>
                ))}
            </Select>
            <DonDangKyModelSelect
                visible={modelVisible}
                handleOk={(selection) => {
                    setSelected(selection);
                    triggerChange(selection);
                    setModelVisible(false);
                }}
                handleCancel={() => {
                    setModelVisible(false);
                }}
            ></DonDangKyModelSelect>
        </>
    );
});
export default DonDangKySelect;

import { Select, Spin } from "antd";
import { LabeledValue } from "antd/lib/select";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import DMAService from "../../services/dmas/DMAService";
import { DMADto } from "../../services/dmas/dto/DMADto";
import useDebounce from "../../utils/useDebounce";
const { Option } = Select;

interface ISelectInputProps {
  value?: LabeledValue;
  onChange?: (value: LabeledValue, object: DMADto) => void;
  defaultValue?: LabeledValue;
  style?: React.CSSProperties;
}

const DMAGiaoKhoanSelect: React.FC<ISelectInputProps> = observer(({ value = undefined, onChange, style }) => {
  const [fetching, setFetching] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [giaoKhoans, setPhongBans] = useState<DMADto[]>([]);
  const [selected, setSelected] = useState<string | number | LabeledValue>();

  useEffect(() => {
    (async function run() {
      if (debouncedSearchTerm) {
        // Set isSearching state
        setPhongBans([]);
        setFetching(true);
        // Fire off our API call
        var items = await DMAService.getAlls({
          limit: 200,
          q: debouncedSearchTerm,
        });
        // Set back to false since request finished
        setFetching(false);
        // Set results state
        setPhongBans(items.items);
      } else {
        setPhongBans((await DMAService.getAlls({ limit: 200 })).items);
      }
      setFetching(false);
    })();
  }, [debouncedSearchTerm]);

  const triggerChange = (changedValue: any) => {
    if (onChange && changedValue?.key) {
      var item = giaoKhoans.filter((d) => d.id == changedValue.key);
      if (item.length > 0) {
        onChange(changedValue, item[0]);
      }
    }
  };

  const onSearch = (value: any) => {
    setSearchTerm(value);
  };
  return (
    <>
      <Select
        allowClear
        showSearch
        style={style}
        dropdownRender={(menu) => <div>{menu}</div>}
        labelInValue
        notFoundContent={
          fetching ? <Spin size="small" /> : <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>Không tìm thấy DMAID</div>
        }
        onSearch={(value) => onSearch(value)}
        value={selected || value}
        filterOption={false}
        onChange={(selection, _object) => {
          setSelected(selection);
          triggerChange(selection);
        }}
      >
        {giaoKhoans.map((d) => (
          <Option value={d.id.toString()} key={d.id.toString()}>
            {d.tenDMA}
          </Option>
        ))}
      </Select>
    </>
  );
});
export default DMAGiaoKhoanSelect;

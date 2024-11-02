import { Select, Spin } from "antd";
import { LabeledValue } from "antd/lib/select";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { IFilterDto } from "../../models/IFilterDto";
import ViewGiaoKhoan from "../../services/giaoKhoans/dto/ViewGiaoKhoan";
import giaoKhoanService from "../../services/giaoKhoans/giaoKhoanService";
import useDebounce from "../../utils/useDebounce";
const { Option } = Select;

interface ISelectInputProps {
  value?: LabeledValue;
  onChange?: (value: LabeledValue, object: ViewGiaoKhoan) => void;
  defaultFilter?: IFilterDto[];
  style?: React.CSSProperties;
  hangMucPhieuVatTu?: string;
}
// [{ operator: "eq", value: hangMucPhieuVatTu, property: "hangmucphieuvattu" }]
const GiaoKhoanSelect: React.FC<ISelectInputProps> = observer(({ value = undefined, onChange, defaultFilter, style }) => {
  const [fetching, setFetching] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [giaoKhoans, setGiaoKhoans] = useState<ViewGiaoKhoan[]>([]);
  const [selected, setSelected] = useState<string | number | LabeledValue>();

  useEffect(() => {
    (async function run() {
      if (debouncedSearchTerm) {
        // Set isSearching state
        setGiaoKhoans([]);
        setFetching(true);
        // Fire off our API call
        var items = await giaoKhoanService.getAll({
          limit: 5,
          q: debouncedSearchTerm,
          filter: JSON.stringify(defaultFilter || []),
        });
        // Set back to false since request finished
        setFetching(false);
        // Set results state
        setGiaoKhoans(items.items);
      } else {
        setFetching(true);
        setGiaoKhoans((await giaoKhoanService.getAll({ limit: 5, filter: JSON.stringify(defaultFilter) })).items);
        setFetching(false);
      }
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
          fetching ? <Spin size="small" /> : <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>Không tìm thấy bản giao khoán</div>
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
          <Option value={d.id} key={d.id}>
            {d.soBanGiaoKhoan}-{d.nam}
          </Option>
        ))}
      </Select>
    </>
  );
});
export default GiaoKhoanSelect;

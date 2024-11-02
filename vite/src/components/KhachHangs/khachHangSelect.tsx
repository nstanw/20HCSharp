import React, { useEffect, useState } from "react";
import { Divider } from "antd";
import { Select, Spin } from "antd";
import { observer } from "mobx-react";
import { PlusOutlined } from "@ant-design/icons";
import khachHangService from "../../services/khachHang/khachHangService";
import { KhachHangDto } from "../../services/khachHang/dto/khachHangDto";
import KhachHangModelSelect from "./khachHangModelSelect";
import { LabeledValue } from "antd/lib/select";
import useDebounce from "../../utils/useDebounce";
import { IFilterDto } from "../../models/IFilterDto";
const { Option } = Select;

interface ISelectInputProps {
  value?: LabeledValue;
  onChange?: (value: LabeledValue, object: KhachHangDto) => void;
  defaultValue?: LabeledValue;
  searchs?: IFilterDto[];
}

const KhachHangSelect: React.FC<ISelectInputProps> = observer(({ value = undefined, onChange, searchs }) => {
  const [fetching, setFetching] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [khachHangs, setKhachHangs] = useState<KhachHangDto[]>([]);
  const [modelVisible, setModelVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | number | LabeledValue>();

  useEffect(() => {
    (async function run() {
      if (debouncedSearchTerm) {
        // Set isSearching state
        setKhachHangs([]);
        setFetching(true);
        // Fire off our API call
        var items = await khachHangService.getAll({ limit: 5, q: debouncedSearchTerm });
        // Set back to false since request finished
        setFetching(false);
        // Set results state
        setKhachHangs(items.items);
      } else {
        setKhachHangs((await khachHangService.getAll({ limit: 5 })).items);
      }
      setFetching(true);
    })();
  }, [debouncedSearchTerm]);

  const triggerChange = (changedValue: any) => {
    if (onChange && changedValue?.key) {
      var item = khachHangs.filter((d) => d.id == changedValue.key);
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
          fetching ? <Spin size="small" /> : <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>Không tìm thấy đơn đăng ký</div>
        }
        onSearch={(value) => onSearch(value)}
        value={selected || value}
        filterOption={false}
        onChange={(selection, _object) => {
          setSelected(selection);
          triggerChange(selection);
        }}
      >
        {khachHangs.map((d) => (
          <Option value={d.idkh} key={d.idkh}>
            {d.idkh}-{d.tenkh}
          </Option>
        ))}
      </Select>
      <KhachHangModelSelect
        visible={modelVisible}
        handleOk={(selection, object) => {
          setSelected(selection);
          triggerChange(selection);
          setModelVisible(false);
          if (onChange) {
            onChange(selection, object);
          }
        }}
        handleCancel={() => {
          setModelVisible(false);
        }}
        searchs={searchs}
      ></KhachHangModelSelect>
    </>
  );
});
export default KhachHangSelect;

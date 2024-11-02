import { Select, Spin } from "antd";
import { observer } from "mobx-react";
import { useCallback, useEffect, useState } from "react";
import { TDataReturn } from "../../services/nominatim/dtos/dataReturn";
import nominatimService from "../../services/nominatim/nominatimService";
import useDebounce from "../../utils/useDebounce";
import { useStore } from "../../helpers/use-store";
import GeoJSON from "ol/format/GeoJSON";
import Feature from "ol/Feature";
import { Geometry } from "ol/geom";
const { Option } = Select;

const StreetSelectComponent = observer(() => {
    const [bIsFetching, setIsFetching] = useState<boolean>(false);
    const [street, setStreet] = useState<TDataReturn[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);
    const [selected, setSelected] = useState<string>("");
    const { mapStore, overLayerStore } = useStore();
    const { map } = mapStore;
    const { searchStreet } = overLayerStore;

    const onSearch = useCallback((value: string) => {
        setSearchTerm(value);
    }, []);

    const handleSelectSearchStreet = useCallback(
        (selection: string, object: any) => {
            if (!map) return;
            searchStreet?.source.clear();
            setSelected(selection);

            map.getView().setCenter([object.children[1].props.children[0], object.children[1].props.children[2]]);
            map.getView().setZoom(18);

            const optionClicked = object["data-extra"];
            if (optionClicked.geojson) {
                const format = new GeoJSON();
                const feature = format.readFeature(optionClicked.geojson);
                searchStreet?.source.addFeature(feature as Feature<Geometry>);
            }
        },
        [map, searchStreet?.source]
    );

    useEffect(() => {
        (async () => {
            if (debouncedSearchTerm) {
                setStreet([]);
                setIsFetching(true);
                const results = await nominatimService.searchStreetOrAreaInMap({ q: debouncedSearchTerm });
                setStreet(results);
                setIsFetching(false);
            }
        })();
        return () => {
            searchStreet?.source.clear();
        };
    }, [debouncedSearchTerm]);

    return (
        <Select
            allowClear
            showSearch
            dropdownRender={(menu) => <div>{menu}</div>}
            style={{ minWidth: "213px" }}
            labelInValue
            notFoundContent={
                bIsFetching ? (
                    <Spin size="small" />
                ) : (
                    <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>No data</div>
                )
            }
            onSearch={(value) => onSearch(value)}
            value={selected || searchTerm}
            filterOption={false}
            onChange={(selection: any, object) => handleSelectSearchStreet(selection?.value, object)}
            labelRender={() => <>{selected || searchTerm}</>}
        >
            {street.map((item) => (
                <Option
                    value={item.display_name || ""}
                    key={item.place_id}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        width: "fit-content",
                        overflowX: "hidden",
                    }}
                    data-extra={item}
                >
                    <div style={{ fontWeight: "bold", fontSize: "15" }}>{item.display_name}</div>
                    <div style={{ fontSize: "13px", color: "#B8B3B3" }}>
                        {item.lon} - {item.lat}
                    </div>
                </Option>
            ))}
        </Select>
    );
});

export default StreetSelectComponent;

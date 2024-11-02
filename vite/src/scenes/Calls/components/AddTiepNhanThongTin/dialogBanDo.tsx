import { Button, Col, Form, Input, message, Modal, Row, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { Feature } from "ol";
import { Coordinate } from "ol/coordinate";
import GeoJSON from "ol/format/GeoJSON";
import { Geometry, Point } from "ol/geom";
import { useCallback, useEffect, useState } from "react";
import DuongPhoLapDatSelect from "../../../../components/DuongPhoLapDats/duongPhoLapDatSelect";
import KhoiXomSelect from "../../../../components/KhoiXoms/khoiXomSelect";
import BackgroundLayerComponent from "../../../../components/Map/layers/BackgroundLayerComponent";
import LayerGroupComponent from "../../../../components/Map/layers/LayerGroupComponent";
import LayerPositionComponent from "../../../../components/Map/layers/LayerPositionComponent";
import LayerSearchStreetComponent from "../../../../components/Map/layers/LayerSearchStreetComponent";
import MapComponent from "../../../../components/Map/MapComponent";
import { useStore } from "../../../../helpers/use-store";
import { TDataReturn } from "../../../../services/nominatim/dtos/dataReturn";
import nominatimService from "../../../../services/nominatim/nominatimService";
import { BACKGROUND_LAYERS } from "../../../../utils/backgroundLayers";
import { TXacNhanDinhViDiemChayProps } from "./diemChay";
import Style, { StyleLike } from "ol/style/Style";

interface IDialogBanDoProps {
    visible: boolean;
    onDone?: (data: TXacNhanDinhViDiemChayProps) => void;
    onCancel?: () => void;
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const DialogBanDo = observer(({ visible, onDone, onCancel }: IDialogBanDoProps) => {
    const [form] = useForm();
    const { mapStore, overLayerStore } = useStore();
    const { searchStreet, position } = overLayerStore;
    const { map } = mapStore;
    const [spinning, setSpinning] = useState(false);
    const [resultSearchStreet, setResultSearchStreet] = useState<TDataReturn[]>([]);
    const [clickedResult, setClickedResult] = useState<number>(0);
    const [coordinateDiemChay, setCoordinateDiemChay] = useState<Coordinate>();
    const [addressDiemChay, setAddressDiemChay] = useState<string>("");
    const [inputSearch, setInputSearch] = useState<{
        soNha: string;
        tenDuongPho: string;
        maDuongPho: string;
        tenKhoi: string;
        maKhoi: string;
    }>({
        soNha: "",
        tenDuongPho: "",
        maDuongPho: "",
        tenKhoi: "",
        maKhoi: "",
    });
    const [bIsXacNhanDC, setIsXacNhanDC] = useState<boolean>(false);

    const resetState = useCallback(() => {
        form.resetFields();
        setResultSearchStreet([]);
        setClickedResult(0);
        setCoordinateDiemChay(undefined);
        setAddressDiemChay("");
        setInputSearch({
            soNha: "",
            tenDuongPho: "",
            maDuongPho: "",
            tenKhoi: "",
            maKhoi: "",
        });
        searchStreet?.source.clear();
        position?.source.clear();
        message.destroy();
    }, [form, searchStreet?.source, position?.source]);

    const handleDinhViDiemChay = useCallback(
        (clickedCoordinate: Coordinate, address: { street: string; remainingAddress: string }) => {
            setCoordinateDiemChay(clickedCoordinate);
            setAddressDiemChay(`${address.street}, ${address.remainingAddress}`);
        },
        []
    );

    const handleXacNhanDiemChay = useCallback(() => {
        setIsXacNhanDC(false);
        if (!coordinateDiemChay || !addressDiemChay) {
            message.error("Bạn chưa chọn vị trí điểm chảy");
            onCancel && onCancel();
            return;
        }
        // if (!inputSearch?.soNha) {
        //     message.error("Bạn chưa nhập số nhà");
        //     onCancel && onCancel();
        //     return;
        // }
        // if (!inputSearch?.maDuongPho) {
        //     message.error("Bạn chưa chọn đường");
        //     onCancel && onCancel();
        //     return;
        // }
        if (!inputSearch?.maKhoi) {
            message.error("Bạn chưa chọn địa chỉ khối xóm, phường xã");
            onCancel && onCancel();
            return;
        }

        resetState();
        onDone &&
            onDone({
                ...inputSearch,
                coordinateDiemChay,
                addressDiemChay,
            });
    }, [inputSearch, coordinateDiemChay, addressDiemChay, onDone, onCancel, resetState]);

    const handleTimKiem = useCallback(
        async (values: any) => {
            try {
                setInputSearch({
                    ...inputSearch,
                    soNha: values.soNha || "",
                    tenDuongPho: values.maDuongPho?.label || "",
                    maDuongPho: values.maDuongPho?.value || "",
                    tenKhoi: values.maKhoi?.label || "",
                    maKhoi: values.maKhoi?.value || "",
                });
                setResultSearchStreet([]);
                setClickedResult(0);
                setSpinning(true);
                const results = await nominatimService.searchStreetOrAreaInMap({
                    street: values.maDuongPho?.label?.trim() || undefined,
                    city:
                        values.maKhoi?.label
                            ?.split("-")[1]
                            ?.normalize("NFC") // Chuẩn hóa Unicode
                            .trim()
                            .replace(/^(xã|phường|thị trấn)\s+/i, "") || undefined,
                    county:
                        values.maKhoi?.label
                            ?.split("-")[2]
                            ?.normalize("NFC")
                            .trim()
                            .replace(/^(quận|huyện|thành phố)\s+/i, "") || undefined,
                    state: "Nghệ An",
                    country: "Việt Nam",
                });
                setResultSearchStreet(results);

                if (!!map && !!results.length) {
                    const firstItem = results[0];
                    searchStreet?.source.clear();

                    map.getView().setCenter([Number(firstItem.lon), Number(firstItem.lat)]);
                    map.getView().setZoom(18);

                    if (firstItem.geojson) {
                        const format = new GeoJSON();
                        const feature = format.readFeature(firstItem.geojson);
                        searchStreet?.source.addFeature(feature as Feature<Geometry>);

                        if (!!position?.layer && !!position?.source) {
                            position?.source.clear();
                            const iconFeature = new Feature({
                                geometry: new Point([Number(firstItem.lon), Number(firstItem.lat)]),
                            });

                            iconFeature.setStyle((position?.layer.getStyle() as StyleLike) || new Style());
                            position?.source.addFeature(iconFeature);
                        }
                    }
                }
            } catch (error) {
                console.error("Failed: ", error);
            }
            setSpinning(false);
        },
        [map, searchStreet?.source, inputSearch, position?.layer, position?.source]
    );

    const handleSelectResult = useCallback(
        (item: TDataReturn, index: number) => {
            if (!map) return;
            setClickedResult(index);
            searchStreet?.source.clear();

            map.getView().setCenter([Number(item.lon), Number(item.lat)]);
            map.getView().setZoom(18);

            // const optionClicked = object["data-extra"];
            if (item.geojson) {
                const format = new GeoJSON();
                const feature = format.readFeature(item.geojson);
                searchStreet?.source.addFeature(feature as Feature<Geometry>);
            }
        },
        [map, searchStreet?.source]
    );

    const handleClickXacNhanDC = useCallback(() => {
        setIsXacNhanDC(true);
    }, []);

    const handleDropdownVisibleChange = useCallback((open: boolean) => {
        if (open) message.destroy();
    }, []);

    useEffect(() => {
        if (bIsXacNhanDC) handleXacNhanDiemChay();
        return () => {
            resetState();
        };
    }, [bIsXacNhanDC]);

    useEffect(() => {
        if (!visible) {
            resetState();
        }
    }, [visible]);

    return (
        <Modal
            title="Định vị trên bản đồ"
            open={visible}
            width="1900px"
            height="870px"
            okButtonProps={{ disabled: spinning }}
            onCancel={() => onCancel && onCancel()}
            footer={[]}
            style={{ marginTop: "-95px", position: "relative" }}
        >
            <div
                style={{
                    position: "relative",
                    width: "1900",
                    height: "870px",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div
                    style={{
                        position: "relative",
                        height: "8%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#f5f5f5",
                        padding: "16px 30px",
                        borderBottom: "2px solid #ddd",
                        gap: "9px",
                    }}
                >
                    <Form
                        {...layout}
                        form={form}
                        name="advanced_search"
                        className="ant-advanced-search-form"
                        style={{ width: "100%", paddingTop: "15px" }}
                        onFinish={handleTimKiem}
                    >
                        <Row gutter={24}>
                            <Col key="soNha" span={4}>
                                <Form.Item label="Số nhà" name="soNha">
                                    <Input placeholder="Số nhà" />
                                </Form.Item>
                            </Col>

                            <Col key="maDuongPho" span={4}>
                                <Form.Item label="Tên đường" name="maDuongPho">
                                    <DuongPhoLapDatSelect allowClear />
                                </Form.Item>
                            </Col>

                            <Col key="maKhoi" span={12}>
                                <Form.Item label="Khối/xóm, phường/xã, huyện" name="maKhoi">
                                    <KhoiXomSelect
                                        allowClear
                                        onDropdownVisibleChange={(open) => handleDropdownVisibleChange(open)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Button type="primary" htmlType="submit">
                                    Tìm kiếm
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <Spin spinning={spinning}>
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "row",
                            paddingTop: "12px",
                        }}
                    >
                        <div
                            style={{
                                position: "relative",
                                width: "357px",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                paddingRight: "15px",
                                overflowX: "hidden",
                                overflowY: "auto",
                                gap: "9px",
                            }}
                        >
                            {!!resultSearchStreet.length ? (
                                resultSearchStreet.map((item, idx) => (
                                    <div
                                        key={`${item.lon} - ${item.lat}`}
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            padding: "4px 8px",
                                            backgroundColor: idx === clickedResult ? "#D9E7F7" : "#F0F7FF",
                                            border: "2px solid",
                                            borderColor: idx === clickedResult ? "#9DB9E4" : "#D7E7FF",
                                            cursor: "pointer",
                                            borderRadius: "3px",
                                            minHeight: "5em",
                                        }}
                                        onClick={() => handleSelectResult(item, idx)}
                                    >
                                        <div style={{ fontWeight: "bold", fontSize: "15" }}>{item.display_name}</div>
                                        <div style={{ fontSize: "13px", color: "#B8B3B3" }}>
                                            {item.lon} - {item.lat}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div
                                    style={{
                                        color: "#b3b3b3",
                                        fontStyle: "italic",
                                        fontSize: "14px",
                                        textAlign: "center",
                                        marginTop: "30px",
                                    }}
                                >
                                    No search results found
                                </div>
                            )}
                        </div>
                        <div style={{ position: "relative", width: "100%", height: "100%" }}>
                            <MapComponent
                                zoom={13}
                                center={[105.680258, 18.688113]}
                                bIsAllowXacNhan={!!inputSearch.maKhoi}
                                onSelectDiemChay={handleDinhViDiemChay}
                                onClickXacNhanDiemChay={handleClickXacNhanDC}
                            >
                                <LayerGroupComponent title="Bản đồ nền" typeOfLayerGroup="background">
                                    {BACKGROUND_LAYERS.map((layer, index) => {
                                        return (
                                            <div key={`bgLayer-${index}`}>
                                                <BackgroundLayerComponent
                                                    source={layer.source}
                                                    type={layer.type}
                                                    title={layer.title}
                                                    visible={layer.visible}
                                                />
                                            </div>
                                        );
                                    })}
                                </LayerGroupComponent>
                                <LayerGroupComponent title="Lớp bản đồ" typeOfLayerGroup="overlay">
                                    <LayerPositionComponent />
                                    <LayerSearchStreetComponent />
                                </LayerGroupComponent>
                            </MapComponent>
                        </div>
                    </div>
                </Spin>
            </div>
        </Modal>
    );
});

export default DialogBanDo;

import { EnvironmentTwoTone } from "@ant-design/icons";
import { Button, message, Modal } from "antd";
import { observer } from "mobx-react";
import { Feature, Map, MapBrowserEvent, View } from "ol";
import { Coordinate } from "ol/coordinate";
import { Point } from "ol/geom";
import { Style } from "ol/style";
import { StyleLike } from "ol/style/Style";
import { useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "../../helpers/use-store";
import nominatimService from "../../services/nominatim/nominatimService";

interface ImapComponentProps {
    children: React.ReactNode;
    zoom: number;
    center: number[];
    bIsAllowXacNhan: boolean;
    onSelectDiemChay?: (clickedCoordinate: Coordinate, address: { street: string; remainingAddress: string }) => void;
    onClickXacNhanDiemChay?: () => void;
}

const MapComponent = observer(
    ({ zoom, center, bIsAllowXacNhan, onSelectDiemChay, onClickXacNhanDiemChay, children }: ImapComponentProps) => {
        const { mapStore, overLayerStore } = useStore();
        const { map } = mapStore;
        const { position } = overLayerStore;
        const mapId = useRef<HTMLDivElement | null>(null);
        const [bIsConfirming, setIsConfirming] = useState<boolean>(false);

        const fetchAddressFromCoordinates = useCallback(async (lon: number, lat: number) => {
            try {
                const data = await nominatimService.getAddressFromCoordinates({ lon, lat });
                if (data && data.display_name) {
                    // Tách địa chỉ từ Nominatim
                    const addressParts = data.display_name.split(", ");
                    const street = addressParts[0]; // Phần đầu là tên đường
                    const remainingAddress = addressParts.slice(1).join(", "); // Các phần còn lại
                    return { street, remainingAddress };
                } else {
                    return { street: "No address found", remainingAddress: "" };
                }
            } catch (error) {
                console.error("Error fetching address:", error);
                return { street: "Error fetching address", remainingAddress: "" };
            }
        }, []);

        const handlePointerMove = useCallback((_e: React.MouseEvent<HTMLDivElement>) => {}, []);

        const handleDragMap = useCallback(() => {}, []);

        const handleClickMap = useCallback(
            async (event: MapBrowserEvent<UIEvent>) => {
                if (!map) return;
                const clickedCoordinate = event.coordinate;
                // if (Number(map.getView().getZoom()) < DEFAULT_ZOOM_DINH_VI) {
                //     map.getView().setCenter(clickedCoordinate);
                //     map.getView().setZoom(DEFAULT_ZOOM_DINH_VI);
                // }

                if (!!position?.layer && !!position?.source) {
                    position?.source.clear();
                    const iconFeature = new Feature({
                        geometry: new Point(clickedCoordinate),
                    });

                    iconFeature.setStyle((position?.layer.getStyle() as StyleLike) || new Style());
                    position?.source.addFeature(iconFeature);
                }

                const address = await fetchAddressFromCoordinates(clickedCoordinate[0], clickedCoordinate[1]);
                const messageContent = (
                    <div
                        style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "start" }}
                    >
                        <EnvironmentTwoTone style={{ fontSize: 75 }} />
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                            <div style={{ fontWeight: "bold", fontSize: "15px" }}>{address.street}</div>
                            <div style={{ color: "#B8B3B3", fontSize: "13px" }}>{address.remainingAddress}</div>
                            <hr style={{ width: "100%", borderTop: "#B8B3B3" }} />
                            <div
                                style={{
                                    width: "100%",
                                    gap: "15px",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ color: "#038FC2" }}>
                                    {clickedCoordinate[0].toFixed(6)}, {clickedCoordinate[1].toFixed(6)}
                                </div>
                                <Button
                                    type="primary"
                                    key="diemChay"
                                    onClick={async () => {
                                        message.destroy();
                                        setIsConfirming(true);
                                        Modal.confirm({
                                            title: "Xác nhận điểm chảy",
                                            content: "Bạn có chắc chắn hoàn thành định vị điểm chảy ?",
                                            onOk: () => {
                                                setIsConfirming(false);
                                                message.destroy();
                                                position?.source.clear();
                                                onClickXacNhanDiemChay && onClickXacNhanDiemChay();
                                            },
                                            onCancel: () => {
                                                message.open({
                                                    content: messageContent,
                                                    duration: 0,
                                                    style: {
                                                        position: "fixed",
                                                        top: 168,
                                                        right: "42%",
                                                        transform: "translateX(50%)",
                                                    },
                                                });
                                                setIsConfirming(false);
                                            },
                                        });
                                    }}
                                    disabled={!bIsAllowXacNhan || bIsConfirming}
                                >
                                    {!bIsAllowXacNhan ? "Tìm kiếm khối xóm trước khi xác nhận" : "Xác nhận điểm chảy"}
                                </Button>
                            </div>
                        </div>
                    </div>
                );
                message.destroy();
                message.open({
                    content: messageContent,
                    duration: 0,
                    style: {
                        position: "fixed",
                        top: 168,
                        right: "42%",
                        transform: "translateX(50%)",
                    },
                });
                onSelectDiemChay && onSelectDiemChay(clickedCoordinate, address);
            },
            [
                map,
                bIsConfirming,
                position?.layer,
                position?.source,
                bIsAllowXacNhan,
                onSelectDiemChay,
                onClickXacNhanDiemChay,
                fetchAddressFromCoordinates,
            ]
        );

        useEffect(() => {
            if (!mapId.current) return;
            const newMap = new Map({
                target: mapId.current,
                layers: [],
                view: new View({ projection: "EPSG:4326", center, zoom }),
            });
            mapStore.setMap(newMap);
            return () => {
                if (!newMap) return;
                newMap.setTarget(undefined);
                mapStore.resetMap();
                overLayerStore.resetPositionLayer();
                position?.source.clear();
            };
        }, []);

        useEffect(() => {
            if (!!map) {
                if (bIsAllowXacNhan) {
                    map.on("click", handleClickMap);
                    map.getViewport().style.cursor = "pointer";
                } else {
                    map.un("click", handleClickMap);
                    map.getViewport().style.cursor = "default";
                }
            }

            return () => {
                map && map.un("click", handleClickMap);
            };
        }, [map, bIsAllowXacNhan]);

        // useEffect(() => {
        //     if (!!map && !!position && !!mapId.current) mapId.current.click();
        // }, [map, position, handleClickMap]);

        return (
            <div
                ref={mapId}
                style={{ position: "absolute", top: 0, left: 0, width: "1519px", height: "762px", overflow: "hidden" }}
                onPointerMove={handlePointerMove}
                onDrag={handleDragMap}
            >
                {children}
            </div>
        );
    }
);

export default MapComponent;

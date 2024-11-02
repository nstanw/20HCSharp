import { ReactNode, useEffect } from "react";
import { useStore } from "../../../helpers/use-store";
import LayerGroup from "ol/layer/Group";
import LayerSwitcher from "ol-layerswitcher";
import { observer } from "mobx-react";

interface ILayerGroupComponentProps {
    title: string;
    typeOfLayerGroup: "background" | "overlay";
    children: ReactNode;
}

const LayerGroupComponent = observer(({ title, typeOfLayerGroup, children }: ILayerGroupComponentProps) => {
    const { mapStore } = useStore();
    const { map } = mapStore;

    useEffect(() => {
        if (!map) return;
        const layerGroup = new LayerGroup({
            layers: [],
            properties: {
                title,
            },
        });
        if (typeOfLayerGroup === "background") mapStore.setBackgroundLayers(layerGroup);
        else mapStore.setOverLayers(layerGroup);

        map.getLayers().push(layerGroup);

        const layerSwitcher = new LayerSwitcher();
        map.addControl(layerSwitcher);

        return () => {
            map.removeLayer(layerGroup);
            map.removeControl(layerSwitcher);
            mapStore.resetBackgroundLayers();
            mapStore.resetOverLayers();
        };
    }, [map]);

    return <>{children}</>;
});

export default LayerGroupComponent;

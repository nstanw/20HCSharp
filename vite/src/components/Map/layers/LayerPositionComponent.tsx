import { useEffect } from "react";
import { useStore } from "../../../helpers/use-store";
import { useLayerPosition } from "../../../hooks/layers/useLayerPosition";
import { observer } from "mobx-react";

const LayerPositionComponent = observer(() => {
    const { mapStore, overLayerStore } = useStore();
    const { overLayers } = mapStore;
    const [sourcePosition, layerPosition] = useLayerPosition();

    useEffect(() => {
        if (!overLayers || !sourcePosition || !layerPosition) return;
        overLayers.getLayers().push(layerPosition);
        overLayerStore.setPositionLayer({ source: sourcePosition, layer: layerPosition });

        return () => {
            overLayerStore.resetPositionLayer();
        };
    }, [overLayers, sourcePosition, layerPosition]);

    return <></>;
});

export default LayerPositionComponent;

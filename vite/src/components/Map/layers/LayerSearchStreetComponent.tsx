import { observer } from "mobx-react";
import { useEffect } from "react";
import { useStore } from "../../../helpers/use-store";
import { useLayerSearchStreet } from "../../../hooks/layers/useLayerSearchStreet";

const LayerSearchStreetComponent = observer(() => {
    const { mapStore, overLayerStore } = useStore();
    const { overLayers } = mapStore;
    const [sourceSearchStreet, layerSearchStreet] = useLayerSearchStreet();

    useEffect(() => {
        if (!overLayers || !sourceSearchStreet || !layerSearchStreet) return;
        overLayers.getLayers().push(layerSearchStreet);
        overLayerStore.setSearchStreetLayer({ source: sourceSearchStreet, layer: layerSearchStreet });

        return () => {
            overLayerStore.resetSearchStreetLayer();
        };
    }, [overLayers, sourceSearchStreet, layerSearchStreet]);

    return <></>;
});

export default LayerSearchStreetComponent;

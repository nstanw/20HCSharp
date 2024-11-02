import TileLayer from "ol/layer/Tile";
import TileSource from "ol/source/Tile";
import { useEffect } from "react";
import { useStore } from "../../../helpers/use-store";
import { observer } from "mobx-react";

interface IBackgroundLayerComponentProps {
    source?: TileSource;
    type?: string;
    title?: string;
    visible?: boolean;
}

const BackgroundLayerComponent = observer(({ source, type, title, visible }: IBackgroundLayerComponentProps) => {
    const { mapStore } = useStore();
    const { backgroundLayers } = mapStore;

    useEffect(() => {
        if (!backgroundLayers) return;
        const bgLayer = new TileLayer({
            source,
            visible,
            properties: {
                title,
                type,
            },
        });
        backgroundLayers.getLayers().push(bgLayer);
    }, [backgroundLayers, source, type, title, visible]);

    return <></>;
});

export default BackgroundLayerComponent;

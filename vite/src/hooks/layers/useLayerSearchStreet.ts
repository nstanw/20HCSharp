import { FeatureLike } from "ol/Feature";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";
import { useEffect, useState } from "react";

export const useLayerSearchStreet = (): [
    VectorSource | undefined,
    VectorLayer<VectorSource<FeatureLike>> | undefined
] => {
    const [sourceSearchStreet, setSourceSearchStreet] = useState<VectorSource>();
    const [layerSearchStreet, setLayerSearchStreet] = useState<VectorLayer<VectorSource<FeatureLike>>>();

    useEffect(() => {
        const source = new VectorSource();
        setSourceSearchStreet(source);

        const layer = new VectorLayer({
            source: source as VectorSource<FeatureLike>,
            visible: true,
            style: (_feature, _resolution) => {
                return new Style({
                    stroke: new Stroke({
                        color: "rgba(0, 0, 255, 0.8)",
                        width: 6,
                    }),
                    fill: new Fill({
                        color: "rgba(255, 0, 0, 0.1)",
                    }),
                });
            },
            properties: {
                title: undefined,
            },
        });
        setLayerSearchStreet(layer);
    }, []);

    return [sourceSearchStreet, layerSearchStreet];
};

import { FeatureLike } from "ol/Feature";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Icon, Style } from "ol/style";
import { useEffect, useState } from "react";
import AppConsts from "../../utils/appconst";

export const useLayerPosition = (): [VectorSource | undefined, VectorLayer<VectorSource<FeatureLike>> | undefined] => {
    const [sourcePosition, setSourcePosition] = useState<VectorSource>();
    const [layerPosition, setLayerPosition] = useState<VectorLayer<VectorSource<FeatureLike>>>();

    useEffect(() => {
        const source = new VectorSource();
        setSourcePosition(source);

        const layer = new VectorLayer({
            source: source as VectorSource<FeatureLike>,
            visible: true,
            style: (_feature, resolution) => {
                return new Style({
                    image: new Icon({
                        crossOrigin: "anonymous",
                        src: `${AppConsts.appBaseUrl}/images/position.png`,
                        // eslint-disable-next-line no-loss-of-precision
                        scale: resolution < 0.0000011352848569004527 ? 0.045 : 0.036,
                        anchor: [0.5, 0.9],
                    }),
                });
            },
            properties: {
                title: "Bản đồ vị trí điểm chảy",
            },
        });
        setLayerPosition(layer);
    }, []);

    return [sourcePosition, layerPosition];
};

import { makeAutoObservable } from "mobx";
import { FeatureLike } from "ol/Feature";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

type TLayer = {
    source: VectorSource;
    layer: VectorLayer<VectorSource<FeatureLike>>;
};

class OverLayerStore {
    constructor() {
        makeAutoObservable(this); // Không cần dùng decorators
    }

    position: TLayer | null = null;
    searchStreet: TLayer | null = null;

    public setPositionLayer(nLayer: TLayer) {
        this.position = nLayer;
    }

    public resetPositionLayer() {
        this.position = null;
    }

    public setSearchStreetLayer(nLayer: TLayer) {
        this.searchStreet = nLayer;
    }

    public resetSearchStreetLayer() {
        this.searchStreet = null;
    }
}

export default OverLayerStore;

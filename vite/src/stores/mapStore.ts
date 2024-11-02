import { makeAutoObservable } from "mobx";
import { Map } from "ol";
import LayerGroup from "ol/layer/Group";

class MapStore {
    constructor() {
        makeAutoObservable(this); // Không cần dùng decorators
    }

    map: Map | null = null;
    backgroundLayers: LayerGroup | null = null;
    overLayers: LayerGroup | null = null;

    public setMap(newMap: Map) {
        this.map = newMap;
    }

    public resetMap() {
        this.map = null;
    }

    public setBackgroundLayers(layer: LayerGroup) {
        this.backgroundLayers = layer;
    }

    public resetBackgroundLayers() {
        this.backgroundLayers = null;
    }

    public setOverLayers(layer: LayerGroup) {
        this.overLayers = layer;
    }

    public resetOverLayers() {
        this.overLayers = null;
    }
}

export default MapStore;

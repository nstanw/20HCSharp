import GeoJSON from "ol/format/GeoJSON";

export type TDataReturn = {
    addresstype?: string;
    boundingbox?: number[];
    category?: string;
    display_name?: string;
    importance?: number;
    lat?: string;
    lon?: string;
    licence?: string;
    name?: string;
    osm_id?: number;
    osm_type?: string;
    place_id?: number;
    place_rank?: number;
    type?: string;
    class?: string;
    geojson?: GeoJSON;
};

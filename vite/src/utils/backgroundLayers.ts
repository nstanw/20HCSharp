import { OSM, XYZ } from "ol/source";

type TConfigBGLayers = {
    source?: XYZ | OSM;
    type?: string;
    title?: string;
    visible?: boolean;
};

export const BACKGROUND_LAYERS: TConfigBGLayers[] = [
    {
        source: new XYZ({ url: "http://mt{0-3}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" }),
        type: "base",
        title: "Google Roadmap",
        visible: false,
    },
    {
        source: new XYZ({ url: "http://mt{0-3}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" }),
        type: "base",
        title: "Google Terrain",
        visible: true,
    },
    {
        source: new XYZ({ url: "http://mt{0-3}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" }),
        type: "base",
        title: "Google Satellite ",
        visible: false,
    },
    {
        source: new OSM(),
        type: "base",
        title: "OSM",
        visible: false,
    },
    {
        type: "base",
        title: "Ẩn bản đổ nền",
        visible: false,
    },
];

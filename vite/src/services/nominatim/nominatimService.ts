import axios from "axios";
import { TCoordinate } from "./dtos/coordinate";
import { TDataReturn } from "./dtos/dataReturn";
import { TSearchStreetOrAreaInMap } from "./dtos/searchStreetOrAreaInMap";

class NominatimService {
    public async getAddressFromCoordinates(params: TCoordinate): Promise<TDataReturn> {
        const result = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${params.lat}&lon=${params.lon}&zoom=18&addressdetails=1`
        );
        return result.data;
    }

    public async searchStreetOrAreaInMap(params: TSearchStreetOrAreaInMap): Promise<TDataReturn[]> {
        const result = await axios.get(
            // "https://nominatim.openstreetmap.org/search.php?polygon_geojson=1&format=jsonv2&viewbox=103.8745552,18.5521172,106.1664675,20.0023505&bounded=1",
            "https://nominatim.openstreetmap.org/search.php?polygon_geojson=1&format=jsonv2",
            { params }
        );
        return result.data;
    }
}

export default new NominatimService();

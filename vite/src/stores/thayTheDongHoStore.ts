import { makeAutoObservable } from "mobx";
import TableResult from "../models/TableResult";
import ViewThayTheDongHo from "../models/ThayTheDongHos/ViewThayTheDongHo";
import thayTheDongHoService from "../services/thayTheDongHos/thayTheDongHoService";
import { pushFilterDto2 } from "../utils/pushFilterDto2";

class ThayTheDongHoStore {
    constructor() {
        makeAutoObservable(this); // Không cần dùng decorators
    }

    traCuuHoSos = new TableResult<ViewThayTheDongHo>();
    thayTheDongHoDetail = new ViewThayTheDongHo();

    getTraCuuHoSos = async () => {
        this.traCuuHoSos = { ...this.traCuuHoSos, isLoadding: true };
        var filters = this.traCuuHoSos.filterO;
        pushFilterDto2(filters, {
            property: "LOAIDK",
            value: "TDH1",
            operator: "eq",
        });
        pushFilterDto2(filters, {
            property: "ishuy",
            value: "0",
            operator: "eq",
        });
        let result = await thayTheDongHoService.getAll({
            limit: this.traCuuHoSos.sizePage,
            start: this.traCuuHoSos.skipCount,
            q: this.traCuuHoSos.q,
            filter: JSON.stringify(filters),
        });
        this.traCuuHoSos = { ...this.traCuuHoSos, result: result, isLoadding: false };
    };

    async getViewThayTheDongHo(maddk: string) {
        var result = await thayTheDongHoService.get(maddk);
        this.thayTheDongHoDetail = result;
    }
}
export default ThayTheDongHoStore;

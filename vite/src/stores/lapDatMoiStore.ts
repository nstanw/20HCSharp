import { makeAutoObservable } from "mobx";
import TableResult from "../models/TableResult";
// import { pushFilterDto2 } from '../utils/pushFilterDto2';
import ViewLapDatMoi2 from "../models/LapDatMois/ViewLapDatMoi2";
import lapDatMoi2Service from "../services/lapDatMois/lapDatMoi2Service";
import { pushFilterDto2 } from "../utils/pushFilterDto2";

class LapDatMoiStore {
    constructor() {
        makeAutoObservable(this); // Đảm bảo các thuộc tính của store trở thành observable
    }

    donDangKyTrungs = new TableResult<ViewLapDatMoi2>();
    traCuuDonLapDatMois = new TableResult<ViewLapDatMoi2>();
    lapDatMoiDetail = new ViewLapDatMoi2();

    async getViewLapDatMoi(maddk: string) {
        var result = await lapDatMoi2Service.get(maddk);
        this.lapDatMoiDetail = result;
    }

    async getDonDangKyTrungs() {
        this.donDangKyTrungs.isLoadding = true;
        var filters = this.donDangKyTrungs.filterO;
        // pushFilterDto2(filters,{
        //     property: 'TTPD', value: 'PD_A', operator: 'eq',
        // });
        const result = await lapDatMoi2Service.getAll({
            limit: this.donDangKyTrungs.sizePage,
            start: this.donDangKyTrungs.skipCount,
            filter: JSON.stringify(filters),
        });

        this.donDangKyTrungs = { ...this.donDangKyTrungs, result: result };
    }
    async getTraCuuDonLapDatMois() {
        this.traCuuDonLapDatMois.isLoadding = true;
        var filters = this.traCuuDonLapDatMois.filterO;
        pushFilterDto2(filters, {
            property: "LOAIDK",
            value: "LDM",
            operator: "eq",
        });
        const result = await lapDatMoi2Service.getAll({
            limit: this.traCuuDonLapDatMois.sizePage,
            start: this.traCuuDonLapDatMois.skipCount,
            q: this.traCuuDonLapDatMois.q,
            filter: JSON.stringify(filters),
        });
        this.traCuuDonLapDatMois = { ...this.traCuuDonLapDatMois, result: result, isLoadding: false };
    }
}

export default LapDatMoiStore;

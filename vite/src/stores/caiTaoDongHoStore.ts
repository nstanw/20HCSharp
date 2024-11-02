import { makeAutoObservable } from "mobx";
import ViewCaiTaoDongHo from "../models/CaiTaoDongHos/ViewCaiTaoDongHo";
import TableResult from "../models/TableResult";
import caiTaoDongHoService from "../services/caiTaoDongHos/caiTaoDongHoService";
import { pushFilterDto2 } from "../utils/pushFilterDto2";

class CaiTaoDongHoStore {
    constructor() {
        makeAutoObservable(this); // Không cần dùng decorators
    }
    // tổng hợp
    traCuuHoSos = new TableResult<ViewCaiTaoDongHo>();
    caiTaoDongHoDetail = new ViewCaiTaoDongHo();

    // danh sách hồ sơ đã hoàn thành và xác nhận dự toán
    getTraCuuHoSos = async () => {
        this.traCuuHoSos = { ...this.traCuuHoSos, isLoadding: true };
        var filters = this.traCuuHoSos.filterO;
        pushFilterDto2(filters, {
            property: "LOAIDK",
            value: "DMA",
            operator: "eq",
        });
        pushFilterDto2(filters, {
            property: "ishuy",
            value: "0",
            operator: "eq",
        });

        let result = await caiTaoDongHoService.getAll({
            limit: this.traCuuHoSos.sizePage,
            start: this.traCuuHoSos.skipCount,
            q: this.traCuuHoSos.q,
            filter: JSON.stringify(filters),
        });
        this.traCuuHoSos = { ...this.traCuuHoSos, result: result, isLoadding: false };
    };

    async getViewCaiTaoDongHo(maddk: string) {
        var result = await caiTaoDongHoService.get(maddk);
        this.caiTaoDongHoDetail = result;
    }
}

export default CaiTaoDongHoStore;

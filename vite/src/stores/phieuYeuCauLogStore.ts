import { makeAutoObservable } from "mobx";
import TableResult from "../models/TableResult";
import phieuYeuCauLogService from "../services/phieuYeuCauLog/phieuYeuCauLogService";
import { CongViecPhieuYeuCauDto } from "./../services/phieuYeuCauLog/dto/CongViecPhieuYeuCauDto";
import { ViewPhieuYeuCauLog } from "./../services/phieuYeuCauLog/dto/ViewPhieuYeuCauLog";

class PhieuYeuCauLogStore {
    constructor() {
        makeAutoObservable(this); // Đảm bảo các thuộc tính của store trở thành observable
    }

    phieuYeuCauLogs = new TableResult<ViewPhieuYeuCauLog>();
    congViecPhieuYeuCaus = new TableResult<CongViecPhieuYeuCauDto>();

    async getAll(phieuYeuCauID: number) {
        let result = await phieuYeuCauLogService.getAll({
            limit: this.phieuYeuCauLogs.sizePage,
            start: this.phieuYeuCauLogs.skipCount,
            phieuYeuCauID: phieuYeuCauID,
        });
        this.phieuYeuCauLogs = { ...this.phieuYeuCauLogs, result: result };
    }

    async getAllCongViecPhieuYeuCau(phieuYeuCauID: number) {
        let result = await phieuYeuCauLogService.getAllCongViecPhieuYeuCau({
            limit: this.congViecPhieuYeuCaus.sizePage,
            start: this.congViecPhieuYeuCaus.skipCount,
            phieuYeuCauID: phieuYeuCauID,
        });
        this.congViecPhieuYeuCaus = { ...this.congViecPhieuYeuCaus, result: result };
    }
}

export default PhieuYeuCauLogStore;

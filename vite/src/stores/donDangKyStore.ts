import { makeAutoObservable } from "mobx";
import TableResult from "../models/TableResult";
import donDangKyService from "../services/donDangKy/donDangKyService";
import { pushFilterDto2 } from "../utils/pushFilterDto2";
import { DonDangKyDto } from "./../services/donDangKy/dto/donDangKyDto";

class DonDangKyStore {
    constructor() {
        makeAutoObservable(this); // Không cần dùng decorators
    }

    donDangKyOfSoDienThoais = new TableResult<DonDangKyDto>();
    donDangKyTrungs = new TableResult<DonDangKyDto>();

    async getAllDonDangKyOfSoDienThoai(soDienThoai: string) {
        const result = await donDangKyService.getAllOfSoDienThoai({
            limit: this.donDangKyOfSoDienThoais.sizePage,
            start: this.donDangKyOfSoDienThoais.skipCount,
            q: soDienThoai,
        });
        this.donDangKyOfSoDienThoais = { ...this.donDangKyOfSoDienThoais, result: result };
    }

    async getDonDangKyTrungs(_soDienThoai: string) {
        this.donDangKyTrungs.isLoadding = true;
        var filters = this.donDangKyTrungs.filterO;

        pushFilterDto2(filters, {
            property: "TTPD",
            value: "PD_A",
            operator: "eq",
        });

        const result = await donDangKyService.getAll({
            limit: this.donDangKyTrungs.sizePage,
            start: this.donDangKyTrungs.skipCount,
            filter: JSON.stringify(filters),
        });

        this.donDangKyTrungs = { ...this.donDangKyTrungs, result: result };
    }
}

export default DonDangKyStore;

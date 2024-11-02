import { makeAutoObservable } from "mobx";
import TableResult from "../models/TableResult";
import khachHangService from "../services/khachHang/khachHangService";
import { KhachHangDto } from "./../services/khachHang/dto/khachHangDto";

class KhachHangStore {
    constructor() {
        makeAutoObservable(this); // Không cần dùng decorators
    }

    khachHangOfSoDienThoais = new TableResult<KhachHangDto>();

    async getAllKhachHangOfSoDienThoai(soDienThoai: string) {
        let result = await khachHangService.getAllOfSoDienThoai({
            limit: this.khachHangOfSoDienThoais.sizePage,
            start: this.khachHangOfSoDienThoais.skipCount,
            q: soDienThoai,
        });
        this.khachHangOfSoDienThoais = { ...this.khachHangOfSoDienThoais, result: result };
    }
}

export default KhachHangStore;

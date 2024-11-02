import { makeAutoObservable } from "mobx";
import ThanhToanDto from "../models/CongNos/ThanhToanDto";
import congNoService from "../services/congNos/congNoService";

class CongNoStore {
    constructor() {
        makeAutoObservable(this); // Không cần dùng decorators
    }
    thanhToan = new ThanhToanDto();

    async getThanhToans(id: string) {
        let result = await congNoService.getThanhToans(id);
        this.thanhToan = result;
    }
}

export default CongNoStore;

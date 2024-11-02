import { makeAutoObservable } from "mobx";
import TableResult from "../models/TableResult";
import CreateDonDangKyLapDatMoiInput from "../models/TiepNhanThongTins/createDonDangKyInput";
import CreateSuaChuaSuCoInput from "../models/TiepNhanThongTins/createSuaChuaSuCoInput";
import CreateThayTheDongHoInput from "../models/TiepNhanThongTins/createThayTheDongHoInput";
import CreateTiepNhanThongTinInput from "../models/TiepNhanThongTins/createTiepNhanThongTinInput";
import ViewTiepNhanThongTinModel from "../models/TiepNhanThongTins/tiepNhanThongTinModel";
import { ViewTiepNhanThongTin } from "../services/tiepNhanThongTin/dto/viewTiepNhanThongTin";
import tiepNhanThongTinServices from "../services/tiepNhanThongTin/tiepNhanThongTinServices";

class TiepNhanThongTinStore {
    constructor() {
        makeAutoObservable(this); // Không cần dùng decorators
    }

    tiepNhanThongTinsOfSoDienThoai: TableResult<ViewTiepNhanThongTin> = new TableResult<ViewTiepNhanThongTin>();
    tiepNhanThongTinsOfLinkedid: TableResult<ViewTiepNhanThongTin> = new TableResult<ViewTiepNhanThongTin>();
    tiepNhanThongTins: TableResult<ViewTiepNhanThongTin> = new TableResult<ViewTiepNhanThongTin>();
    viewTiepNhanThongTinModel = new ViewTiepNhanThongTinModel();

    async getAllViewTiepNhanThongTinOfSoDienThoai(soDienThoai: string) {
        let result = await tiepNhanThongTinServices.getAllViewTiepNhanThongTinOfSoDienThoai(soDienThoai);
        this.tiepNhanThongTinsOfSoDienThoai = { ...this.tiepNhanThongTinsOfLinkedid, result: result };
    }

    async getAllViewTiepNhanThongTinOfLinkedID(linkedid: string) {
        let result = await tiepNhanThongTinServices.getAllViewTiepNhanThongTinOfLinkedID(linkedid);
        this.tiepNhanThongTinsOfLinkedid = { ...this.tiepNhanThongTinsOfLinkedid, result: result };
    }

    async getAll() {
        let result = await tiepNhanThongTinServices.getAll({
            limit: this.tiepNhanThongTins.sizePage,
            start: this.tiepNhanThongTins.skipCount,
            q: this.tiepNhanThongTins.q,
            filter: this.tiepNhanThongTins.filter,
        });
        this.tiepNhanThongTins = { ...this.tiepNhanThongTins, result: result };
    }

    async create(input: CreateTiepNhanThongTinInput) {
        let result = await tiepNhanThongTinServices.create(input);
        try {
            this.getAllViewTiepNhanThongTinOfLinkedID(result.linkedID);
            this.getAllViewTiepNhanThongTinOfSoDienThoai(result.soDienThoaiKhachHang);
        } catch (error) {
            console.log(error);
        }
    }

    async createTiepNhanThongTin(input: CreateTiepNhanThongTinInput) {
        let result = await tiepNhanThongTinServices.createTiepNhanThongTin(input);
        try {
            this.getAllViewTiepNhanThongTinOfLinkedID(result.linkedID);
            this.getAllViewTiepNhanThongTinOfSoDienThoai(result.soDienThoaiKhachHang);
        } catch (error) {
            console.log(error);
        }
    }

    async createDonDangKyLapDatMoi(input: CreateDonDangKyLapDatMoiInput) {
        let result = await tiepNhanThongTinServices.createDonDangKyLapDatMoi(input);
        this.getAllViewTiepNhanThongTinOfLinkedID(result.linkedID);
        this.getAllViewTiepNhanThongTinOfSoDienThoai(result.soDienThoaiKhachHang);
    }

    async createSuaChuaSuCo(input: CreateSuaChuaSuCoInput) {
        let result = await tiepNhanThongTinServices.createSuaChuaSuCo(input);
        this.getAllViewTiepNhanThongTinOfLinkedID(result.linkedID);
        this.getAllViewTiepNhanThongTinOfSoDienThoai(result.soDienThoaiKhachHang);
    }

    async createDonDangKyThayTheDongHo(input: CreateThayTheDongHoInput) {
        let result = await tiepNhanThongTinServices.createDonDangKyThayTheDongHo(input);
        this.getAllViewTiepNhanThongTinOfLinkedID(result.linkedID);
        this.getAllViewTiepNhanThongTinOfSoDienThoai(result.soDienThoaiKhachHang);
    }

    async get(id: string) {
        var result = await tiepNhanThongTinServices.get(id);
        this.viewTiepNhanThongTinModel = result.result;
    }
}

export default TiepNhanThongTinStore;

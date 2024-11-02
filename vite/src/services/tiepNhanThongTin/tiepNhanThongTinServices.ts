import { InputGetAllDto } from "./../dto/inputGetAllDto";
import { PagedResultTotalDto } from "../dto/pagedResultTotalDto";
import { ViewTiepNhanThongTin } from "./dto/viewTiepNhanThongTin";
import http from "../httpService";
import CreateTiepNhanThongTinInput from "../../models/TiepNhanThongTins/createTiepNhanThongTinInput";
import CreateDonDangKyLapDatMoiInput from "../../models/TiepNhanThongTins/createDonDangKyInput";
import CreateThayTheDongHoInput from "../../models/TiepNhanThongTins/createThayTheDongHoInput";
import CreateSuaChuaSuCoInput from "../../models/TiepNhanThongTins/createSuaChuaSuCoInput";

class TiepNhanThongTinService {
    public async create(input: CreateTiepNhanThongTinInput): Promise<ViewTiepNhanThongTin> {
        let result = await http.post("api/services/app/TiepNhanThongTin/CreateYKienKhachHang", input);
        return result.data.result;
    }

    public async createTiepNhanThongTin(input: CreateTiepNhanThongTinInput): Promise<ViewTiepNhanThongTin> {
        let result = await http.post("api/services/app/TiepNhanThongTin/CreateTiepNhanThongTin", input);
        return result.data.result;
    }

    public async createDonDangKyLapDatMoi(input: CreateDonDangKyLapDatMoiInput): Promise<ViewTiepNhanThongTin> {
        let result = await http.post("api/services/app/TiepNhanThongTin/CreateDonDangKyLapDatMoi", input);
        return result.data.result;
    }

    public async createSuaChuaSuCo(input: CreateSuaChuaSuCoInput): Promise<ViewTiepNhanThongTin> {
        let result = await http.post("api/services/app/TiepNhanThongTin/CreateSuaChuaSuCo", input);
        return result.data.result;
    }

    public async createDonDangKyThayTheDongHo(input: CreateThayTheDongHoInput): Promise<ViewTiepNhanThongTin> {
        let result = await http.post("api/services/app/TiepNhanThongTin/CreateDonDangKyThayTheDongHo", input);
        return result.data.result;
    }

    public async getAllViewTiepNhanThongTinOfSoDienThoai(
        soDienThoai: string
    ): Promise<PagedResultTotalDto<ViewTiepNhanThongTin>> {
        let result = await http.get("api/services/app/TiepNhanThongTin/GetAllViewTiepNhanThongTinOfSoDienThoai", {
            params: { soDienThoai: soDienThoai },
        });
        return result.data.result;
    }

    public async getAllViewTiepNhanThongTinOfLinkedID(
        linkedid: string
    ): Promise<PagedResultTotalDto<ViewTiepNhanThongTin>> {
        let result = await http.get("api/services/app/TiepNhanThongTin/GetAllViewTiepNhanThongTinOfLinkedID", {
            params: { linkedid: linkedid },
        });
        return result.data.result;
    }

    public async getAll(input: InputGetAllDto): Promise<PagedResultTotalDto<ViewTiepNhanThongTin>> {
        let result = await http.get("api/services/app/TiepNhanThongTin/GetAll", { params: input });
        return result.data.result;
    }

    public async get(id: string) {
        let result = await http.get("api/services/app/TiepNhanThongTin/GetTiepNhanThongTin", { params: { id: id } });
        return result.data;
    }
}

export default new TiepNhanThongTinService();

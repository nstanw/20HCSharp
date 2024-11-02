import { DonDangKyDto } from "../donDangKy/dto/donDangKyDto";
import { InputGetAllDto } from "../dto/inputGetAllDto";
import { PagedResultTotalDto } from "../dto/pagedResultTotalDto";
import http from "../httpService";
import { AddLichSuDienThoaiOfKhachHangNgheMayInput } from "./dto/AddLichSuDienThoaiOfKhachHangNgheMayInput";

class LichSuDienThoaiService {
    public async getAllDanhSachCanGoiDienThoai(input: InputGetAllDto): Promise<PagedResultTotalDto<DonDangKyDto>> {
        let result = await http.get("api/services/app/LichSuDienThoai/GetAllDanhSachCanGoiDienThoai", {
            params: input,
        });
        return result.data.result;
    }
    public async addLichSuDienThoaiOfKhachHangNgheMay(
        input: AddLichSuDienThoaiOfKhachHangNgheMayInput
    ): Promise<PagedResultTotalDto<DonDangKyDto>> {
        let result = await http.post("api/services/app/LichSuDienThoai/AddLichSuDienThoaiOfKhachHangNgheMay", input);
        return result.data.result;
    }
    public async addLichSuDienThoaiOfKhachHangKhongNgheMay(
        input: AddLichSuDienThoaiOfKhachHangNgheMayInput
    ): Promise<PagedResultTotalDto<DonDangKyDto>> {
        let result = await http.post(
            "api/services/app/LichSuDienThoai/AddLichSuDienThoaiOfKhachHangKhongNgheMay",
            input
        );
        return result.data.result;
    }
    public async checkDaGoiDu3CuocPerDay(phieuYeuCauID: number): Promise<number> {
        let result = await http.post("api/services/app/LichSuDienThoai/CheckDaGoiDu3CuocPerDay",null, {
            params: { phieuYeuCauID: phieuYeuCauID },
        });
        return result.data.result;
    }
}

export default new LichSuDienThoaiService();

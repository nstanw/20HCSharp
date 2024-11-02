import httpService from "../httpService";
import { ViewHocKyNang } from "./dto/hocKyNangDto";
import { PagedResultTotalDto } from "../dto/pagedResultTotalDto";
import type { InputGetAllDto } from "../dto/inputGetAllDto";
import http from "../httpService";

class HocKyNangService {


  public async getAll(input: InputGetAllDto): Promise<PagedResultTotalDto<ViewHocKyNang>> {
    const result = await http.get('api/services/app/HocKyNangAppServices/GetAll', { params: input});
    return result.data.result;
  }

  public async createHocKyNang(hocKyNangId: number): Promise<void> {
    await httpService.post(
      `/api/services/app/HocKyNangAppServices/CreateHocKyNang?hocKyNangId=${hocKyNangId}`
    );
  }

  public async hoanThanhKyNang(hocKyNangId: number): Promise<void> {
    await httpService.post(
      `/api/services/app/HocKyNangAppServices/HoanThanhKyNang?hocKyNangId=${hocKyNangId}`
    );
  }
}

export default new HocKyNangService();

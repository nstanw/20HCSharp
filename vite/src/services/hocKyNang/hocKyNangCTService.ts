import type { InputGetAllDto } from "../dto/inputGetAllDto";
import type { PagedResultTotalDto } from "../dto/pagedResultTotalDto";
import http from "../httpService";
import type { ViewHocKyNangCT } from "./dto/viewHocKyNangCT";

class HocKyNangCTService {
  public async getAll(input: InputGetAllDto): Promise<PagedResultTotalDto<ViewHocKyNangCT>> {
    const result = await http.get('/api/services/app/HocKyNangCTAppServices/GetAll', { params: input});
    return result.data.result;
  }
}

export default new HocKyNangCTService();

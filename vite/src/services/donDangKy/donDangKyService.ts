import { PagedResultTotalDto } from '../dto/pagedResultTotalDto';
import { DonDangKyDto } from './dto/donDangKyDto';
import http from '../httpService';
import { InputGetAllDto } from '../dto/inputGetAllDto';

class DonDangKyService {
  public async getAll(input: InputGetAllDto): Promise<PagedResultTotalDto<DonDangKyDto>> {
    let result = await http.get('api/services/app/DonDangKy/GetAll', { params: input});
    return result.data.result;
  }
  public async getAllOfSoDienThoai(input: InputGetAllDto): Promise<PagedResultTotalDto<DonDangKyDto>> {
    let result = await http.get('api/services/app/DonDangKy/GetAllOfSoDienThoai', { params: input });
    return result.data.result;
  }

}

export default new DonDangKyService();

import { PagedResultTotalDto } from '../dto/pagedResultTotalDto';
import { KhoiXomDto } from './dto/khoiXomDto';
import http from '../httpService';
import { InputGetAllDto } from '../dto/inputGetAllDto';

class KhoiXomService {
  public async getAll(input: InputGetAllDto): Promise<PagedResultTotalDto<KhoiXomDto>> {
    let result = await http.get('api/services/app/Khoi/GetAllView', { params: input});
    return result.data.result;
  }
}

export default new KhoiXomService();

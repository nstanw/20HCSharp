import { InputGetAllDto } from '../dto/inputGetAllDto';
import { PagedResultTotalDto } from '../dto/pagedResultTotalDto';
import http from '../httpService';
import ViewGiaoKhoan from './dto/ViewGiaoKhoan';

class GiaoKhoanServices {
  public async getAll(input: InputGetAllDto): Promise<PagedResultTotalDto<ViewGiaoKhoan>> {
    let result = await http.get('api/services/app/GiaoKhoan/GetAll', { params: input });
    return result.data.result;
  }
}

export default new GiaoKhoanServices();

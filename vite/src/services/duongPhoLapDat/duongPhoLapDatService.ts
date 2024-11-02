import { PagedResultTotalDto } from '../dto/pagedResultTotalDto';
import { DuongPhoLapDatDto } from './dto/duongPhoLapDatDto';
import http from '../httpService';
import { InputGetAllDto } from '../dto/inputGetAllDto';

class DuongPhoLapDatService {
  public async getAll(input: InputGetAllDto): Promise<PagedResultTotalDto<DuongPhoLapDatDto>> {
    let result = await http.get('api/services/app/DuongPhoLD/GetAll', { params: input});
    return result.data.result;
  }
}

export default new DuongPhoLapDatService();

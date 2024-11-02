import { DMADto } from './dto/DMADto';
import { PagedResultTotalDto } from '../dto/pagedResultTotalDto';
import http from '../httpService';
import { InputGetAllDto } from '../dto/inputGetAllDto';

class DMAService {
  public async getAlls(input: InputGetAllDto): Promise<PagedResultTotalDto<DMADto>> {
    let result = await http.get('api/services/app/DMA/GetAll', { params: input });
    return result.data.result;
  }
}
export default new DMAService();

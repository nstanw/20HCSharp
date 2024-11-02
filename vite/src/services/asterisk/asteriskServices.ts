import { PagedResultTotalDto } from '../dto/pagedResultTotalDto';
import { CallLogDto } from './dto/callLogDto';
import { CreateCallLogDto } from './dto/createCallLogDto';
import { InputGetAllDto } from '../dto/inputGetAllDto'

import http from '../httpService';
import { ViewCELReport } from './dto/viewCELReport';
import { UpdateCallLogDto } from './dto/updateCallLogDto';

class AsteriskService {
  public async create(createCallLogDto: CreateCallLogDto): Promise<CallLogDto> {
    let result = await http.post('api/services/app/Asterisk/CreateCallLogAsync', createCallLogDto);
    return result.data.result;
  }
  public async updateCallLog(input: UpdateCallLogDto): Promise<CallLogDto> {
    let result = await http.put('api/services/app/Asterisk/UpdateCallLogAsync', input);
    return result.data.result;
  }
  public async get(id: string) {
    let result = await http.get('api/services/app/Asterisk/Get', { params: {id:id} });
    return result.data;
  }

  public async getAll(input: InputGetAllDto): Promise<PagedResultTotalDto<CallLogDto>> {
    let result = await http.get('api/services/app/Asterisk/GetAll', { params: input });
    return result.data.result;
  }

  public async getAllCallHistory(input: InputGetAllDto): Promise<PagedResultTotalDto<ViewCELReport>> {
    let result = await http.get('api/services/app/Asterisk/GetAllCallHistory', { params: input });
    return result.data.result;
  }
}

export default new AsteriskService();

import { InputGetAllDto } from './../dto/inputGetAllDto';
import { PagedResultTotalDto } from '../dto/pagedResultTotalDto';
import http from '../httpService';
import ViewThayTheDongHo from '../../models/ThayTheDongHos/ViewThayTheDongHo';

class ThayTheDongHoServices {
   
    public async getAll(input: InputGetAllDto): Promise<PagedResultTotalDto<ViewThayTheDongHo>> {
        let result = await http.get('api/services/app/ThayTheDongHo2/GetAll', { params: input });
        return result.data.result;
    }
    public async get(maddk: string) {
        let result = await http.get('api/services/app/ThayTheDongHo2/GetViewThayTheDongHo', { params: { maddk: maddk } });
        return result.data.result;
    }
}

export default new ThayTheDongHoServices();

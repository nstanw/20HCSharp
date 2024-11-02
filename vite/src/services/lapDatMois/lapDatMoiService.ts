import { InputGetAllDto } from './../dto/inputGetAllDto';
import { PagedResultTotalDto } from '../dto/pagedResultTotalDto';
import http from '../httpService';
import ViewLapDatMoi from '../../models/LapDatMois/ViewLapDatMoi';

class LapDatMoiServices {
    public async getAll(input: InputGetAllDto): Promise<PagedResultTotalDto<ViewLapDatMoi>> {
        let result = await http.get('api/services/app/LapDatMoi/GetAll', { params: input });
        return result.data.result;
    }
    public async get(maddk: string) {
        let result = await http.get('api/services/app/LapDatMoi/GetViewLapDatMoi', { params: { maddk: maddk } });
        return result.data.result;
    }
}

export default new LapDatMoiServices();

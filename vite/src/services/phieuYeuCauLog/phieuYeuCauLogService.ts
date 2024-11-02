import { CongViecPhieuYeuCauDto } from './dto/CongViecPhieuYeuCauDto';
import { InputGetAllPhieuYeuCauLogDto } from './dto/InputGetAllPhieuYeuCauLogDto';
import { PagedResultTotalDto } from '../dto/pagedResultTotalDto';
import http from '../httpService';
import { ViewPhieuYeuCauLog } from './dto/ViewPhieuYeuCauLog';

class PhieuYeuCauLogService {
    public async getAll(input: InputGetAllPhieuYeuCauLogDto): Promise<PagedResultTotalDto<ViewPhieuYeuCauLog>> {
        let result = await http.get('api/services/app/PhieuYeuCau/GetPhieuYeuCauLogs', { params: input });
        return result.data.result;
    }
    public async getAllCongViecPhieuYeuCau(input: InputGetAllPhieuYeuCauLogDto): Promise<PagedResultTotalDto<CongViecPhieuYeuCauDto>> {
        let result = await http.get('api/services/app/PhieuYeuCau/GetAllCongViecPhieuYeuCau', { params: input });
        return result.data.result;
    }
    
}

export default new PhieuYeuCauLogService();

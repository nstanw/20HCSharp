import http from '../httpService';
import ThanhToanDto from '../../models/CongNos/ThanhToanDto';
import InputThuTienMatDto from '../../models/CongNos/InputThuTienMatDto';

class CongNoService {
  public async getThanhToans(idkh: string): Promise<ThanhToanDto> {
    let result = await http.get('api/services/app/ThanhToan/GetThanhToan', { params: {idkh: idkh}});
    return result.data.result;
  }
  public async thuTaiQuay(input: InputThuTienMatDto): Promise<ThanhToanDto> {
    let result = await http.post('api/services/app/ThanhToan/ThuTaiQuay', input);
    return result.data.result;
  }
}

export default new CongNoService();

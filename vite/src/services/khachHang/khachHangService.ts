import { PagedResultTotalDto } from '../dto/pagedResultTotalDto';
import { KhachHangDto } from './dto/khachHangDto';
import http from '../httpService';
import { InputGetAllDto } from '../dto/inputGetAllDto';
import { ChangePhoneInput } from './dto/changePhoneDto';

class KhachHangService {
  public async getAll(input: InputGetAllDto): Promise<PagedResultTotalDto<KhachHangDto>> {
    let result = await http.get('api/services/app/KhachHang/GetAll', { params: input});
    return result.data.result;
  }
  public async getAllOfSoDienThoai(input: InputGetAllDto): Promise<PagedResultTotalDto<KhachHangDto>> {
    let result = await http.get('api/services/app/KhachHang/GetAllKhachHangOfSoDienThoai', { params: input });
    return result.data.result;
  }
  public async getViewKhachHang(idkh: string): Promise<KhachHangDto>  {
    let result = await http.get('api/services/app/KhachHang/GetViewKhachHang', { params: { id: idkh } });
    return result.data.result;
  }
  public async UpdatePhone(input: ChangePhoneInput): Promise<KhachHangDto> {
    let result = await http.post('/api/services/app/KhachHang/ChangePhone', input);
    return result.data.result;
  }
}

export default new KhachHangService();

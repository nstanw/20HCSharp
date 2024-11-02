import { NhanVienDto } from './dto/nhanVienDto';
import { PagedResultTotalDto } from '../dto/pagedResultTotalDto';
import http from '../httpService';
import { InputGetAllDto } from '../dto/inputGetAllDto';
import { NhanVienDto1 } from './dto/nhanVienDto1';

class NhanVienService {
  public async getAllViewNhanVienOfCongViec(input: InputGetAllDto): Promise<PagedResultTotalDto<NhanVienDto>> {
    let result = await http.get('api/services/app/NhanVien/GetAllViewNhanVienOfCongViec', { params: input });
    return result.data.result;
  }

  public async getAllViewNhanVien(input: InputGetAllDto) : Promise<PagedResultTotalDto<NhanVienDto>> {
    let result = await http.get('api/services/app/NhanVien/GetAllViewNhanVien', { params: input });
    return result.data.result;
  }

  public async getAllNhanVienDuPhong(): Promise<PagedResultTotalDto<NhanVienDto>> {
    let result = await http.get('api/services/app/NhanVien/GetAllViewNhanVienDuPhong');
    return result.data.result;
  }

  public async getAllNhanVienChuaXacNhan(input: InputGetAllDto): Promise<PagedResultTotalDto<NhanVienDto1>> {
    let result = await http.get('api/services/app/NgayLamViec/GetAllNhanVienChuaXacNhan', { params: input });
    return result.data.result;
  }
}

export default new NhanVienService();

import ChiTietThanhToanDto from './ChiTietThanhToanDto'

class ThanhToanDto {
    idkh!: string
    sodb!: string
    tongTienConNo!: number
    tongTienPhaiTra!: number
    ghiChu!: number
    kyThanhToans!: ChiTietThanhToanDto[]
}

export default ThanhToanDto;

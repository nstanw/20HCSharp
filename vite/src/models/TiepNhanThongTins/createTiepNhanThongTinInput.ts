class CreateTiepNhanThongTinInput {
    LoaiThongTin!:string;
    SoDienThoaiKhachHang!:string;
    HoTenKhachHang?:string;
    DiaChiKhachHang?:string;
    DiaChiLamViec?: string;
    HoTenNguoiBaoTin!:string;
    MADDK?:string;
    IDKH?:string;
    LinkedID?:string;
    GhiChu?:string;
    NoiDungYeuCau!:string;
    MaPhongBan!: string;
    NoiDungCongViecDaHoanThanh!: string;
}

export default CreateTiepNhanThongTinInput;

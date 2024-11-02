class CreateDonDangKyLapDatMoiInput {
  // thông tin cuộc gọi
  LinkedID!: string;
  MADB!: string;
  // thông tin người đại điện ký hợp đồng
  HoTenKhachHang!: string;
  DiaChiThuongTru!: string;
  SoCMND!: string;
  DiDong!: string;
  DiaChiLapDatMoi!: string;
  //Thông tin quyền sử dụng đất
  LoaiGiayChungNhanQuyenSuDungDat!: string;
  QSDDAT_HoTen!: string;
  QSDDAT_DiaChiLoDat!: string;
  QSDDAT_SoGiayChungNhan!: string;
  QSDDAT_LoaiGiayChungNhan!: string;
  QSDDAT_NgayCap!: Date;
  QSDDAT_NoiDungKhac!: string;
  //Nhu cầu sử dụng nước
  NhuCauSuDungNuoc!: string;
  // lịch sử dụng nước
  HinhThucLapDat!: string;
  MaKhachHangDauNoiLai!: string;
  // Mục đích sử dụng nước
  MucDichSuDungNuoc!: string;
  // thời gian khách hàng cần lắp đặt
  ThoiGianKhachHangCanLapMoi!: Date;
  NoiCapCMND!: string;
  NgayCapCMND!: Date;
  DiaChiLapDatMoi_MaKhoi!: string;
  DiaChiLapDatMoi_SoNha!: string;
  DiaChiLapDatMoi_MaDuong!: string;
  XacNhanKhachHangNopTienKhaoSatLai!: boolean;
  MaDonKhaoSatTruoc?: string;
  MAKV?: string;
  giaokhoanid?: number;
}

export default CreateDonDangKyLapDatMoiInput;

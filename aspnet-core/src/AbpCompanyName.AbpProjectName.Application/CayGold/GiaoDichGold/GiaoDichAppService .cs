using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using AbpCompanyName.AbpProjectName.CayGold.GiaoDich.Dto;
using AbpCompanyName.AbpProjectName.DTO;
using AbpCompanyName.AbpProjectName.Model.CayGold;
using AbpCompanyName.AbpProjectName.Model.CayGold.KhachHang;
using AbpCompanyName.AbpProjectName.Model.CayGold.TaiKhoan;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AbpCompanyName.AbpProjectName.CayGold.GiaoDichAppservices
{
    public class GiaoDichAppService : ApplicationService
    {
        private readonly IRepository<ViewGiaoDichGold> _viewGiaoDichGoldRepository;
        private readonly IRepository<GiaoDichGold> _giaoDichRepository;
        private readonly IRepository<TaiKhoan, string> _taiKhoanhRepository;
        private readonly IRepository<KHACHANG, string> _khacHangRepository;
        public GiaoDichAppService(
            IRepository<ViewGiaoDichGold> viewGiaoDichGoldRepository
           , IRepository<GiaoDichGold> giaoDichRepository
           , IRepository<TaiKhoan, string> taiKhoanhRepository
           , IRepository<KHACHANG, string> khacHangRepository
            )
        {
            _viewGiaoDichGoldRepository = viewGiaoDichGoldRepository;
            _giaoDichRepository = giaoDichRepository;
            _taiKhoanhRepository = taiKhoanhRepository;
            _khacHangRepository = khacHangRepository;
        }

        public PagedResultTotalDto<ViewGiaoDichGold> GetAll(InputGetAllDto input)
        {
            var tasks = _viewGiaoDichGoldRepository.GetAll();
            if (!string.IsNullOrEmpty(input.q))
            {
                tasks = tasks.Where(d => d.TenTaiKhoan.Equals(input.q)
                    || d.MaKhachHang.Contains(input.q)
                );
            }
            if (input.filter != null)
            {
                var filters = JsonConvert.DeserializeObject<List<FilterDto>>(input.filter);
                foreach (var filter in filters)
                {
                    var eq = filter.Operator;
                    if (filter.Value != null)
                        switch (filter.Property.ToLower().Trim())
                        {
                            case "q":
                                var q1 = (string)filter.Value;
                                tasks = tasks.Where(p => p.TenTaiKhoan.Contains(q1)
                                    || p.MaKhachHang.Contains(q1)
                                );
                                break;
                            case "tententaikhoan":
                                var tententaikhoan = (string)filter.Value;
                                tasks = tasks.Where(p => p.TenTaiKhoan.Contains(tententaikhoan));
                                break;
                            case "makhachhang":
                                var makhachhang = (string)filter.Value;

                                tasks = tasks.Where(p => p.MaKhachHang == makhachhang);

                                break;
                        }
                }
            }
            tasks = tasks.OrderBy(d => d.NgayGiaoDich);
            var totalCount = tasks.Count();
            if (input.start.HasValue)
                tasks = tasks.Skip(input.start.Value);
            if (input.limit.HasValue)
                tasks = tasks.Take(input.limit.Value);
            var list = tasks.ToList();
            return new PagedResultTotalDto<ViewGiaoDichGold>(totalCount, list);
        }
        public bool CreateGiaoDichGold(CreateGiaoDichGold input)
        {
            #region kiểm tra khách hàng có chưa, chưa có lập mới
            var khachHangCayGold = _khacHangRepository.FirstOrDefault(d => d.MaKhachHang == input.MaKhachHang);
            if (khachHangCayGold == null)
            {
                khachHangCayGold = new KHACHANG()
                {
                    MaKhachHang = input.MaKhachHang,
                    FullName = input.FullName,
                    Note = input.NoteKhachHang,
                    SoTienConNo = 0,
                    SoTienConThua = 0,
                };
                _khacHangRepository.Insert(khachHangCayGold);
                CurrentUnitOfWork.SaveChanges();
            }
            #endregion

            #region Trường hợp trả nợ không cày gold
            //trả nợ
            if (input.IsThanhToanNo)
            {

                if (khachHangCayGold.SoTienConNo <= 0)
                {
                    throw new UserFriendlyException("Khách Hàng đã trả hết nợ hoặc chưa có nợ!");
                }

                //trả chưa hết nợ
                if (khachHangCayGold.SoTienConNo > input.SoTienThanhToan)
                {
                    khachHangCayGold.SoTienConNo -= input.SoTienThanhToan;
                }

                //trả hết nợ
                if (khachHangCayGold.SoTienConNo == input.SoTienThanhToan)
                {
                    khachHangCayGold.SoTienConNo = 0;
                }

                //trả thừa
                if (khachHangCayGold.SoTienConNo < input.SoTienThanhToan)
                {
                    khachHangCayGold.SoTienConThua = input.SoTienThanhToan - khachHangCayGold.SoTienConNo;
                    khachHangCayGold.SoTienConNo = 0;
                }
                _khacHangRepository.Update(khachHangCayGold);
                CurrentUnitOfWork.SaveChanges();

                var newGiaoDichTraNo = new GiaoDichGold()
                {
                    NgayGiaoDich = input.NgayGiaoDich,
                    IsChuaThanhToan = false,
                    IsThanhToanNo = true,
                    MaKhachHang = khachHangCayGold.MaKhachHang,
                    SoGold = 0,
                    SoTienThanhToan = input.SoTienThanhToan,
                    SoTienNo = 0,
                };
                _giaoDichRepository.Insert(newGiaoDichTraNo);
                CurrentUnitOfWork.SaveChanges();
                return true;
            }
            #endregion

            #region kiểm tra tài khoản có chưa, chưa có lập mới
            if (input.TenTaiKhoan == "")
            {
                throw new UserFriendlyException("Chưa nhập tài khoản");
            }
            var taiKhoanCayGold = _taiKhoanhRepository.FirstOrDefault(d => d.TenTaiKhoan == input.TenTaiKhoan);
            if (taiKhoanCayGold == null)
            {
                taiKhoanCayGold = new TaiKhoan()
                {
                    TenTaiKhoan = input.TenTaiKhoan,
                    MatKhau = input.MatKhau,
                    Note = input.NoteTaiKhoan,
                    LoaiTaiKhoan = input.LoaiTaiKhoan
                };
                _taiKhoanhRepository.Insert(taiKhoanCayGold);
                CurrentUnitOfWork.SaveChanges();
            }
            #endregion

            #region Trường hợp khách cày nhưng vẫn nợ tiền hoặc nợ hoàn toàn
            if (input.IsChuaThanhToan)
            {
                //Cộng thêm vào nợ
                khachHangCayGold.SoTienConNo += input.SoTienNo;

                //kiểm tra xem đang dư bao nhiêu thì trừ bớt
                if (khachHangCayGold.SoTienConThua > 0)
                {
                    //thừa lớn hơn nợ mới
                    if (khachHangCayGold.SoTienConThua - input.SoTienNo > 0)
                    {
                        khachHangCayGold.SoTienConThua = khachHangCayGold.SoTienConThua - input.SoTienNo;
                        khachHangCayGold.SoTienConNo = 0;
                    }
                    //thừ nhỏ hơn nợ mới
                    if (khachHangCayGold.SoTienConThua - input.SoTienNo < 0)
                    {
                        khachHangCayGold.SoTienConThua = 0;
                        khachHangCayGold.SoTienConNo = input.SoTienNo - khachHangCayGold.SoTienConThua;
                    }
                }
                _khacHangRepository.Update(khachHangCayGold);
                CurrentUnitOfWork.SaveChanges();

                var newGiaoDichNo = new GiaoDichGold()
                {
                    NgayGiaoDich = input.NgayGiaoDich,
                    TenTaiKhoan = taiKhoanCayGold.TenTaiKhoan,
                    IsChuaThanhToan = true,
                    IsThanhToanNo = false,
                    MaKhachHang = khachHangCayGold.MaKhachHang,
                    SoTienThanhToan = input.SoTienThanhToan,
                    SoGold = input.SoGold,
                    SoTienNo = input.SoTienNo,
                    TTCG = input.TTCG
                };
                _giaoDichRepository.Insert(newGiaoDichNo);
                CurrentUnitOfWork.SaveChanges();
            }
            #endregion
            else
            {
                #region giaoDich khách cày và trả nợ đầy đủ
                var newGiaoDich = new GiaoDichGold()
                {
                    NgayGiaoDich = input.NgayGiaoDich,
                    TenTaiKhoan = taiKhoanCayGold.TenTaiKhoan,
                    IsChuaThanhToan = false,
                    IsThanhToanNo = false,
                    MaKhachHang = khachHangCayGold.MaKhachHang,
                    SoGold = input.SoGold,
                    SoTienThanhToan = input.SoTienThanhToan,
                    SoTienNo = input.SoTienNo,
                    TTCG = input.TTCG
                };
                _giaoDichRepository.Insert(newGiaoDich);
                CurrentUnitOfWork.SaveChanges();
                #endregion
            }

            return true;
        }

        public bool EditGiaoDichGold(EditGiaoDichGold input)
        {

            var giaoDich = _giaoDichRepository.FirstOrDefault(d => d.MaGiaoDich == input.MaGiaoDich);
            if (giaoDich == null)
            {
                throw new UserFriendlyException("Không thấy giao dịch");
            }

            #region kiểm tra khách hàng có chưa
            var khachHangCayGold = _khacHangRepository.FirstOrDefault(d => d.MaKhachHang == input.MaKhachHang);
            if (khachHangCayGold == null)
            {
                throw new UserFriendlyException("Khách không tìm thấy!");
            }
            #endregion

            #region kiểm tra tài khoản có chưa

            if (input.TenTaiKhoan == "")
            {
                throw new UserFriendlyException("Chưa nhập tài khoản");
            }
            var taiKhoanCayGold = _taiKhoanhRepository.FirstOrDefault(d => d.TenTaiKhoan == input.TenTaiKhoan);
            if (taiKhoanCayGold == null)
            {
                throw new UserFriendlyException("Không thấy tài khoản");
            }
            #endregion

            #region Trường hợp trả nợ không cày gold
            //trả nợ
            if (input.IsThanhToanNo)
            {
                if (khachHangCayGold.SoTienConNo <= 0)
                {
                    throw new UserFriendlyException("Khách Hàng đã trả hết nợ hoặc chưa có nợ!");
                }

                //trả chưa hết nợ
                if (khachHangCayGold.SoTienConNo > input.SoTienThanhToan)
                {
                    khachHangCayGold.SoTienConNo -= input.SoTienThanhToan;
                }

                //trả hết nợ
                if (khachHangCayGold.SoTienConNo == input.SoTienThanhToan)
                {
                    khachHangCayGold.SoTienConNo = 0;
                }

                //trả thừa
                if (khachHangCayGold.SoTienConNo < input.SoTienThanhToan)
                {
                    khachHangCayGold.SoTienConThua = input.SoTienThanhToan - khachHangCayGold.SoTienConNo;
                    khachHangCayGold.SoTienConNo = 0;
                }
                _khacHangRepository.Update(khachHangCayGold);
                CurrentUnitOfWork.SaveChanges();


                giaoDich.NgayGiaoDich = input.NgayGiaoDich;
                giaoDich.IsChuaThanhToan = false;
                giaoDich.IsThanhToanNo = true;
                giaoDich.MaKhachHang = khachHangCayGold.MaKhachHang;
                giaoDich.SoGold = 0;
                giaoDich.SoTienThanhToan = input.SoTienThanhToan;

                _giaoDichRepository.Update(giaoDich);
                CurrentUnitOfWork.SaveChanges();
                return true;
            }
            #endregion

            #region Trường hợp khách cày nhưng vẫn nợ tiền hoặc nợ hoàn toàn
            if (input.IsChuaThanhToan)
            {
                //Cộng thêm vào nợ
                khachHangCayGold.SoTienConNo += input.SoTienNo;

                //kiểm tra xem đang dư bao nhiêu thì trừ bớt
                if (khachHangCayGold.SoTienConThua > 0)
                {
                    //thừa lớn hơn nợ mới
                    if (khachHangCayGold.SoTienConThua - input.SoTienNo > 0)
                    {
                        khachHangCayGold.SoTienConThua = khachHangCayGold.SoTienConThua - input.SoTienNo;
                        khachHangCayGold.SoTienConNo = 0;
                    }
                    //thừ nhỏ hơn nợ mới
                    if (khachHangCayGold.SoTienConThua - input.SoTienNo < 0)
                    {
                        khachHangCayGold.SoTienConThua = 0;
                        khachHangCayGold.SoTienConNo = input.SoTienNo - khachHangCayGold.SoTienConThua;
                    }
                }
                _khacHangRepository.Update(khachHangCayGold);
                CurrentUnitOfWork.SaveChanges();

                giaoDich.NgayGiaoDich = input.NgayGiaoDich;
                giaoDich.TenTaiKhoan = taiKhoanCayGold.TenTaiKhoan;
                giaoDich.IsChuaThanhToan = true;
                giaoDich.IsThanhToanNo = false;
                giaoDich.MaKhachHang = khachHangCayGold.MaKhachHang;
                giaoDich.SoTienThanhToan = input.SoTienThanhToan;
                giaoDich.SoGold = input.SoGold;
                giaoDich.SoTienNo = input.SoTienNo;
                giaoDich.TTCG = input.TTCG;

                _giaoDichRepository.Update(giaoDich);
                CurrentUnitOfWork.SaveChanges();
            }
            #endregion
            else
            {
                #region giaoDich khách cày và trả nợ đầy đủ

                giaoDich.NgayGiaoDich = input.NgayGiaoDich;
                giaoDich.TenTaiKhoan = taiKhoanCayGold.TenTaiKhoan;
                giaoDich.IsChuaThanhToan = false;
                giaoDich.IsThanhToanNo = false;
                giaoDich.MaKhachHang = khachHangCayGold.MaKhachHang;
                giaoDich.SoGold = input.SoGold;
                giaoDich.SoTienThanhToan = input.SoTienThanhToan;
                giaoDich.SoTienNo = input.SoTienNo;
                giaoDich.TTCG = input.TTCG;

                _giaoDichRepository.Update(giaoDich);
                CurrentUnitOfWork.SaveChanges();
                #endregion
            }
            return true;
        }

        public bool Delete(int maGiaoDich)
        {
            var task = _giaoDichRepository.FirstOrDefault(d => d.MaGiaoDich == maGiaoDich);
            if (task == null)
            {
                throw new UserFriendlyException("Không tìm thấy giao dịch");
            }
            _giaoDichRepository.Delete(task);
            CurrentUnitOfWork.SaveChanges();
            return true;

        }
    }
}

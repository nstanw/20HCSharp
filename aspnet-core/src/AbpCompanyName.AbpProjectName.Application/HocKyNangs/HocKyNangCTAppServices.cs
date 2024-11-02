using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using AbpCompanyName.AbpProjectName.DTO;
using AbpCompanyName.AbpProjectName.HocKyNangs.Dto;
using AbpCompanyName.AbpProjectName.Model.HocKyNangs;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AbpCompanyName.AbpProjectName.HocKyNangAppservices
{
    public class HocKyNangCTAppServices : AbpProjectNameAppServiceBase, IApplicationService
    {
        private readonly IRepository<ViewHocKyNang> _viewHocKyNangRepository;
        private readonly IRepository<ViewHocKyNangCT> _viewHocKyNangCTRepository;
        private readonly IRepository<HocKyNang> _hocKyNangRepository;
        private readonly IRepository<HocKyNangCT> _hocKyNangCTRepository;

        public HocKyNangCTAppServices(
            IRepository<ViewHocKyNang> viewHocKyNangRepository
           , IRepository<HocKyNang> hocKyNangRepository
           , IRepository<HocKyNangCT> hocKyNangCTRepository
           , IRepository<ViewHocKyNangCT> viewHocKyNangCTRepository

        )
        {
            _viewHocKyNangRepository = viewHocKyNangRepository;
            _hocKyNangRepository = hocKyNangRepository;
            _hocKyNangCTRepository = hocKyNangCTRepository;
            _viewHocKyNangCTRepository = viewHocKyNangCTRepository;
        }

        public PagedResultTotalDto<ViewHocKyNangCT> GetAll(InputGetAllDto input)
        {
            var tasks = _viewHocKyNangCTRepository.GetAll();
            if (!string.IsNullOrEmpty(input.q))
            {
                tasks = tasks.Where(d => d.TenKyNang.Equals(input.q)
                    || d.NoiDung.Contains(input.q)
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
                                tasks = tasks.Where(d => d.TenKyNang.Equals(input.q)
                                         || d.NoiDung.Contains(input.q)
                                 );
                                break;
                            case "tenkynang":
                                var tenkynang = (string)filter.Value;
                                tasks = tasks.Where(p => p.TenKyNang.Contains(tenkynang));
                                break;
                            case "mahockynang":
                                if (int.TryParse(filter.Value.ToString(), out int mahockynang))
                                    tasks = tasks.Where(p => p.MaHocKyNang == mahockynang);

                                break;
                        }
                }
            }
            //    tasks = tasks.OrderByDescending(d => d);
            var totalCount = tasks.Count();
            if (input.start.HasValue)
                tasks = tasks.Skip(input.start.Value);
            if (input.limit.HasValue)
                tasks = tasks.Take(input.limit.Value);
            var list = tasks.ToList();
            return new PagedResultTotalDto<ViewHocKyNangCT>(totalCount, list);
        }
        public bool BatDauHoc(BatDauHocInput input)
        {
            var hocKyNang = _hocKyNangRepository.FirstOrDefault(d => d.MaHocKyNang == input.MaHocKyNang);
            if (hocKyNang == null)
                return false;

            var hocKyNangct = new HocKyNangCT()
            {
                MaHocKyNang = input.MaHocKyNang,
                NoiDung = input.NoiDung,
                ThoiGianBatDau = DateTime.Now,
                TTKN = "TT_P"
            };
            _hocKyNangCTRepository.Insert(hocKyNangct);

            hocKyNang.TTKN = "TT_P";
            _hocKyNangRepository.Update(hocKyNang);

            CurrentUnitOfWork.SaveChanges();
            return true;
        }

        public bool KetThucHoc(KetThucHocInput input)
        {
            var hocKyNangCT = _hocKyNangCTRepository.FirstOrDefault(d => d.MaHocKyNang == input.MaHocKyNangCT);
            if (hocKyNangCT == null)
                throw new UserFriendlyException("Không tìm thấy thông tin phiên học chi tiết");
            if (hocKyNangCT.TTKN == "TT_A")
            {
                throw new UserFriendlyException("Phiên học đẫ hoàn thành");
            }

            hocKyNangCT.ThoiGianKetThuc = DateTime.Now;
            hocKyNangCT.ThoiGianHoc = (hocKyNangCT.ThoiGianKetThuc.Value - hocKyNangCT.ThoiGianBatDau.Value).TotalMinutes;
            hocKyNangCT.TTKN = "TT_A";
            _hocKyNangCTRepository.Update(hocKyNangCT);

            CurrentUnitOfWork.SaveChanges();
            return true;
        }

        //public bool UpdateHocKyNang(UpdateHocKyNangInput input)
        //{
        //    var hocKyNang = _hocKyNangRepository.FirstOrDefault(d => d.MaHocKyNang == input.MaHocKyNang);
        //    if (hocKyNang == null)
        //        return false;

        //    // ... existing code ...
        //    hocKyNang.TenKyNang = input.TenKyNang;
        //    hocKyNang.MoTa = input.MoTa;
        //    hocKyNang.ThoiLuong = input.ThoiLuong;

        //    _hocKyNangRepository.Update(hocKyNang);
        //    CurrentUnitOfWork.SaveChanges();
        //    return true;
        //}

        //public bool DeleteHocKyNang(int maHocKyNang)
        //{
        //    var hocKyNang = _hocKyNangRepository.FirstOrDefault(d => d.MaHocKyNang == maHocKyNang);
        //    if (hocKyNang == null)
        //        return false;

        //    _hocKyNangRepository.Delete(hocKyNang);
        //    CurrentUnitOfWork.SaveChanges();
        //    return true;
        //}

        public bool UpdateHocKyNangCT(UpdateHocKyNangCTInput input)
        {
            var hocKyNangCT = _hocKyNangCTRepository.FirstOrDefault(d => d.MaHocKyNang == input.MaHocKyNangCT);
            if (hocKyNangCT == null)
                return false;

            // ... existing code ...
            hocKyNangCT.ThoiGianBatDau = input.ThoiGianBatDau;
            hocKyNangCT.ThoiGianKetThuc = input.ThoiGianKetThuc;
            hocKyNangCT.NoiDung = input.NoiDung;

            _hocKyNangCTRepository.Update(hocKyNangCT);
            CurrentUnitOfWork.SaveChanges();
            return true;
        }

        public bool DeleteHocKyNangCT(int maHocKyNangCT)
        {
            var hocKyNangCT = _hocKyNangCTRepository.FirstOrDefault(d => d.MaHocKyNangCT == maHocKyNangCT);
            if (hocKyNangCT == null)
                return false;

            _hocKyNangCTRepository.Delete(hocKyNangCT);
            CurrentUnitOfWork.SaveChanges();
            return true;
        }

    }
}

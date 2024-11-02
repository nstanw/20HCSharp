using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using AbpCompanyName.AbpProjectName.DTO;
using AbpCompanyName.AbpProjectName.HocKyNangs.Dto;
using AbpCompanyName.AbpProjectName.Model.HocKyNangs;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace AbpCompanyName.AbpProjectName.HocKyNangAppservices
{
    public class HocKyNangAppServices : AbpProjectNameAppServiceBase, IApplicationService
    {
        private readonly IRepository<ViewHocKyNang> _viewHocKyNangRepository;
        private readonly IRepository<HocKyNang> _hocKyNangRepository;
        private readonly IRepository<HocKyNangCT> _hocKyNangCTRepository;

        public HocKyNangAppServices(
            IRepository<ViewHocKyNang> viewHocKyNangRepository
           , IRepository<HocKyNang> hocKyNangRepository
           , IRepository<HocKyNangCT> _hocKyNangCTRepository
            ,
IRepository<HocKyNangCT> hocKyNangCTRepository

        )
        {
            _viewHocKyNangRepository = viewHocKyNangRepository;
            _hocKyNangRepository = hocKyNangRepository;
            _hocKyNangCTRepository = _hocKyNangCTRepository;
        }

        public PagedResultTotalDto<ViewHocKyNang> GetAll(InputGetAllDto input)
        {
            var tasks = _viewHocKyNangRepository.GetAll();
            if (!string.IsNullOrEmpty(input.q))
            {
                tasks = tasks.Where(d => d.TenKyNang.Equals(input.q)
                    || d.MoTa.Contains(input.q)
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
                                         || d.MoTa.Contains(input.q)
                                 );
                                break;
                            case "tenkynang":
                                var tenkynang = (string)filter.Value;
                                tasks = tasks.Where(p => p.TenKyNang.Contains(tenkynang));
                                break;
                            case "ma":
                                var mahockynang = (int)filter.Value;

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
            return new PagedResultTotalDto<ViewHocKyNang>(totalCount, list);
        }
        public bool CreateHocKyNang(CreateHocKyNangInput input)
        {
            var hocKyNang = new HocKyNang()
            {
                TenKyNang = input.TenKyNang,
                MoTa = input.MoTa,
                ThoiLuong = input.ThoiLuong,
            };
            _hocKyNangRepository.Insert(hocKyNang);

            CurrentUnitOfWork.SaveChanges();
            return true;
        }
        public bool HoanThanhKyNang(int maHocKyNang)
        {
            var hocKyNang = _hocKyNangRepository.FirstOrDefault(d => d.MaHocKyNang == maHocKyNang) ?? throw new UserFriendlyException("Không thấy mã học kỹ năng");
            if (hocKyNang.TTKN == "TT_A")
                throw new UserFriendlyException("Đã hoàn thành không thể xác nhận");

            hocKyNang.TTKN = "TT_A";
            _hocKyNangRepository.Update(hocKyNang);

            CurrentUnitOfWork.SaveChanges();
            return true;
        }

        public bool UpdateHocKyNang(UpdateHocKyNangInput input)
        {
            var hocKyNang = _hocKyNangRepository.FirstOrDefault(d => d.MaHocKyNang == input.MaHocKyNang);
            if (hocKyNang == null)
                return false;

            // ... existing code ...
            hocKyNang.TenKyNang = input.TenKyNang;
            hocKyNang.MoTa = input.MoTa;
            hocKyNang.ThoiLuong = input.ThoiLuong;

            _hocKyNangRepository.Update(hocKyNang);
            CurrentUnitOfWork.SaveChanges();
            return true;
        }

        public bool DeleteHocKyNang(int maHocKyNang)
        {
            var hocKyNang = _hocKyNangRepository.FirstOrDefault(d => d.MaHocKyNang == maHocKyNang);
            if (hocKyNang == null)
                return false;

            _hocKyNangRepository.Delete(hocKyNang);
            CurrentUnitOfWork.SaveChanges();
            return true;
        }

        //public bool UpdateHocKyNangCT(UpdateHocKyNangCTInput input)
        //{
        //    var hocKyNangCT = _hocKyNangCTRepository.FirstOrDefault(d => d.MaHocKyNang == input.MaHocKyNangCT);
        //    if (hocKyNangCT == null)
        //        return false;

        //    // ... existing code ...
        //    hocKyNangCT.ThoiGianBatDau = input.ThoiGianBatDau;
        //    hocKyNangCT.ThoiGianKetThuc = input.ThoiGianKetThuc;
        //    hocKyNangCT.NoiDung = input.NoiDung;

        //    _hocKyNangCTRepository.Update(hocKyNangCT);
        //    CurrentUnitOfWork.SaveChanges();
        //    return true;
        //}

        //public bool DeleteHocKyNangCT(int maHocKyNangCT)
        //{
        //    var hocKyNangCT = _hocKyNangCTRepository.FirstOrDefault(d => d.MaHocKyNangCT == maHocKyNangCT);
        //    if (hocKyNangCT == null)
        //        return false;

        //    _hocKyNangCTRepository.Delete(hocKyNangCT);
        //    CurrentUnitOfWork.SaveChanges();
        //    return true;
        //}

    }
}

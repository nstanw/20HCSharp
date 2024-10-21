using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using AbpCompanyName.AbpProjectName.Authorization.Roles;
using AbpCompanyName.AbpProjectName.Authorization.Users;
using AbpCompanyName.AbpProjectName.MultiTenancy;
using AbpCompanyName.AbpProjectName.Model.CayGold.TaiKhoan;
using AbpCompanyName.AbpProjectName.Model.CayGold.KhachHang;
using AbpCompanyName.AbpProjectName.Model.CayGold;
using AbpCompanyName.AbpProjectName.Model.HocKyNangs;

namespace AbpCompanyName.AbpProjectName.EntityFrameworkCore
{
    public class AbpProjectNameDbContext : AbpZeroDbContext<Tenant, Role, User, AbpProjectNameDbContext>
    {
        /* Define a DbSet for each entity of the application */

        public AbpProjectNameDbContext(DbContextOptions<AbpProjectNameDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TaiKhoan> TaiKhoan { get; set; }
        public virtual DbSet<KHACHANG> KHACHHANG { get; set; }
        public virtual DbSet<GiaoDichGold> GiaoDich { get; set; }
        public virtual DbSet<ViewGiaoDichGold> ViewGiaoDichGold { get; set; }
        public virtual DbSet<HocKyNang> HocKyNang { get; set; }
        public virtual DbSet<HocKyNangCT> HocKyNangCT { get; set; }
        public virtual DbSet<ViewHocKyNang> ViewHocKyNang { get; set; }
        public virtual DbSet<ViewHocKyNangCT> ViewHocKyNangCT { get; set; }



    }
}

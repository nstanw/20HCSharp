using Abp.Domain.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AbpCompanyName.AbpProjectName.Model.CayGold
{
    [Table("ViewGiaoDichGold")]
    public class ViewGiaoDichGold : Entity<int>
    {
        public int MaGiaoDich { get; set; }
        public DateTime NgayGiaoDich { get; set; }
        public string TenTaiKhoan { get; set; }
        public bool IsChuaThanhToan { get; set; }
        public bool IsThanhToanNo { get; set; }
        public string MaKhachHang { get; set; }
        public int? SoGold { get; set; }
        public int SoTienThanhToan { get; set; }
        public int? SoTienNo { get; set; }
        public string TTCG { get; set; }
        public string FullName { get; set; }
        public string NoteKhachHang { get; set; }
        public string LoaiTaiKhoan { get; set; }
        public string NoteTaiKhoan { get; set; }
        public string Facebook { get; set; }
        public string Zalo { get; set; }
    }
}

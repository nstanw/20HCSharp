using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AbpCompanyName.AbpProjectName.Model.CayGold
{
    [Table("GiaoDichGold", Schema = "gold")]
    public class GiaoDichGold : FullAuditedEntity<int>
    {
        [Key]
        public int MaGiaoDich { get; set; }
        [NotMapped]
        public override int Id
        {
            get { return MaGiaoDich; }
            set { }
        }
        public DateTime NgayGiaoDich { get; set; }
        public string TenTaiKhoan { get; set; }
        public bool IsChuaThanhToan { get; set; }
        public bool IsThanhToanNo { get; set; }
        public string MaKhachHang { get; set; }
        public int? SoGold { get; set; }
        //số tiền khách trả 
        public int SoTienThanhToan { get; set; }
        // Tiền còn thiếu: có thể trả 1 nửa hoặc nợ cả
        public int? SoTienNo { get; set; }
        //Giá nhân số gold
        public string TTCG { get; set; }
    }
}
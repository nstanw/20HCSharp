using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AbpCompanyName.AbpProjectName.Model.HocKyNangs
{
    [Table("HocKyNangs", Schema = "st")]
    public class HocKyNang : FullAuditedEntity<int>
    {
        [NotMapped]
        public override int Id
        {
            get { return MaHocKyNang; }
            set { /* nothing */}
        }
        [Key]
        public int MaHocKyNang { get; set; }
        public string TenKyNang { get; set; }
        public string MoTa { get; set; }
        public int ThoiLuong { get; set; }
        public string TTKN { get; set; }
        public bool IsHuy { get; set; }

    }
}

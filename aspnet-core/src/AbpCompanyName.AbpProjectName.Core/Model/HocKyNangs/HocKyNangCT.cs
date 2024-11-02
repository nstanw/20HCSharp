using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AbpCompanyName.AbpProjectName.Model.HocKyNangs
{
    [Table("HocKyNangCTs", Schema = "st")]
    public class HocKyNangCT : FullAuditedEntity<int>
    {
        [NotMapped]
        public override int Id
        {
            get { return MaHocKyNangCT; }
            set { /* nothing */}
        }
        [Key]
        public int MaHocKyNangCT { get; set; }
        public int MaHocKyNang { get; set; }
        public DateTime? ThoiGianBatDau { get; set; }
        public DateTime? ThoiGianKetThuc { get; set; }
        public double ThoiGianHoc { get; set; }
        public string NoiDung { get; set; }
        public string TTKN { get; set; }
        public bool IsHuy { get; set; }
        //[ForeignKey("HocKyNang")]
        //public HocKyNang HocKyNang { get; set; }

    }
}

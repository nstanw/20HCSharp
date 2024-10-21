using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbpCompanyName.AbpProjectName.Model.CayGold.KhachHang
{
    [Table("KHACHHANG")]
    public class KHACHANG : FullAuditedEntity<string>
    {
        [NotMapped]
        public override string Id
        {
            get { return MaKhachHang; }
            set { /* nothing */}
        }
        [Key]
        public string MaKhachHang { get; set; }
        public string FullName { get; set; }
        public string Note { get; set; }

        public int? SoTienConNo { get; set; }
        public int? SoTienConThua { get; set; }

        public string Facebook { get; set; }
        public string Zalo { get; set; }
    }
}

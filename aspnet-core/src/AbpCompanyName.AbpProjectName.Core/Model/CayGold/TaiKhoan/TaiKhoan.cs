using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbpCompanyName.AbpProjectName.Model.CayGold.TaiKhoan
{
    [Table("TaiKhoan", Schema = "tk")]
    public class TaiKhoan : FullAuditedEntity<string>
    {
        [NotMapped]
        public override string Id
        {
            get { return TenTaiKhoan; }
            set { /* nothing */}
        }
        [Key]
        public string TenTaiKhoan { get; set; }
        public string MatKhau { get; set; }
        // androi hoặc ios
        public string LoaiTaiKhoan { get; set; }
        public string Note { get; set; }
    }
}

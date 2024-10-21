using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbpCompanyName.AbpProjectName.HocKyNangs.Dto
{
    public class UpdateHocKyNangInput
    {
        public int MaHocKyNang { get; set; }
        public string TenKyNang { get; set; }
        public string MoTa { get; set; }
        public int ThoiLuong { get; set; }
    }
}

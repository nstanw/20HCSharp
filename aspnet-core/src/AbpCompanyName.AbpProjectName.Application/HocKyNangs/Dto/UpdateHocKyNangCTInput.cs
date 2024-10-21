using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbpCompanyName.AbpProjectName.HocKyNangs.Dto
{
    public class UpdateHocKyNangCTInput
    {
        public int MaHocKyNangCT { get; set; }
        public DateTime ThoiGianBatDau { get; set; }
        public DateTime? ThoiGianKetThuc { get; set; }
        public string NoiDung { get; set; }
    }
}

using AbpCompanyName.AbpProjectName.Model.CayGold;
using AbpCompanyName.AbpProjectName.Model.CayGold.KhachHang;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbpCompanyName.AbpProjectName.CayGold.GiaoDich.Dto
{
    public class CreateGiaoDichGold
    {
        //Khách hàng
        public string MaKhachHang { get; set; }
        public string FullName { get; set; }
        public string NoteKhachHang { get; set; }

        public string Facebook { get; set; }
        public string ZaLo { get; set; }

        //tài khoản 
        public string TenTaiKhoan { get; set; }
        public string MatKhau { get; set; }
        public string LoaiTaiKhoan { get; set; }
        public string NoteTaiKhoan { get; set; }


        //Giao dịch
        public DateTime NgayGiaoDich { get; set; }
        public bool IsChuaThanhToan { get; set; }
        public bool IsThanhToanNo { get; set; }
        public int? SoGold { get; set; }
        public int SoTienThanhToan { get; set; }
        public int? SoTienNo { get; set; }
        public string TTCG { get; set; }
    }
}

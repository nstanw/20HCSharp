using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbpCompanyName.AbpProjectName.DTO
{
    public class FilterDto
    {
        public string Property { get; set; }
        public object Value { get; set; }
        public string Operator { get; set; }

    }
}

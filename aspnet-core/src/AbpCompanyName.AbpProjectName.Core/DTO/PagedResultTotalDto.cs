using Abp.Application.Services.Dto;
using System.Collections.Generic;

namespace AbpCompanyName.AbpProjectName.DTO
{
    public class PagedResultTotalDto<T> : ListResultDto<T>, IListResult<T>
    {

        public PagedResultTotalDto() : base()
        {

        }

        public PagedResultTotalDto(int totalCount, IReadOnlyList<T> items)
        {
            base.Items = items;
            this.Count = totalCount;
        }

        public int Count { get; set; }
    }
}

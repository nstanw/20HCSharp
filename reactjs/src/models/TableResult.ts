import { PagedResultTotalDto } from './../services/dto/pagedResultTotalDto';
import { IFilterDto } from './IFilterDto';
class TableResult<T> {
    result: PagedResultTotalDto<T> | undefined;
    sizePage: number = 20;
    skipCount: number = 0;
    filter: string = '';
    filterO: IFilterDto[] = [];
    q: string = '';
    test: string = '';
    isLoadding: boolean = true
}

export default TableResult;

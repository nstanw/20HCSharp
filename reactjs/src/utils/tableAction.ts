import { IFilterDto } from './../models/IFilterDto';
import { ISorterDto } from './sorterDto';
export interface ITableAction<T> {
    curentPage: Number;
    pageSize: Number;
    q?: String;
    filter?: IFilterDto[];
    sorter?: ISorterDto<T>;
}


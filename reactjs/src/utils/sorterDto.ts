import { ColumnType } from 'rc-table/lib/interface';

export interface ISorterDto<T> {
    property?: ColumnType<T>;
    order: string;
}

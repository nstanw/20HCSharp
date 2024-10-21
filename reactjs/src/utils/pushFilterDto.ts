import { IFilterDto } from "../models/IFilterDto";

export function pushFilterDto(filters: IFilterDto[], key: string, object: IFilterDto): IFilterDto[] {
    var index = filters.findIndex(d => d.property ===key);
    if (index ===-1) {
        filters.push(object);
    }else {
        filters[index].value = object.value;
        filters[index].property = object.property;        
    }
    return filters;
}

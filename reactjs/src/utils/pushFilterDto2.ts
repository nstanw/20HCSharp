import { IFilterDto } from "../models/IFilterDto";

export function pushFilterDto2(filters: IFilterDto[], object: IFilterDto): IFilterDto[] {
    var index = filters.findIndex(d => d.property ===object.property);
    if (index ===-1) {
        filters.push(object);
    }else {
        filters[index].value = object.value;
        filters[index].operator = object.operator;        
    }
    return filters;
}

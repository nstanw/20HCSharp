import { InputGetAllDto } from "./../dto/inputGetAllDto";
import { PagedResultTotalDto } from "../dto/pagedResultTotalDto";
import http from "../httpService";
import ViewCaiTaoDongHo from "../../models/CaiTaoDongHos/ViewCaiTaoDongHo";

class CaiTaoDongHoServices {
    public async getAll(input: InputGetAllDto): Promise<PagedResultTotalDto<ViewCaiTaoDongHo>> {
        let result = await http.get("api/services/app/CaiTaoDongHo/GetAll", { params: input });
        return result.data.result;
    }
    public async get(maddk: string) {
        let result = await http.get("api/services/app/CaiTaoDongHo/GetViewCaiTaoDongHo", { params: { maddk: maddk } });
        return result.data.result;
    }
}

export default new CaiTaoDongHoServices();

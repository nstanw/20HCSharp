import ViewLapDatMoi2 from "../../models/LapDatMois/ViewLapDatMoi2";
import { InputGetAllDto } from "../dto/inputGetAllDto";
import { PagedResultTotalDto } from "../dto/pagedResultTotalDto";
import http from "../httpService";

class LapDatMoi2Service {
    public async getAll(input: InputGetAllDto): Promise<PagedResultTotalDto<ViewLapDatMoi2>> {
        const result = await http.get("api/services/app/LapDatMoi2/GetAll", { params: input });
        return result.data.result;
    }

    public async get(maddk: string) {
        const result = await http.get("api/services/app/LapDatMoi2/GetViewLapDatMoi", { params: { maddk: maddk } });
        return result.data.result;
    }
}

export default new LapDatMoi2Service();

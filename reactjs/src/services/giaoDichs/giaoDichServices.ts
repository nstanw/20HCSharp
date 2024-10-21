/* eslint-disable class-methods-use-this */
import type { InputGetAllDto } from "../dto/inputGetAllDto";
import type { PagedResultTotalDto } from "../dto/pagedResultTotalDto";
import http from "../httpService";
import type { ViewGiaoDichGold } from "./dto/ViewGiaoDichGold";


class GiaoDichServices {

    public async getAll(input: InputGetAllDto): Promise<PagedResultTotalDto<ViewGiaoDichGold>> {
        const result = await http.get('/api/services/app/GiaoDich/GetAll', { params: input });
        return result.data.result;
    }

    // public async addGiaoDich(input) {
    //     let result = await http.post('api/giaoDichs', input);
    //     return result.data;
    // }
    // public async getGiaoDichByUser(userId) {
    //     let result = await http.get('api/giaoDichs/' + userId);
    //     return result.data;
    // }
    // public async getAllGiaoDichs(input) {
    //     let result = await http.get('api/giaoDichs', { params: input });
    //     return result.data;
    // }
    // public async updateGiaoDich(input) {
    //     let result = await http.put('api/giaoDichs', input);
    //     return result.data;
    // }
    // public async deleteGiaoDich(id) {
    //     let result = await http.delete(`api/giaoDichs`, { params: { id: id } });
    //     return result.data;
    // }

}

export default new GiaoDichServices();

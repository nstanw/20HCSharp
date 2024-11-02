import { makeAutoObservable } from "mobx";
import CallLogModel from "../models/CallLogs/callLogModel";
import TableResult from "../models/TableResult";
import asteriskService from "../services/asterisk/asteriskServices";
import { CallLogDto } from "../services/asterisk/dto/callLogDto";
import { CreateCallLogDto } from "../services/asterisk/dto/createCallLogDto";
import { UpdateCallLogDto } from "../services/asterisk/dto/updateCallLogDto";
import { ViewCELReport } from "../services/asterisk/dto/viewCELReport";
import { InputGetAllDto } from "../services/dto/inputGetAllDto";
import { PagedResultTotalDto } from "../services/dto/pagedResultTotalDto";
import { IFilterDto } from "./../models/IFilterDto";

class AsteriskStore {
    constructor() {
        makeAutoObservable(this); // Không cần dùng decorators
    }

    callLogs!: PagedResultTotalDto<CallLogDto>;
    callLogModel: CallLogModel = new CallLogModel();
    callHistories: TableResult<ViewCELReport> = new TableResult<ViewCELReport>();
    callHistoriesOfSoDienThoai = new TableResult<ViewCELReport>();

    async createCallLog(input: CreateCallLogDto) {
        input.trangThaiCuocGoi = "TiepNhan";
        var output = await asteriskService.create(input);
        if (this.callLogModel.linkedid === input.linkedid) {
            this.callLogModel = output;
        }
    }

    async updateCallLog(input: UpdateCallLogDto) {
        var output = await asteriskService.updateCallLog(input);
        this.callLogModel = output;
    }

    async huyThongTinGoiDen(input: CreateCallLogDto) {
        input.trangThaiCuocGoi = "Huy";
        await asteriskService.create(input);
    }

    async get(id: string) {
        var result = await asteriskService.get(id);
        this.callLogModel = result.result;
    }

    async getAll(pagedFilterAndSortedRequest: InputGetAllDto) {
        let result = await asteriskService.getAll(pagedFilterAndSortedRequest);
        this.callLogs = result;
    }

    async getAllCallHistory() {
        let result = await asteriskService.getAllCallHistory({
            limit: this.callHistories.sizePage,
            start: this.callHistories.skipCount,
            filter: this.callHistories.filter,
            q: this.callHistories.q,
        });
        this.callHistories = { ...this.callHistories, result: result };
    }
    async getAllCallHistoryOfSoDienThoai(soDienThoai: string) {
        const filterDtos: IFilterDto[] = [];
        filterDtos.push({
            property: "cid_num",
            value: soDienThoai,
            operator: "eq",
        });

        let result = await asteriskService.getAllCallHistory({
            limit: this.callHistories.sizePage,
            start: this.callHistories.skipCount,
            filter: JSON.stringify(filterDtos),
        });
        this.callHistoriesOfSoDienThoai = { ...this.callHistoriesOfSoDienThoai, result: result };
    }
}

export default AsteriskStore;

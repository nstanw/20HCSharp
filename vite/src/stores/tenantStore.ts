import { makeAutoObservable } from "mobx";
import TenantModel from "../models/Tenants/TenantModel";
import { EntityDto } from "../services/dto/entityDto";
import { PagedResultDto } from "../services/dto/pagedResultDto";
import CreateTenantInput from "../services/tenant/dto/createTenantInput";
import { GetAllTenantOutput } from "../services/tenant/dto/getAllTenantOutput";
import { PagedTenantResultRequestDto } from "../services/tenant/dto/PagedTenantResultRequestDto";
import UpdateTenantInput from "../services/tenant/dto/updateTenantInput";
import tenantService from "../services/tenant/tenantService";

class TenantStore {
    constructor() {
        makeAutoObservable(this); // Không cần dùng decorators
    }

    tenants!: PagedResultDto<GetAllTenantOutput>;
    tenantModel: TenantModel = new TenantModel();

    async create(createTenantInput: CreateTenantInput) {
        await tenantService.create(createTenantInput);
    }

    async createTenant() {
        this.tenantModel = {
            id: 0,
            isActive: true,
            name: "",
            tenancyName: "",
        };
    }

    async update(updateTenantInput: UpdateTenantInput) {
        let result = await tenantService.update(updateTenantInput);

        this.tenants.items = this.tenants.items.map((x: GetAllTenantOutput) => {
            if (x.id === updateTenantInput.id) x = result;
            return x;
        });
    }

    async delete(entityDto: EntityDto) {
        await tenantService.delete(entityDto);
        this.tenants.items = this.tenants.items.filter((x: GetAllTenantOutput) => x.id !== entityDto.id);
    }

    async get(entityDto: EntityDto) {
        let result = await tenantService.get(entityDto);
        this.tenantModel = result;
    }

    async getAll(pagedFilterAndSortedRequest: PagedTenantResultRequestDto) {
        let result = await tenantService.getAll(pagedFilterAndSortedRequest);
        this.tenants = result;
    }
}

export default TenantStore;

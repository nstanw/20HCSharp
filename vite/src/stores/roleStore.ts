import { makeAutoObservable } from "mobx";
import RoleEditModel from "../models/Roles/roleEditModel";
import { EntityDto } from "../services/dto/entityDto";
import { PagedResultDto } from "../services/dto/pagedResultDto";
import { CreateRoleInput } from "../services/role/dto/createRoleInput";
import { GetAllPermissionsOutput } from "../services/role/dto/getAllPermissionsOutput";
import { GetAllRoleOutput } from "../services/role/dto/getAllRoleOutput";
import { GetRoleAsyncInput } from "../services/role/dto/getRolesAsyncInput";
import { PagedRoleResultRequestDto } from "../services/role/dto/PagedRoleResultRequestDto";
import { UpdateRoleInput } from "../services/role/dto/updateRoleInput";
import roleService from "../services/role/roleService";

class RoleStore {
    constructor() {
        makeAutoObservable(this); // Đảm bảo các thuộc tính của store trở thành observable
    }

    roles!: PagedResultDto<GetAllRoleOutput>;
    roleEdit: RoleEditModel = new RoleEditModel();
    allPermissions: GetAllPermissionsOutput[] = [];

    async create(createRoleInput: CreateRoleInput) {
        await roleService.create(createRoleInput);
    }

    async createRole() {
        this.roleEdit = {
            grantedPermissionNames: [],
            role: {
                name: "",
                displayName: "",
                description: "",
                id: 0,
            },
            permissions: [{ name: "", displayName: "", description: "" }],
        };
    }

    async getRolesAsync(getRoleAsyncInput: GetRoleAsyncInput) {
        await roleService.getRolesAsync(getRoleAsyncInput);
    }

    async update(updateRoleInput: UpdateRoleInput) {
        await roleService.update(updateRoleInput);
        this.roles.items
            .filter((x: GetAllRoleOutput) => x.id === updateRoleInput.id)
            .map((_x: GetAllRoleOutput) => {
                return updateRoleInput;
            });
    }

    async delete(entityDto: EntityDto) {
        await roleService.delete(entityDto);
        this.roles.items = this.roles.items.filter((x: GetAllRoleOutput) => x.id !== entityDto.id);
    }

    async getAllPermissions() {
        var result = await roleService.getAllPermissions();
        this.allPermissions = result;
    }

    async getRoleForEdit(entityDto: EntityDto) {
        const result = await roleService.getRoleForEdit(entityDto);
        this.roleEdit.grantedPermissionNames = result.grantedPermissionNames;
        this.roleEdit.permissions = result.permissions;
        this.roleEdit.role = result.role;
    }

    async get(entityDto: EntityDto) {
        var result = await roleService.get(entityDto);
        this.roles = result.data.result;
    }

    async getAll(pagedFilterAndSortedRequest: PagedRoleResultRequestDto) {
        const result = await roleService.getAll(pagedFilterAndSortedRequest);
        this.roles = result;
    }
}

export default RoleStore;

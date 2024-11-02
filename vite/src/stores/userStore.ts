import { makeAutoObservable } from "mobx";
import { EntityDto } from "../services/dto/entityDto";
import { PagedResultDto } from "../services/dto/pagedResultDto";
import { CreateOrUpdateUserInput } from "../services/user/dto/createOrUpdateUserInput";
import { GetRoles } from "../services/user/dto/getRolesOuput";
import { GetUserOutput } from "../services/user/dto/getUserOutput";
import { PagedUserResultRequestDto } from "../services/user/dto/PagedUserResultRequestDto";
import { UpdateUserInput } from "../services/user/dto/updateUserInput";
import userService from "../services/user/userService";

class UserStore {
    constructor() {
        makeAutoObservable(this); // Không cần dùng decorators
    }

    users!: PagedResultDto<GetUserOutput>;
    editUser!: CreateOrUpdateUserInput;
    roles: GetRoles[] = [];

    async create(createUserInput: CreateOrUpdateUserInput) {
        let result = await userService.create(createUserInput);
        this.users.items.push(result);
    }

    async update(updateUserInput: UpdateUserInput) {
        let result = await userService.update(updateUserInput);
        this.users.items = this.users.items.map((x: GetUserOutput) => {
            if (x.id === updateUserInput.id) x = result;
            return x;
        });
    }

    async delete(entityDto: EntityDto) {
        await userService.delete(entityDto);
        this.users.items = this.users.items.filter((x: GetUserOutput) => x.id !== entityDto.id);
    }

    async getRoles() {
        let result = await userService.getRoles();
        this.roles = result;
    }

    async get(entityDto: EntityDto) {
        let result = await userService.get(entityDto);
        this.editUser = result;
    }

    async createUser() {
        this.editUser = {
            userName: "",
            name: "",
            surname: "",
            emailAddress: "",
            isActive: false,
            roleNames: [],
            password: "",
            id: 0,
        };
        this.roles = [];
    }

    async getAll(pagedFilterAndSortedRequest: PagedUserResultRequestDto) {
        let result = await userService.getAll(pagedFilterAndSortedRequest);
        this.users = result;
    }

    async changeLanguage(languageName: string) {
        await userService.changeLanguage({ languageName: languageName });
    }
}

export default UserStore;

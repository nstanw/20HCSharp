import { makeAutoObservable } from "mobx";
import accountService from "../services/account/accountService";
import IsTenantAvaibleOutput from "../services/account/dto/isTenantAvailableOutput";

class AccountStore {
    constructor() {
        makeAutoObservable(this); // Không cần dùng decorators
    }

    tenant: IsTenantAvaibleOutput = new IsTenantAvaibleOutput();

    public isTenantAvailable = async (tenancyName: string) => {
        this.tenant = await accountService.isTenantAvailable({ tenancyName: tenancyName });
    };
}

export default AccountStore;

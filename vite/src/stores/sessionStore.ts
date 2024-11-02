import { makeAutoObservable } from "mobx";
import { GetCurrentLoginInformations } from "../services/session/dto/getCurrentLoginInformations";
import sessionService from "../services/session/sessionService";

class SessionStore {
    constructor() {
        makeAutoObservable(this); // Không cần dùng decorators
    }

    currentLogin: GetCurrentLoginInformations = new GetCurrentLoginInformations();
    title: string = "";
    subTitle: string = "";

    async getCurrentLoginInformations() {
        const result = await sessionService.getCurrentLoginInformations();
        this.currentLogin = result;
    }
}

export default SessionStore;

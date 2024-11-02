import { makeAutoObservable } from "mobx";
import LoginModel from "../models/Login/loginModel";
import tokenAuthService from "../services/tokenAuth/tokenAuthService";

class AuthenticationStore {
    constructor() {
        makeAutoObservable(this); // Không cần dùng decorators
    }

    loginModel: LoginModel = new LoginModel();
    token: string = "";

    setToken(token: string) {
        this.token = token;
    }

    public async login(model: LoginModel) {
        const result = await tokenAuthService.authenticate({
            userNameOrEmailAddress: model.userNameOrEmailAddress,
            password: model.password,
            rememberClient: model.rememberMe,
            exten: model.exten,
        });
        // let tokenExpireDate = model.rememberMe
        //     ? new Date(new Date().getTime() + 1000 * result.expireInSeconds)
        //     : undefined;
        this.token = result.accessToken;
        window.localStorage.setItem("accessToken", result.accessToken);
    }

    logout() {
        localStorage.clear();
        sessionStorage.clear();
        this.token = "";
    }
}
export default AuthenticationStore;

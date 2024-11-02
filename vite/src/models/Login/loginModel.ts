import { makeAutoObservable } from "mobx";

class LoginModel {
    constructor() {
        makeAutoObservable(this); // Không cần dùng decorators
    }
    tenancyName!: string;
    userNameOrEmailAddress!: string;
    password!: string;
    exten!: string;

    rememberMe!: boolean;
    showModal!: boolean;

    toggleRememberMe = () => {
        this.rememberMe = !this.rememberMe;
    };

    toggleShowModal = () => {
        this.showModal = !this.showModal;
    };
}

export default LoginModel;

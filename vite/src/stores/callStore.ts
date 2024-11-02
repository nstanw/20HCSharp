import { makeAutoObservable } from "mobx";
import { LinkedDto } from "../services/calls/dto/linkedDto";

class CallStore {
    constructor() {
        makeAutoObservable(this); // Không cần dùng decorators
    }
    calls: LinkedDto[] = [];
}

export default CallStore;

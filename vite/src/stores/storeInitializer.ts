import AccountStore from "./accountStore";
import AsteriskStore from "./asteriskStore";
import AuthenticationStore from "./authenticationStore";
import CallStore from "./callStore";
import PhieuYeuCauLogStore from "./phieuYeuCauLogStore";
import RoleStore from "./roleStore";
import SessionStore from "./sessionStore";
import TenantStore from "./tenantStore";
import TiepNhanThongTinStore from "./tiepNhanThongTinStore";
import UserStore from "./userStore";

export default function initializeStores() {
    return {
        authenticationStore: new AuthenticationStore(),
        roleStore: new RoleStore(),
        tenantStore: new TenantStore(),
        userStore: new UserStore(),
        sessionStore: new SessionStore(),
        accountStore: new AccountStore(),
        callStore: new CallStore(),
        asteriskStore: new AsteriskStore(),
        tiepNhanThongTinStore: new TiepNhanThongTinStore(),
        phieuYeuCauLogStore: new PhieuYeuCauLogStore(),
    };
}

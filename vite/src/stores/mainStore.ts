import AccountStore from "./accountStore";
import AsteriskStore from "./asteriskStore";
import AuthenticationStore from "./authenticationStore";
import CaiTaoDongHoStore from "./caiTaoDongHoStore";
import CallStore from "./callStore";
import CongNoStore from "./congNoStore";
import DonDangKyStore from "./donDangKyStore";
import KhachHangStore from "./khachHangStore";
import LapDatMoiStore from "./lapDatMoiStore";
import MapStore from "./mapStore";
import OverLayerStore from "./overLayerStore";
import PhieuYeuCauLogStore from "./phieuYeuCauLogStore";
import RoleStore from "./roleStore";
import SessionStore from "./sessionStore";
import TenantStore from "./tenantStore";
import ThayTheDongHoStore from "./thayTheDongHoStore";
import TiepNhanThongTinStore from "./tiepNhanThongTinStore";
import UserStore from "./userStore";

export default class MainStore {
    authenticationStore = new AuthenticationStore();
    roleStore = new RoleStore();
    tenantStore = new TenantStore();
    userStore = new UserStore();
    sessionStore = new SessionStore();
    accountStore = new AccountStore();
    callStore = new CallStore();
    asteriskStore = new AsteriskStore();
    tiepNhanThongTinStore = new TiepNhanThongTinStore();
    donDangKyStore = new DonDangKyStore();
    khachHangStore = new KhachHangStore();
    phieuYeuCauLogStore = new PhieuYeuCauLogStore();
    lapDatMoiStore = new LapDatMoiStore();
    thayTheDongHoStore = new ThayTheDongHoStore();
    caiTaoDongHoStore = new CaiTaoDongHoStore();
    congNoStore = new CongNoStore();
    mapStore = new MapStore();
    overLayerStore = new OverLayerStore();
}

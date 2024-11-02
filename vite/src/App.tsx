import { message } from "antd";
import { useEffect, useState } from "react";
import "./App.css";
import Router from "./components/Router";
import { useStore } from "./helpers/use-store";
import "../node_modules/ol/ol.css";
import "../node_modules/ol-layerswitcher/dist/ol-layerswitcher.css";

function App() {
    const { authenticationStore } = useStore();
    const { sessionStore } = useStore();
    const { callStore, asteriskStore } = useStore();
    const URL = "ws://192.168.13.15:8000";
    const [ws, setWS] = useState<WebSocket>();

    useEffect(() => {
        (async function run() {
            await sessionStore!.getCurrentLoginInformations();
            setWS(new WebSocket(URL));
        })();
    }, []);

    useEffect(() => {
        if (sessionStore?.currentLogin?.user?.exten) {
            handleData();
        }
    }, [ws]);

    const handleData = () => {
        const { exten } = sessionStore!.currentLogin.user;

        if (ws && exten) {
            ws.onopen = () => {
                message.success("Kết nối đến tổng đài thành công!");
            };

            ws.onmessage = (evt) => {
                // on receiving a message, add it to the list of messages
                const message = JSON.parse(evt.data);
                // Cuộc gọi đến
                if (message.data.Event === "Newstate" && message.data.Exten === exten) {
                    var call = callStore!.calls.find((d) => d.linkedid === message.data.Linkedid);
                    if (!call) {
                        call = {
                            linkedid: message.data.Linkedid.toString(),
                            soDienThoai: message.data.ConnectedLineNum,
                            hoTenKhachHang: "",
                            diaChiKhachHang: "",
                            daLuu: false,
                            daNhacCuocGoi: message.data.ChannelState === 6,
                            loaiCuocGoi: "CuocGoiDen",
                            thoiGianGoi: new Date(),
                        };
                        callStore!.calls.push(call);
                    } else {
                        if (message.data.ChannelState === "6") {
                            call.daNhacCuocGoi = true;
                        }
                    }
                }
                // // Cuộc gọi đi
                if (message.data.Event === "Newstate" && message.data.CallerIDNum === exten) {
                    var call2 = callStore!.calls.find((d) => d.linkedid === message.data.Linkedid);
                    if (!call2) {
                        call2 = {
                            linkedid: message.data.Linkedid.toString(),
                            soDienThoai: message.data.Exten,
                            hoTenKhachHang: "",
                            diaChiKhachHang: "",
                            daLuu: false,
                            daNhacCuocGoi: true,
                            loaiCuocGoi: "CuocGoiDi",
                            thoiGianGoi: new Date(),
                        };
                        if (message.data.ChannelState === "6") {
                            call2.daNhacCuocGoi = true;
                        }
                        callStore!.calls.push(call2);
                    } else {
                        if (message.data.ChannelState === "6") {
                            call2.daNhacCuocGoi = true;
                        }
                    }
                }
                // // khi tắt máy
                if (message.data.Event === "Hangup" && message.data.CallerIDNum === exten) {
                    var call3 = callStore!.calls.find((d) => d.linkedid === message.data.Linkedid);
                    if (call3 && call3.daNhacCuocGoi === false)
                        callStore!.calls = callStore!.calls.filter((d) => d.linkedid !== message.data.Linkedid);

                    (async function run() {
                        if (asteriskStore.callHistories.skipCount == 0) await asteriskStore.getAllCallHistory();
                    })();
                }
            };
            ws.onclose = () => {
                message.error("Kết nối tới tổng đài bị lỗi!");
                // automatically try to reconnect on connection loss
                setWS(new WebSocket(URL));
            };
        }
    };

    useEffect(() => {
        // get old token from local storage
        const oldToken = window.localStorage.getItem("accessToken");
        if (!!!oldToken) return;
        authenticationStore.setToken(oldToken || "");
    }, []);

    return <Router />;
}

export default App;

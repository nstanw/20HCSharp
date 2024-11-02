import AppConsts from "../utils/appconst";
import { Modal } from "antd";
import axios from "axios";
import qs from "qs";

const http = axios.create({
    baseURL: AppConsts.remoteServiceBaseUrl,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000,
    paramsSerializer: function (params) {
        return qs.stringify(params, {
            encode: false,
        });
    },
});

http.interceptors.request.use(
    function (config) {
        if (!!window.localStorage.getItem("accessToken")) {
            config.headers["Authorization"] = `Bearer ${window.localStorage.getItem("accessToken")}`;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (
            !!error.response &&
            !!error.response.data.error &&
            !!error.response.data.error.message &&
            error.response.data.error.details
        ) {
            Modal.error({
                title: "Đã có lỗi xảy ra",
                content: error.response.data.error.message,
            });
        } else if (!!error.response && !!error.response.data.error && !!error.response.data.error.message) {
            Modal.error({
                title: "LoginFailed",
                content: error.response.data.error.message,
            });
        } else if (!error.response) {
            Modal.error({ content: "UnknownError" });
        }

        setTimeout(() => {}, 1000);

        return Promise.reject(error);
    }
);

export default http;

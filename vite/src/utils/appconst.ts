const AppConsts = {
    userManagement: {
        defaultAdminUserName: "admin",
    },
    localization: {
        defaultLocalizationSourceName: "HomePage",
    },
    authorization: {
        encrptedAuthTokenName: "enc_auth_token",
    },
    appBaseUrl: import.meta.env.VITE_APP_BASE_URL,
    remoteServiceBaseUrl: import.meta.env.VITE_REMOTE_SERVICE_BASE_URL,
};
export default AppConsts;

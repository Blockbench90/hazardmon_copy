import axios from "axios";
import {WinStorage} from "./AuthSrorage";
import history from "../helpers/history";

axios.interceptors.request.use((config) => {
    config.baseURL = process.env.REACT_APP_API_SERVER_URL;
    const token = window.localStorage.getItem("_token");
    if (token) {
        config.headers["Authorization"] = `JWT ${token}`;
    }
    return config;
});

axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 400) {
        const message: any = Object.values(error.response.data)[0];
        WinStorage.setErrorMessage(message);
    }
    if (error.response.status === 401) {
        WinStorage.removeToken();
        history.push("/");
    }
    if (error.response.status === 403) {
        console.log(error.response.data.detail);
    }
    if (error.response.status === 404) {
        console.log("404 Server not found!");
    }
    return error;
});
export {axios};

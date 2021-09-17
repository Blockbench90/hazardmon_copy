import axios from 'axios';
import qs from 'qs';
import cookies from './cookies';
import {WinStorage} from "./AuthSrorage";

export const apiSeverUrl = process.env.REACT_APP_API_SERVER_URL ? process.env.REACT_APP_API_SERVER_URL : `https://${window.location.host}`;
export const WSSeverUrl = process.env.REACT_APP_WS_SERVER_URL ? process.env.REACT_APP_WS_SERVER_URL : `wss://${window.location.host}`;

const baseService = axios.create({
    baseURL: `${apiSeverUrl}api/v2`,
    paramsSerializer: (params) => {
        return qs.stringify(params, { indices: false, arrayFormat: 'comma' })
    }
});

export const getCSRFToken = () => {
    const elements = document.getElementsByName('csrfmiddlewaretoken')[0];
    return cookies.get('csrftoken') || (elements && (elements as HTMLInputElement).value);
};

baseService.defaults.headers.common['X-CSRFToken'] = getCSRFToken();

// const jwt = cookies.get('Authorization');
const jwt = WinStorage.getToken()

if (jwt) {
    baseService.defaults.headers.common.Authorization = `JWT ${jwt}`;
}

export default baseService;

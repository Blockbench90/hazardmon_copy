import axios from 'axios';
import qs from 'qs';
import cookies from './cookies';
import {WinStorage} from "./AuthSrorage";

export const apiSeverUrl = "https://dev-alpha.hazardmon.com/"

const liveService = axios.create({
    baseURL: `${apiSeverUrl}`,
    paramsSerializer: (params) => {
        return qs.stringify(params, { indices: false, arrayFormat: 'comma' })
    }
});

export const getCSRFToken = () => {
    const elements = document.getElementsByName('csrfmiddlewaretoken')[0];
    return cookies.get('csrftoken') || (elements && (elements as HTMLInputElement).value);
};

liveService.defaults.headers.common['X-CSRFToken'] = getCSRFToken();

// const jwt = cookies.get('Authorization');
const jwt = WinStorage.getToken()

if (jwt) {
    liveService.defaults.headers.common.Authorization = `JWT ${jwt}`;
}

export default liveService;

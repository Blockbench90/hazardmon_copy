import {axios} from "../axios";
import {LoginValues} from "../../components/LoginBlock";
import {concatUrl} from "../../helpers/concatUrl";
import {ChangePassword, EmailNotification, oem_setting, support_contacts} from "../../store/branches/user/stateTypes";

interface APIResponse {
    data: any;
}

export const UserApi = {
    async me(): Promise<APIResponse> {
        const {data} = await axios.get<APIResponse>("api/v1/me/");
        return data;
    },
    async signIn(postData: LoginValues): Promise<APIResponse> {
        const {data} = await axios.post<APIResponse>("api/v1/accounts/login-jwt/", postData);
        return data;
    },
    async updateUser(payload: any): Promise<any> {
        const {status} = await axios.patch<Promise<any>>(`api/v1/users/${payload.user_id}/`, payload.data);
        return status;
    },
    async updateUserPassword(payload: ChangePassword): Promise<any> {
        const {status} = await axios.post<Promise<any>>(`api/v1/accounts/password/change/`, payload);
        return status;
    },
    async logout(): Promise<number> {
        const {status} = await axios.post<APIResponse>("api/v1/accounts/logout/");
        return status;
    },
    async getNotifications(payload: any): Promise<any> {
        const {data} = await axios.get<Promise<any>>(`api/v1/notifications/?limit=${payload.limit}&offset=${payload.offset}&ordering=${payload.ordering}`);
        return data;
    },
    async getNotificationsCount(): Promise<any> {
        const {data} = await axios.get<Promise<any>>(`api/v1/notifications/active-count/`);
        return data;
    },
    async searchNotifications(payload: any): Promise<any> {
        const url = concatUrl(payload);

        const data = await axios.get<Promise<any>>(`api/v1/notifications/?${url}`);
        return data;
    },
    async fetchExportNotifications(payload: any): Promise<any> {
        const url = concatUrl(payload);

        const {data} = await axios.get<Promise<any>>(`api/v1/notifications/export/?${url}`);
        return data;
    },
    async notificationsWS() {
        return new WebSocket(`${process.env.REACT_APP_WS_SERVER_URL}ws/current-user-notifications/`);
    },
    async getEmailNotifications(): Promise<any> {
        const data = await axios.get<Promise<any>>("api/v1/notification-settings/");
        return data;
    },
    async addEmailNotification(payload: any): Promise<any> {
        const data = await axios.post<Promise<any>>("api/v1/notification-settings/", payload);
        return data;
    },
    async updateEmailNotification(payload: { id: number, data: EmailNotification }): Promise<any> {
        const data = await axios.patch<Promise<any>>(`api/v1/notification-settings/${payload.id}/`);
        return data;
    },
    async removeEmailNotification(payload: number): Promise<any> {
        const data = await axios.delete<Promise<any>>(`api/v1/notification-settings/${payload}/`);
        return data;
    },
    async getCurrentEmailNotification(payload: number): Promise<any> {
        const data = await axios.get<Promise<any>>(`api/v1/notification-settings/${payload}`);
        return data;
    },
    async sendFeedback(payload: {about: string, text: string}): Promise<any> {
        const {status} = await axios.post<Promise<any>>(`api/v1/feedback/`, payload);
        return status;
    },
    async getOEMSettings(): Promise<any> {
        const {data} = await axios.get<Promise<any>>("api/v1/oem/rss-feed/");
        return data;
    },
    async getSupportContacts(): Promise<any> {
        const {data} = await axios.get<Promise<any>>("api/v1/oem/settings/");
        return data;
    },
    async addOEMSettings(payload: oem_setting[]): Promise<any> {
        const {status} = await axios.post<Promise<any>>("api/v1/oem/rss-feed/", payload);
        return status;
    },
    async addSupportContacts(payload: support_contacts): Promise<any> {
        const {data} = await axios.patch<Promise<any>>("api/v1/oem/settings/", payload);
        return data;
    },
};

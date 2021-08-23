import {axios} from "../axios";
import {AddSite, CurrentLocation, SetMemberShip, SitesState, UpdateMemberShip, UserData} from "../../store/branches/sites/stateTypes";


interface APIResponse {
    data: any;
}

export const SitesApi = {
    async getSites(): Promise<SitesState["sitesData"]> {
        const {data} = await axios.get<SitesState["sitesData"]>("api/v1/locations/");
        return data;
    },
    async getTimezones(): Promise<SitesState["timezones"]> {
        const {data} = await axios.get<SitesState["timezones"]>("api/v1/timezones/");
        return data;
    },
    async selectSites(id: string): Promise<number> {
        const {status} = await axios.post<APIResponse>(`api/v1/clients/${id}/select/`);
        return status;
    },
    async getSiteAccess(): Promise<SitesState["site_access"]> {
        const {data} = await axios.get<SitesState["site_access"]>("api/v1/locations/");
        return data;
    },
    async setUser(payload: UserData): Promise<any> {
        const {status} = await axios.post<Promise<any>>("api/v1/users/", payload);
        return status;
    },
    async getAssignUsers(clientId: string, locationId: string): Promise<any> {
        const {data} = await axios.get<Promise<any>>(`api/v1/clients/${clientId}/users/?with-location-membership=${locationId}`);
        return data;
    },
    async getCurrentLocation(id: string): Promise<any> {
        const {data} = await axios.get<Promise<any>>(`api/v1/locations/${id}/`);
        return data;
    },
    async updateLocation(payload: CurrentLocation): Promise<any> {
        const {status} = await axios.patch<Promise<any>>(`api/v1/locations/${payload.id}/`,
            {
                title: payload.title,
                address: payload.address,
                full_name: payload.full_name,
                email: payload.email,
                mobile: payload.mobile,
                timezone: payload.timezone,
            });
        return status;
    },
    async addSite(payload: AddSite): Promise<any> {
        const {data} = await axios.post<Promise<any>>("api/v1/locations/", payload);
        return data;
    },
    async removeLocation(payload: string): Promise<any> {
        const {status} = await axios.delete<Promise<any>>(`api/v1/locations/${payload}/`);

        return status;
    },
    async deactivateLocation(payload: string): Promise<any> {
        const {status} = await axios.post<Promise<any>>(`api/v1/locations/${payload}/suspend/`);
        return status;
    },
    async setMemberShip(payload: SetMemberShip): Promise<any> {
        const {status} = await axios.post<Promise<any>>("api/v1/membership/", payload);
        return status;
    },
    async updateMemberShip(payload: UpdateMemberShip): Promise<any> {
        const {status} = await axios.patch<Promise<any>>(`api/v1/membership/${payload.id}/`, {
            has_access: payload.has_access,
            permission: payload.permission,
        });
        return status;
    },
};

import {axios} from "../axios"
import {Device, DevicesState, FetchNextPortionDevices} from "../../store/branches/devices/stateTypes";
import {concatUrl} from "../../helpers/concatUrl";

interface APIResponse {
    data: any;
}


export const DevicesApi = {
    async getDevices(): Promise<DevicesState["devicesDate"]> {
        const {data} = await axios.get<DevicesState["devicesDate"]>("api/v1/devices/")
        return data
    },
    async selectDevices(id: string): Promise<number> {
        const {status} = await axios.post<APIResponse>(`api/v1/locations/${id}/select/`)
        return status
    },
    async selectDevice(id: string): Promise<number> {
        const {status} = await axios.post<APIResponse>(`/api/v1/devices/${id}/select/`)
        return status
    },
    async getMaintenanceIfo(id: string): Promise<any> {
        const {data} = await axios.get<APIResponse>(`api/v1/devices/${id}/get-maintenance-info/`)
        return data
    },
    async getNextPortionDevices(payload: FetchNextPortionDevices): Promise<any> {
        const url = concatUrl(payload)
        const {data} = await axios.get<DevicesState["devicesDate"]>(`api/v1/devices/?${url}`)
        return data
    },
    async getCurrentDevice(id: any): Promise<any> {
        const {data} = await axios.get<Promise<any>>(`api/v1/devices/${id}/`)
        return data
    },
    async getAllDevices(): Promise<any> {
        const {data} = await axios.get<Promise<any>>(`api/v1/devices/all/`)
        return data
    },
    async addDevice(payload: Device): Promise<any> {
        const {status} = await axios.post<Promise<any>>(`api/v1/devices/`, payload)
        return status
    },
    async updateCurrentDevice(payload: Device): Promise<any> {
        const status = await axios.patch<Promise<any>>(`api/v1/devices/${payload.id}/`, payload)
        return status
    },
    async removeDevice(payload: string): Promise<any> {
        const {status} = await axios.delete<Promise<any>>(`api/v1/devices/${payload}/`)
        return status
    },
    async deactivateDevice(payload: string): Promise<any> {
        const {status} = await axios.post<Promise<any>>(`api/v1/devices/${payload}/suspend/`)
        return status
    },
    async deleteCurrentDevice(id: string): Promise<any> {
        const {status} = await axios.delete<Promise<any>>(`api/v1/devices/$id}/`)
        return status
    },
}

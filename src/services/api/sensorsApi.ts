import {axios} from "../axios";
import {AddWarning} from "../../store/branches/sensors/stateTypes";

interface APIResponse {
    data: any;
}


export const SensorsApi = {
    async getSelectedSensorsByDevice(payload: string): Promise<any> {
        const {data} = await axios.get<APIResponse>(`api/v1/devices/${payload}/sensors/`)
        return data
    },
    async getWarnings(payload: string): Promise<any> {
        const {data} = await axios.get<APIResponse>(`api/v1/devices/${payload}/settings/warnings/`)
        return data
    },
    async addWarning(payload: { data: AddWarning[], device_id: string }): Promise<any> {
        const data = await axios.post<APIResponse>(`api/v1/devices/${payload.device_id}/settings/warnings/`, payload.data)
        return data
    },
    async getSensorNames(payload: string): Promise<any> {
        const data = await axios.get<APIResponse>(`api/v1/devices/${payload}/settings/sensor-names`)
        return data
    },
    async getSensorSettings(payload: number): Promise<any> {
        const {data} = await axios.get<APIResponse>(`api/v1/devices/${payload}/settings/sensor-types`)
        return data
    },
    async getSensorUnits(): Promise<any> {
        const {data} = await axios.get<APIResponse>("api/v1/ie-node-units/")
        return data
    },
    async addSensorNames(payload: any): Promise<any> {
        const data = await axios.post<APIResponse>(`api/v1/devices/${payload.device_id}/settings/sensor-names`, payload.data)
        return data
    },
    async addSensorSettings(payload: {device_id: number, data: any}): Promise<any> {
        const data = await axios.post<APIResponse>(`api/v1/devices/${payload.device_id}/settings/sensor-types`, payload.data)
        return data
    },
    async exportCSV(payload: number): Promise<any> {
        const {data} = await axios.get<APIResponse>(`api/v1/devices/${payload}/settings/export/sensor-names/`)
        return data
    },
    async fetchHistoricalGraphs(payload: { device_id: number, date: string, time: string, limit: number, offset: number }): Promise<any> {
        const data = await axios.get<APIResponse>(`/api/v1/devices/${payload.device_id}/historical/graphs/?timestamp=${payload.date}%20${payload.time}:00&limit=${payload.limit}&offset=${payload.offset}`)
        return data
    },
}

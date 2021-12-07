import {axios} from "../axios";
import {AddWarning, Maintenance} from "../../store/branches/sensors/stateTypes";

interface APIResponse {
    data: any;
}


export const SensorsApi = {
    async getSelectedSensorsByDevice(payload: string): Promise<any> {
        const {data} = await axios.get<APIResponse>(`api/v1/devices/${payload}/sensors/`);
        return data;
    },
    async getWarnings(payload: string): Promise<any> {
        const {data} = await axios.get<APIResponse>(`api/v1/devices/${payload}/settings/warnings/`);
        return data;
    },
    async addWarning(payload: { data: AddWarning[], device_id: string }): Promise<any> {
        const data = await axios.post<APIResponse>(`api/v1/devices/${payload.device_id}/settings/warnings/`, payload.data);
        return data;
    },
    async getSensorNames(payload: string): Promise<any> {
        const data = await axios.get<APIResponse>(`api/v1/devices/${payload}/settings/sensor-names`);
        return data;
    },
    async getSensorSettings(payload: number): Promise<any> {
        const {data} = await axios.get<APIResponse>(`api/v1/devices/${payload}/settings/sensor-types`);
        return data;
    },
    async getSensorUnits(): Promise<any> {
        const {data} = await axios.get<APIResponse>("api/v1/ie-node-units/");
        return data;
    },
    async getSnapshotSensors(payload: any): Promise<any> {
        const {data} = await axios.get<APIResponse>(`/api/v1/devices/${payload.device_id}/historical/records/${payload.record_id}/`);
        return data;
    },
    async addSensorNames(payload: any): Promise<any> {
        const data = await axios.post<APIResponse>(`api/v1/devices/${payload.device_id}/settings/sensor-names`, payload.data);
        return data;
    },
    async addSensorSettings(payload: { device_id: number, data: any }): Promise<any> {
        const data = await axios.post<APIResponse>(`api/v1/devices/${payload.device_id}/settings/sensor-types`, payload.data);
        return data;
    },
    async exportCSV(payload: number): Promise<any> {
        const {data} = await axios.get<APIResponse>(`api/v1/devices/${payload}/settings/export/sensor-names/`);
        return data;
    },
    async fetchHistoricalGraphs(payload: { device_id: number, date: string, time: string, limit?: number, offset?: number }): Promise<any> {
        const data = await axios.get<APIResponse>(`/api/v1/devices/${payload.device_id}/historical/records/?timestamp=${payload.date}%20${payload.time}:00&limit=${payload.limit}&offset=${payload.offset}`);
        return data;
    },
    async setMaintenance(payload: any): Promise<any> {
        const data = await axios.post<APIResponse>(`api/v1/devices/${payload.device_id}/maintenance/`, {
            event_type: payload.event_type,
            sensor_id: payload.sensor_id,
            sensor_name: payload.sensor_name,
            comment: payload.comment || "empty area",
            maintenance_time: payload.maintenance_time,
        });
        return data;
    },
    async setMaintenanceExpectOff(payload: Maintenance): Promise<any> {
        const data = await axios.post<APIResponse>(`api/v1/devices/${payload.device_id}/maintenance/`, {
            event_type: payload.event_type,
            sensor_id: payload.sensor_id,
            sensor_name: payload.sensor_name,
            comment: payload.comment || "empty area",
            maintenance_time: payload.maintenance_time,
        });
        return data;
    },
    async getF500Nodes(payload: number): Promise<any> {
        const {data} = await axios.get<APIResponse>(`api/v1/graphs/device/${payload}/f500-nodes/`);
        return data;
    },
    async updateArrangement(payload: {
        action: string,
        graph_type: string,
        node: string,
        sensor: string,
        device_id: number
    }): Promise<any> {
        const data = await axios.post<APIResponse>(`api/v1/graphs/device/${payload.device_id}/f500-update-arrangement/`, payload);
        return data;
    },
};

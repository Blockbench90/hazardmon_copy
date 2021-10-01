import {axios} from "../axios";
import {FetchCustomGraphs, FetchGraphs} from "../../store/branches/graphs/stateTypes";

interface APIResponse {
    data: any;
}

export const GraphsApi = {
    async getGraphs(payload: { device_id: number, timescale: string }): Promise<APIResponse> {
        const {data} = await axios.get<APIResponse>(`api/v1/graphs/device/${payload.device_id}/?timescale=${payload.timescale}`);
        console.log("get grahps ==>", data)
        return data;
    },
    async getCustomGraphs(payload: FetchCustomGraphs): Promise<APIResponse> {
        const {data} = await axios.get<APIResponse>(`api/v1/graphs/device/${payload.id}/?timestamp=${payload.date}%20${payload.time}:00`);
        return data;
    },
    async exportCSV(payload: FetchGraphs): Promise<APIResponse> {
        const {data} = await axios.get<APIResponse>(`api/v1/graphs/device/${payload.device_id}/export/?current_chart_type=${payload.timescale}&sensor_id=${payload.sensor_id}`);
        return data;
    },
    async getLiveGraphsData(id: number): Promise<APIResponse> {
        const {data} = await axios.get<APIResponse>(`api/v1/graphs/device/${id}/live-update/`);
        console.log("lige graphs ==>", data)
        return data;
    },

};

import {axios} from "../axios";
import {RequestPayloadAnalytics} from "../../store/branches/analytics/stateTypes";

interface APIResponse {
    data: any;
}


export const AnalyticsApi = {
    async getAlarmSensor(payload: RequestPayloadAnalytics): Promise<APIResponse> {
        const data = await axios.get<APIResponse>(`api/v1/analytics/${payload.device_id}/alarm-sensor/?start=${payload.from}&end=${payload.to}`)
        return data
    },
    async getAlarmTime(payload: RequestPayloadAnalytics): Promise<APIResponse> {
        const data = await axios.get<APIResponse>(`api/v1/analytics/${payload.device_id}/alarm-time/?start=${payload.from}&end=${payload.to}`)
        return data
    },
    async getAlarmType(payload: RequestPayloadAnalytics): Promise<APIResponse> {
        const data = await axios.get<APIResponse>(`api/v1/analytics/${payload.device_id}/alarm-type/?start=${payload.from}&end=${payload.to}`)
        return data
    }
}

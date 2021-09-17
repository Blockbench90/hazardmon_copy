import {LoadingStatus} from "../../status";

export interface RequestPayloadAnalytics {
    device_id: number
    from: string
    to: string
}

export interface AnalyticsState {
    alarm_sensor_data: [],
    alarm_time_data: [],
    alarm_type_data: [],
    status: LoadingStatus
    status_operation: LoadingStatus
}

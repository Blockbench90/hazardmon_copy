import produce, {Draft} from "immer"
import {LoadingStatus} from "../../status"
import { AnalyticsState } from "./stateTypes"
import {AnalyticsActions} from "./actionCreators";
import { AnalyticsAT } from "./actionTypes";


const initialAnalyticsState: AnalyticsState = {
    alarm_type_data: null,
    alarm_time_data: null,
    alarm_sensor_data: null,
    status: LoadingStatus.NEVER,
    status_operation: LoadingStatus.NEVER,
}

export const analyticsReducer = produce((draft: Draft<AnalyticsState>, action: AnalyticsActions) => {
    switch (action.type) {
        case AnalyticsAT.SET_SENSOR_ANALYTICS:
            draft.alarm_sensor_data = action.payload
            break

        case AnalyticsAT.SET_TIME_ANALYTICS:
            draft.alarm_time_data = action.payload
            break

        case AnalyticsAT.SET_TYPE_ANALYTICS:
            draft.alarm_type_data = action.payload
            break

        case AnalyticsAT.SET_LOADING_STATUS_ANALYTICS:
            draft.status = action.payload
            break

        case AnalyticsAT.SET_STATUS_OPERATION_STATE:
            draft.status_operation = action.payload
            break

        case AnalyticsAT.CLEAR_STATE_ANALYTICS:
            draft.alarm_type_data = null
            draft.alarm_time_data = null
            draft.alarm_sensor_data = null
            break

        default:
            break
    }
}, initialAnalyticsState)

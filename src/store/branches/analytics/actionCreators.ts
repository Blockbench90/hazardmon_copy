import {
    AnalyticsAT, ClearAnalyticsAI,
    FetchAnalyticsAI, SetAnalyticsLoadingStatusAI,
    SetAnalyticsSensorAI,
    SetAnalyticsStatusOperationAI, SetAnalyticsTimeAI, SetAnalyticsTypeAI,
} from "./actionTypes";
import {AnalyticsState, RequestPayloadAnalytics} from "./stateTypes";

export const analyticsAC = {

    fetchAnalytics: (payload: RequestPayloadAnalytics): FetchAnalyticsAI => ({
        type: AnalyticsAT.FETCH_ANALYTICS,
        payload,
    }),

    setAnalyticsSensor: (payload: AnalyticsState["alarm_sensor_data"]): SetAnalyticsSensorAI => ({
        type: AnalyticsAT.SET_SENSOR_ANALYTICS,
        payload,
    }),

    setAnalyticsTime: (payload: AnalyticsState["alarm_time_data"]): SetAnalyticsTimeAI => ({
        type: AnalyticsAT.SET_TIME_ANALYTICS,
        payload,
    }),

    setAnalyticsType: (payload: AnalyticsState["alarm_type_data"]): SetAnalyticsTypeAI => ({
        type: AnalyticsAT.SET_TYPE_ANALYTICS,
        payload,
    }),

    clearAnalytics: (): ClearAnalyticsAI => ({
        type: AnalyticsAT.CLEAR_STATE_ANALYTICS,
    }),

    setStatusOperationAnalytics: (payload: AnalyticsState["status_operation"]): SetAnalyticsStatusOperationAI => ({
        type: AnalyticsAT.SET_STATUS_OPERATION_STATE,
        payload,
    }),

    setAnalyticsLoadingStatus: (payload: AnalyticsState["status"]): SetAnalyticsLoadingStatusAI => ({
        type: AnalyticsAT.SET_LOADING_STATUS_ANALYTICS,
        payload,
    }),
};


export type AnalyticsActions =
    | FetchAnalyticsAI
    | SetAnalyticsSensorAI
    | SetAnalyticsTimeAI
    | SetAnalyticsTypeAI
    | ClearAnalyticsAI
    | SetAnalyticsLoadingStatusAI
    | SetAnalyticsStatusOperationAI

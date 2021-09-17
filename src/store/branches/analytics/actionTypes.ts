import {Action} from "redux";
import {LoadingStatus} from "../../status";
import {AnalyticsState, RequestPayloadAnalytics} from "./stateTypes";


export enum AnalyticsAT {
    FETCH_ANALYTICS = "analytics/FETCH_ANALYTICS",

    SET_SENSOR_ANALYTICS = "analytics/SET_ALARM_SENSOR_ANALYTICS",
    SET_TIME_ANALYTICS = "analytics/SET_ALARM_TIME_ANALYTICS",
    SET_TYPE_ANALYTICS = "analytics/SET_ALARM_TYPE_ANALYTICS",
    CLEAR_STATE_ANALYTICS = "analytics/CLEAR_STATE_ANALYTICS",
    SET_STATUS_OPERATION_STATE = "analytics/SET_STATUS_OPERATION_STATE",
    SET_LOADING_STATUS_ANALYTICS = "analytics/SET_LOADING_STATUS_ANALYTICS",
}

export interface FetchAnalyticsAI extends Action<AnalyticsAT> {
    type: AnalyticsAT.FETCH_ANALYTICS;
    payload: RequestPayloadAnalytics;
}


export interface SetAnalyticsSensorAI extends Action<AnalyticsAT> {
    type: AnalyticsAT.SET_SENSOR_ANALYTICS;
    payload: AnalyticsState["alarm_sensor_data"];
}


export interface SetAnalyticsTimeAI extends Action<AnalyticsAT> {
    type: AnalyticsAT.SET_TIME_ANALYTICS;
    payload: AnalyticsState["alarm_time_data"];
}


export interface SetAnalyticsTypeAI extends Action<AnalyticsAT> {
    type: AnalyticsAT.SET_TYPE_ANALYTICS;
    payload: AnalyticsState["alarm_type_data"];
}

export interface ClearAnalyticsAI extends Action<AnalyticsAT> {
    type: AnalyticsAT.CLEAR_STATE_ANALYTICS;
}

export interface SetAnalyticsLoadingStatusAI extends Action<AnalyticsAT> {
    type: AnalyticsAT.SET_LOADING_STATUS_ANALYTICS;
    payload: LoadingStatus;
}

export interface SetAnalyticsStatusOperationAI extends Action<AnalyticsAT> {
    type: AnalyticsAT.SET_STATUS_OPERATION_STATE;
    payload: LoadingStatus;
}


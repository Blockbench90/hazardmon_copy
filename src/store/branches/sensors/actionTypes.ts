import {Action} from "redux";
import {LoadingStatus} from "../../status";
import {AddWarning, FilterStatus, Maintenance, SensorNames, SensorsState, Unit} from "./stateTypes";


export enum SensorsAT {
    FETCH_WARNINGS_SENSORS = "sensors_dashboard/FETCH_WARNINGS_SENSORS",
    GET_SNAPSHOT_SENSORS = "sensors_dashboard/GET_SNAPSHOT_SENSORS",
    GET_OUT_SNAPSHOT_SENSORS = "sensors_dashboard/GET_OUT_SNAPSHOT_SENSORS",
    FETCH_WS_DATA_SENSORS = "sensors_dashboard/FETCH_WS_DATA_SENSORS",
    FETCH_HISTORICAL_GRAPHS_SENSORS = "sensors_dashboard/FETCH_HISTORICAL_GRAPHS_SENSORS",
    SET_HISTORICAL_GRAPHS_SENSORS_DATA = "sensors_dashboard/SET_HISTORICAL_GRAPHS_SENSORS_DATA",
    SET_WS_DATA_SENSORS = "sensors_dashboard/SET_WS_DATA_SENSORS",
    CLEAR_WS_DATA_SENSORS = "sensors_dashboard/CLEAR_WS_DATA_SENSORS",
    FETCH_WARNINGS = "sensors_dashboard/FETCH_WARNINGS",
    FETCH_SENSOR_NAMES = "sensors_dashboard/FETCH_SENSOR_NAMES",
    FETCH_SENSOR_SETTINGS = "sensors_dashboard/FETCH_SENSOR_SETTINGS",
    SET_WARNINGS = "sensors_dashboard/SET_WARNINGS",
    SET_SENSOR_NAMES = "sensors_dashboard/SET_SENSOR_NAMES",
    SET_SENSOR_SETTINGS = "sensors_dashboard/SET_SENSOR_SETTINGS",
    SET_SENSOR_UNITS = "sensors_dashboard/SET_SENSOR_UNITS",
    ADD_SENSOR_NAMES = "sensors_dashboard/ADD_SENSOR_NAMES",
    ADD_SENSOR_SETTINGS = "sensors_dashboard/ADD_SENSOR_SETTINGS",
    SET_WARNINGS_SENSORS = "sensors_dashboard/SET_WARNINGS_SENSORS",
    ADD_WARNING = "sensors_dashboard/ADD_WARNING",
    SET_LOADING_STATE = "sensors_dashboard/SET_LOADING_STATE",
    CHANGE_FILTER_STATUS = "sensors_dashboard/CHANGE_FILTER_STATUS",
    SET_STATUS_OPERATION_STATE = "sensors_dashboard/SET_STATUS_OPERATION_STATE",
    SET_MAINTENANCE_PAGE = "sensors_dashboard/SET_MAINTENANCE_PAGE",
    SET_MAINTENANCE_STATUS_OPERATION = "sensors_dashboard/SET_MAINTENANCE_STATUS_OPERATION",
    SET_MAINTENANCE = "sensors_dashboard/SET_MAINTENANCE",
    SET_MAINTENANCE_AFTER_RELOAD = "sensors_dashboard/SET_MAINTENANCE_AFTER_RELOAD",
    CHANGE_EVENT_TYPE_ALARM_OFF = "sensors_dashboard/CHANGE_EVENT_TYPE_ALARM_OFF",
    SHOW_CONFIRM_MAINTENANCE_MODAL = "sensors_dashboard/SHOW_CONFIRM_MAINTENANCE_MODAL",
    STOP_SENSOR_MAINTENANCE = "sensors_dashboard/STOP_SENSOR_MAINTENANCE",
    FAILED_MAINTENANCE = "sensors_dashboard/FAILED_MAINTENANCE",
    UPDATE_ARRANGEMENT = "sensors_dashboard/UPDATE_ARRANGEMENT"
}

export interface FetchWsDataSensorsAI extends Action<SensorsAT> {
    type: SensorsAT.FETCH_WS_DATA_SENSORS,
    payload: any
}

export interface GetSnapshotSensorsAI extends Action<SensorsAT> {
    type: SensorsAT.GET_SNAPSHOT_SENSORS,
    payload: {isSnapshot: boolean, device_id: number, record_id: string}
}

export interface GetOutSnapshotSensorsAI extends Action<SensorsAT> {
    type: SensorsAT.GET_OUT_SNAPSHOT_SENSORS,
}

export interface SetWsDataSensorsAI extends Action<SensorsAT> {
    type: SensorsAT.SET_WS_DATA_SENSORS,
    payload: any
}

export interface FetchSensorsAI extends Action<SensorsAT> {
    type: SensorsAT.FETCH_WARNINGS_SENSORS,
    payload: string
}

export interface SetWarningsSensorsAI extends Action<SensorsAT> {
    type: SensorsAT.SET_WARNINGS_SENSORS;
    payload: SensorsState["warning_sensors"]
}

export interface FetchWarningsAI extends Action<SensorsAT> {
    type: SensorsAT.FETCH_WARNINGS;
    payload: string
}

export interface FetchSensorNamesAI extends Action<SensorsAT> {
    type: SensorsAT.FETCH_SENSOR_NAMES;
    payload: string
}

export interface FetchSensorSettingsAI extends Action<SensorsAT> {
    type: SensorsAT.FETCH_SENSOR_SETTINGS;
    payload: number
}

export interface SetWarningsAI extends Action<SensorsAT> {
    type: SensorsAT.SET_WARNINGS;
    payload: SensorsState["warnings"]
}

export interface SetSensorNamesAI extends Action<SensorsAT> {
    type: SensorsAT.SET_SENSOR_NAMES;
    payload: SensorNames
}

export interface SetSensorSettingsAI extends Action<SensorsAT> {
    type: SensorsAT.SET_SENSOR_SETTINGS;
    payload: any
}

export interface SetSensorUnitsAI extends Action<SensorsAT> {
    type: SensorsAT.SET_SENSOR_UNITS;
    payload: Unit[]
}

export interface AddSensorNamesAI extends Action<SensorsAT> {
    type: SensorsAT.ADD_SENSOR_NAMES;
    payload: { device_id: string, data: any }
}

export interface AddSensorSettingsAI extends Action<SensorsAT> {
    type: SensorsAT.ADD_SENSOR_SETTINGS;
    payload: { device_id: number, data: any }
}

export interface ChangeFilterSensorsStatusAI extends Action<SensorsAT> {
    type: SensorsAT.CHANGE_FILTER_STATUS;
    payload: FilterStatus
}

export interface FetchHistoricalGraphsAI extends Action<SensorsAT> {
    type: SensorsAT.FETCH_HISTORICAL_GRAPHS_SENSORS;
    payload: { device_id: number, date: string, time: string, limit?: number, offset?: number }
}

export interface SetHistoricalGraphsDataAI extends Action<SensorsAT> {
    type: SensorsAT.SET_HISTORICAL_GRAPHS_SENSORS_DATA;
    payload: any
}

export interface AddWarningAI extends Action<SensorsAT> {
    type: SensorsAT.ADD_WARNING;
    payload: { data: AddWarning[], device_id: string }
}

export interface SetSensorsLoadingStatusAI extends Action<SensorsAT> {
    type: SensorsAT.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export interface SetSensorsStatusOperationAI extends Action<SensorsAT> {
    type: SensorsAT.SET_STATUS_OPERATION_STATE;
    payload: LoadingStatus;
}

export interface SetMaintenancePageAI extends Action<SensorsAT> {
    type: SensorsAT.SET_MAINTENANCE_PAGE;
    payload: boolean;
}

export interface SetMaintenanceStatusOperationAI extends Action<SensorsAT> {
    type: SensorsAT.SET_MAINTENANCE_STATUS_OPERATION;
    payload: LoadingStatus;
}

export interface SetMaintenanceAI extends Action<SensorsAT> {
    type: SensorsAT.SET_MAINTENANCE;
    payload: Maintenance
}

export interface SetMaintenanceAfterReloadAI extends Action<SensorsAT> {
    type: SensorsAT.SET_MAINTENANCE_AFTER_RELOAD;
    payload: Maintenance
}

export interface ChangeEventTypeMaintenanceAI extends Action<SensorsAT> {
    type: SensorsAT.CHANGE_EVENT_TYPE_ALARM_OFF;
    payload: Maintenance
}

export interface StopSensorMaintenanceAI extends Action<SensorsAT> {
    type: SensorsAT.STOP_SENSOR_MAINTENANCE;
    payload: Maintenance
}

export interface FailedMaintenanceAI extends Action<SensorsAT> {
    type: SensorsAT.FAILED_MAINTENANCE;
    payload: string
}

export interface ShowConfirmModalAI extends Action<SensorsAT> {
    type: SensorsAT.SHOW_CONFIRM_MAINTENANCE_MODAL;
    payload: SensorsState["confirmMaintenance"]
}

export interface ClearWsDataSensorsAI extends Action<SensorsAT> {
    type: SensorsAT.CLEAR_WS_DATA_SENSORS;
}

export interface UpdateArrangementAI extends Action<SensorsAT> {
    type: SensorsAT.UPDATE_ARRANGEMENT;
    payload: {action: string, sensor: string, device_id: number, graph_type: string}
}

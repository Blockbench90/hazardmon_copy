import {
    AddSensorNamesAI, AddSensorSettingsAI,
    AddWarningAI,
    ChangeFilterSensorsStatusAI,
    ClearWsDataSensorsAI,
    FetchHistoricalGraphsAI,
    FetchSensorNamesAI,
    FetchSensorsAI,
    FetchSensorSettingsAI,
    FetchWarningsAI,
    FetchWsDataSensorsAI,
    SensorsAT,
    SetHistoricalGraphsDataAI, SetMaintenanceAI, SetMaintenancePageAI, SetMaintenanceStatusOperationAI,
    SetSensorNamesAI,
    SetSensorSettingsAI,
    SetSensorsLoadingStatusAI,
    SetSensorsStatusOperationAI,
    SetSensorUnitsAI,
    SetWarningsAI,
    SetWarningsSensorsAI,
    SetWsDataSensorsAI,
} from "./actionTypes";
import {AddWarning, FilterStatus, SensorNames, SensorsState, Unit} from "./stateTypes";
import {LoadingStatus} from "../../types";



export const sensorsAC = {

    fetchSensors: (payload: string): FetchSensorsAI => ({
        type: SensorsAT.FETCH_WARNINGS_SENSORS,
        payload,
    }),

    fetchWarnings: (payload: string): FetchWarningsAI => ({
        type: SensorsAT.FETCH_WARNINGS,
        payload,
    }),

    fetchSensorNames: (payload: string): FetchSensorNamesAI => ({
        type: SensorsAT.FETCH_SENSOR_NAMES,
        payload,
    }),

    fetchSensorSettings: (payload: number): FetchSensorSettingsAI => ({
        type: SensorsAT.FETCH_SENSOR_SETTINGS,
        payload,
    }),

    setWarningSensors: (payload: SensorsState["warning_sensors"]): SetWarningsSensorsAI => ({
        type: SensorsAT.SET_WARNINGS_SENSORS,
        payload,
    }),

    setWarningsSign: (payload: SensorsState["warnings"]): SetWarningsAI => ({
        type: SensorsAT.SET_WARNINGS,
        payload,
    }),

    setSensorNames: (payload: SensorNames): SetSensorNamesAI => ({
        type: SensorsAT.SET_SENSOR_NAMES,
        payload,
    }),

    setSensorSettings: (payload: any): SetSensorSettingsAI => ({
        type: SensorsAT.SET_SENSOR_SETTINGS,
        payload,
    }),

    setSensorUnits: (payload: Unit[]): SetSensorUnitsAI => ({
        type: SensorsAT.SET_SENSOR_UNITS,
        payload,
    }),

    setSensorNamesNetworks: (payload: SensorNames): SetSensorNamesAI => ({
        type: SensorsAT.SET_SENSOR_NAMES,
        payload,
    }),

    addSensorNames: (payload: { device_id: string, data: any }): AddSensorNamesAI => ({
        type: SensorsAT.ADD_SENSOR_NAMES,
        payload,
    }),

    addSensorSettings: (payload: { device_id: number, data: any }): AddSensorSettingsAI => ({
        type: SensorsAT.ADD_SENSOR_SETTINGS,
        payload,
    }),

    addWarning: (payload: { data: AddWarning[], device_id: string }): AddWarningAI => ({
        type: SensorsAT.ADD_WARNING,
        payload,
    }),

    setSensorsLoadingStatus: (payload: SensorsState["status"]): SetSensorsLoadingStatusAI => ({
        type: SensorsAT.SET_LOADING_STATE,
        payload,
    }),

    setSensorsStatusOperation: (payload: SensorsState["status_operation"]): SetSensorsStatusOperationAI => ({
        type: SensorsAT.SET_STATUS_OPERATION_STATE,
        payload,
    }),

    setMaintenancePage: (payload: boolean): SetMaintenancePageAI => ({
        type: SensorsAT.SET_MAINTENANCE_PAGE,
        payload,
    }),

    setMaintenanceStatusOperation: (payload: LoadingStatus): SetMaintenanceStatusOperationAI => ({
        type: SensorsAT.SET_MAINTENANCE_STATUS_OPERATION,
        payload,
    }),

    fetchWsSensorsData: (payload: any): FetchWsDataSensorsAI => ({
        type: SensorsAT.FETCH_WS_DATA_SENSORS,
        payload,
    }),

    fetchHistoricalGraphs: (payload: { device_id: number, date: string, time: string, limit: number, offset: number }): FetchHistoricalGraphsAI => ({
        type: SensorsAT.FETCH_HISTORICAL_GRAPHS_SENSORS,
        payload,
    }),

    setHistoricalGraphsData: (payload: any): SetHistoricalGraphsDataAI => ({
        type: SensorsAT.SET_HISTORICAL_GRAPHS_SENSORS_DATA,
        payload,
    }),

    setWsSensorsData: (payload: any): SetWsDataSensorsAI => ({
        type: SensorsAT.SET_WS_DATA_SENSORS,
        payload,
    }),

    changeFilterStatusSensors: (payload: FilterStatus): ChangeFilterSensorsStatusAI => ({
        type: SensorsAT.CHANGE_FILTER_STATUS,
        payload,
    }),

    setMaintenance: (payload: string): SetMaintenanceAI => ({
        type: SensorsAT.SET_MAINTENANCE,
        payload,
    }),

    clearWsSensorsData: (): ClearWsDataSensorsAI => ({
        type: SensorsAT.CLEAR_WS_DATA_SENSORS,
    }),

}

export type SensorsActions =
    | FetchSensorsAI
    | SetWarningsSensorsAI
    | AddWarningAI
    | FetchWarningsAI
    | FetchSensorNamesAI
    | FetchSensorSettingsAI
    | SetSensorUnitsAI
    | FetchHistoricalGraphsAI
    | SetHistoricalGraphsDataAI
    | SetWarningsAI
    | SetSensorNamesAI
    | SetSensorSettingsAI
    | AddSensorNamesAI
    | AddSensorSettingsAI
    | ChangeFilterSensorsStatusAI
    | SetSensorsLoadingStatusAI
    | SetSensorsStatusOperationAI
    | FetchWsDataSensorsAI
    | SetWsDataSensorsAI
    | ClearWsDataSensorsAI
    | SetMaintenanceStatusOperationAI
    | SetMaintenancePageAI
    | SetMaintenanceAI

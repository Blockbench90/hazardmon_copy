import produce, {Draft} from "immer";
import {LoadingStatus} from "../../status";
import {FilterStatus, SensorsState} from "./stateTypes";
import {SensorsActions} from "./actionCreators";
import {SensorsAT} from "./actionTypes";


const initialSensorsState: SensorsState = {
    sensorsData: null,
    ws_data: null,
    warning_sensors: null,
    sensorNames: null,
    sensorSettings: null,
    units: null,
    current_sensor: null,
    filter_status: FilterStatus.ACTIVE,
    warnings: null,
    historical_data: null,
    status: LoadingStatus.NEVER,
    status_operation: LoadingStatus.NEVER,
    isMaintenance: false,
    showConfirmMaintenance: {
        isShow: false,
        sensor: null
    },
    maintenanceSensorsArray: [],
    maintenance_status_operation: LoadingStatus.NEVER,
    isSelected: false,
};

export const sensorsReducer = produce((draft: Draft<SensorsState>, action: SensorsActions) => {
    switch (action.type) {
        case SensorsAT.SET_LOADING_STATE:
            draft.status = action.payload;
            break;

        case SensorsAT.SET_WARNINGS:
            draft.warnings = action.payload;
            draft.status = LoadingStatus.SUCCESS;
            break;

        case SensorsAT.SET_STATUS_OPERATION_STATE:
            draft.status_operation = action.payload;
            break;

        case SensorsAT.SET_WARNINGS_SENSORS:
            draft.warning_sensors = action.payload;
            draft.status = LoadingStatus.LOADED;
            break;

        case SensorsAT.SET_SENSOR_NAMES:
            draft.sensorNames = action.payload;
            draft.status = LoadingStatus.LOADED;
            break;

        case SensorsAT.SET_SENSOR_SETTINGS:
            draft.sensorSettings = action.payload;
            draft.status = LoadingStatus.LOADED;
            break;

        case SensorsAT.SET_SENSOR_UNITS:
            draft.units = action.payload;
            draft.status = LoadingStatus.LOADED;
            break;

        case SensorsAT.SET_WS_DATA_SENSORS:
            draft.ws_data = action.payload;
            draft.status = LoadingStatus.LOADED;
            break;

        case SensorsAT.CHANGE_FILTER_STATUS:
            draft.filter_status = action.payload;
            break;

        case SensorsAT.SET_HISTORICAL_GRAPHS_SENSORS_DATA:
            draft.historical_data = action.payload;
            draft.status = LoadingStatus.LOADED;
            break;

        case SensorsAT.CLEAR_WS_DATA_SENSORS:
            draft.ws_data = null;
            break;

        case SensorsAT.SET_MAINTENANCE_STATUS_OPERATION:
            draft.maintenance_status_operation = action.payload
            break;

        case SensorsAT.SET_MAINTENANCE_PAGE:
            draft.isMaintenance = action.payload
            break;

        case SensorsAT.SET_MAINTENANCE:
            draft.maintenanceSensorsArray.push(action.payload)
            break;

        case SensorsAT.SHOW_CONFIRM_MAINTENANCE_MODAL:
            draft.showConfirmMaintenance = action.payload
            break;

        case SensorsAT.STOP_SENSOR_MAINTENANCE:
            const newArray = draft.maintenanceSensorsArray.filter((item) => item.sensor_id !== action.payload.sensor_id)
            draft.maintenanceSensorsArray = newArray
            console.log("reducer draft.maintenanceSensorsArray ==>", draft.maintenanceSensorsArray)
            break;

        default:
            break;
    }
}, initialSensorsState);

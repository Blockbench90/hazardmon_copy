import produce, {Draft} from "immer";
import {LoadingStatus} from "../../status";
import {DevicesState} from "./stateTypes";
import {DevicesActions} from "./actionCreators";
import {DevicesAT} from "./actionTypes";


const initialDevicesState: DevicesState = {
    devicesDate: null,
    current_device: null,
    all_devices: null,
    status: LoadingStatus.NEVER,
    status_operation: LoadingStatus.NEVER,
    isSelected: false,
};

export const devicesReducer = produce((draft: Draft<DevicesState>, action: DevicesActions) => {
    switch (action.type) {
        case DevicesAT.SET_LOADING_STATE:
            draft.status = action.payload;
            break;

        case DevicesAT.SET_DEVICES_OPERATION_STATUS:
            draft.status_operation = action.payload;
            break;

        case DevicesAT.SET_DEVICES:
            draft.devicesDate = action.payload;
            draft.status = LoadingStatus.LOADED;
            break;

        case DevicesAT.SET_ALL_DEVICES:
            draft.all_devices = action.payload;
            draft.status = LoadingStatus.LOADED;
            break;

        case DevicesAT.SET_CURRENT_DEVICE:
            draft.current_device = action.payload;
            draft.status = LoadingStatus.LOADED;
            break;

        case DevicesAT.SELECT_DEVICES:
            draft.isSelected = true;
            break;

        case DevicesAT.CHANGE_ACTIVE_CURRENT_DEVICE:
            draft.current_device.is_suspended = !draft.current_device.is_suspended;
            break;

        case DevicesAT.CLEAR_SELECT_DEVICES:
            draft.isSelected = false;
            break;

        case DevicesAT.CLEAR_DEVICES:
            draft.devicesDate = null;
            draft.status = LoadingStatus.NEVER;
            draft.isSelected = false;
            break;

        default:
            break;
    }
}, initialDevicesState);

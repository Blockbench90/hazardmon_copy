import {Device, DevicesState} from "./stateTypes"
import {
    AddDeviceAI, ChangeActiveCurDevAI,
    ClearDevicesAI,
    ClearSelectDevicesAI, DeactivateDeviceAI,
    DevicesAT, FetchAllDevicesAI,
    FetchCurrentDeviceAI,
    FetchDevicesAI, RemoveDeviceAI,
    SelectDeviceAI,
    SelectDevicesAI,
    SetAllDevicesAI,
    SetCurrentDeviceAI,
    SetDevicesAI,
    SetDevicesLoadingStatusAI, SetOperationStatusDevicesAI,
    UpdateCurrentDeviceAI,
} from "./actionTypes";

export const devicesAC = {

    selectDevices: (payload: string): SelectDevicesAI => ({
        type: DevicesAT.SELECT_DEVICES,
        payload,
    }),

    selectDevice: (payload: string): SelectDeviceAI => ({
        type: DevicesAT.SELECT_DEVICE,
        payload,
    }),

    fetchDevices: (): FetchDevicesAI => ({
        type: DevicesAT.FETCH_DEVICES,
    }),

    fetchAllDevices: (): FetchAllDevicesAI => ({
        type: DevicesAT.FETCH_ALL_DEVICES,
    }),


    fetchCurrentDevice: (payload: number): FetchCurrentDeviceAI => ({
        type: DevicesAT.FETCH_CURRENT_DEVICE,
        payload,
    }),

    updateCurrentDevice: (payload: Device): UpdateCurrentDeviceAI => ({
        type: DevicesAT.UPDATE_CURRENT_DEVICE,
        payload,
    }),

    setCurrentDevice: (payload: Device): SetCurrentDeviceAI => ({
        type: DevicesAT.SET_CURRENT_DEVICE,
        payload,
    }),

    addDevice: (payload: Device): AddDeviceAI => ({
        type: DevicesAT.ADD_DEVICE,
        payload,
    }),

    setDevices: (payload: DevicesState["devicesDate"]): SetDevicesAI => ({
        type: DevicesAT.SET_DEVICES,
        payload,
    }),

    setAllDevices: (payload: Device[]): SetAllDevicesAI => ({
        type: DevicesAT.SET_ALL_DEVICES,
        payload,
    }),

    removeDevice: (payload: string): RemoveDeviceAI => ({
        type: DevicesAT.REMOVE_CURRENT_DEVICE,
        payload,
    }),

    deactivateDevice: (payload: string): DeactivateDeviceAI => ({
        type: DevicesAT.DEACTIVATE_CURRENT_DEVICE,
        payload,
    }),

    changeActiveCurDev: (payload?: boolean): ChangeActiveCurDevAI => ({
        type: DevicesAT.CHANGE_ACTIVE_CURRENT_DEVICE,
        payload,
    }),

    setDevicesLoadingStatus: (payload: DevicesState["status"]): SetDevicesLoadingStatusAI => ({
        type: DevicesAT.SET_LOADING_STATE,
        payload,
    }),

    setOperationDevices: (payload: DevicesState["status_operation"]): SetOperationStatusDevicesAI => ({
        type: DevicesAT.SET_DEVICES_OPERATION_STATUS,
        payload,
    }),

    clearDevices: (): ClearDevicesAI => ({
        type: DevicesAT.CLEAR_DEVICES,
    }),

    clearSelectDevices: (): ClearSelectDevicesAI => ({
        type: DevicesAT.CLEAR_SELECT_DEVICES,
    }),

}


export type DevicesActions =
    | FetchDevicesAI
    | FetchCurrentDeviceAI
    | FetchAllDevicesAI
    | UpdateCurrentDeviceAI
    | SetCurrentDeviceAI
    | SetAllDevicesAI
    | DeactivateDeviceAI
    | RemoveDeviceAI
    | ChangeActiveCurDevAI
    | AddDeviceAI
    | SetDevicesAI
    | SelectDevicesAI
    | SelectDeviceAI
    | ClearDevicesAI
    | ClearSelectDevicesAI
    | SetDevicesLoadingStatusAI
    | SetOperationStatusDevicesAI

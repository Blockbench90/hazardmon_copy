import {Device, DevicesState, FetchNextPortionDevices, MaintenanceInfo} from "./stateTypes";
import {
    AddDeviceAI,
    ChangeActiveCurDevAI,
    ClearDevicesAI,
    ClearSelectDevicesAI,
    DeactivateDeviceAI,
    DevicesAT,
    FetchAllDevicesAI,
    FetchCurrentDeviceAI,
    FetchDevicesAI,
    FetchNextPortionDevicesAI,
    GetMaintenanceInfoAI,
    NotificationSelectAI,
    RemoveDeviceAI,
    SelectDeviceAI,
    SelectDevicesAI,
    SetAllDevicesAI,
    SetCurrentDeviceAI,
    SetDevicesAI,
    SetDevicesLoadingStatusAI,
    SetMaintenanceInfoAI,
    SetOperationStatusDevicesAI,
    StopDeviceMaintenanceAI,
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

    getMaintenanceInfo: (payload: string): GetMaintenanceInfoAI => ({
        type: DevicesAT.GET_MAINTENANCE_INFO,
        payload,
    }),

    fetchDevices: (): FetchDevicesAI => ({
        type: DevicesAT.FETCH_DEVICES,
    }),

    fetchNextDevicesPortion: (payload: FetchNextPortionDevices): FetchNextPortionDevicesAI => ({
        type: DevicesAT.FETCH_NEXT_PORTION_DEVICES,
        payload
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

    setMaintenanceInfo: (payload: MaintenanceInfo[]): SetMaintenanceInfoAI => ({
        type: DevicesAT.SET_MAINTENANCE_INFO,
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

    notificationSelect: (payload?: {locationId: number, deviceId: number}): NotificationSelectAI => ({
        type: DevicesAT.NOTIFICATION_SELECT,
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

    stopDeviceMaintenance: (payload: string): StopDeviceMaintenanceAI => ({
        type: DevicesAT.STOP_DEVICE_MAINTENANCE,
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
    | SetMaintenanceInfoAI
    | SetAllDevicesAI
    | DeactivateDeviceAI
    | RemoveDeviceAI
    | GetMaintenanceInfoAI
    | ChangeActiveCurDevAI
    | AddDeviceAI
    | SetDevicesAI
    | SelectDevicesAI
    | SelectDeviceAI
    | ClearDevicesAI
    | NotificationSelectAI
    | ClearSelectDevicesAI
    | SetDevicesLoadingStatusAI
    | SetOperationStatusDevicesAI
    | StopDeviceMaintenanceAI
    | FetchNextPortionDevicesAI

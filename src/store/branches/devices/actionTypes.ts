import {Action} from "redux"
import {LoadingStatus} from "../../types"
import {Device, DevicesState} from "./stateTypes"

export enum DevicesAT {
    FETCH_DEVICES = "devices/FETCH_DEVICES",
    FETCH_CURRENT_DEVICE = "devices/FETCH_CURRENT_DEVICE",
    FETCH_ALL_DEVICES = "devices/FETCH_ALL_DEVICES",
    UPDATE_CURRENT_DEVICE = "devices/UPDATE_CURRENT_DEVICE",
    ADD_DEVICE = "devices/ADD_DEVICE",
    SET_CURRENT_DEVICE = "devices/SET_CURRENT_DEVICE",
    SET_ALL_DEVICES = "devices/SET_ALL_DEVICES",
    REMOVE_CURRENT_DEVICE = "devices/REMOVE_CURRENT_DEVICE",
    DEACTIVATE_CURRENT_DEVICE = "devices/DEACTIVATE_CURRENT_DEVICE",
    CHANGE_ACTIVE_CURRENT_DEVICE = "devices/CHANGE_ACTIVE_CURRENT_DEVICE",
    SELECT_DEVICES = "devices/SELECT_DEVICES",
    SELECT_DEVICE = "devices/SELECT_DEVICE",
    SET_DEVICES = "devices/SET_DEVICES",
    CLEAR_DEVICES = "devices/CLEAR_DEVICES",
    CLEAR_SELECT_DEVICES = "devices/CLEAR_SELECT_DEVICES",
    SET_LOADING_STATE = "devices/SET_LOADING_STATE",
    SET_DEVICES_OPERATION_STATUS = "devices/SET_DEVICES_OPERATION_STATUS",
}


export interface SelectDevicesAI extends Action<DevicesAT> {
    type: DevicesAT.SELECT_DEVICES
    payload: string
}

export interface SelectDeviceAI extends Action<DevicesAT> {
    type: DevicesAT.SELECT_DEVICE
    payload: string
}

export interface RemoveDeviceAI extends Action<DevicesAT> {
    type: DevicesAT.REMOVE_CURRENT_DEVICE
    payload: string
}

export interface DeactivateDeviceAI extends Action<DevicesAT> {
    type: DevicesAT.DEACTIVATE_CURRENT_DEVICE
    payload: string
}

export interface ChangeActiveCurDevAI extends Action<DevicesAT> {
    type: DevicesAT.CHANGE_ACTIVE_CURRENT_DEVICE
    payload: boolean
}

export interface FetchDevicesAI extends Action<DevicesAT> {
    type: DevicesAT.FETCH_DEVICES
}

export interface FetchAllDevicesAI extends Action<DevicesAT> {
    type: DevicesAT.FETCH_ALL_DEVICES
}

export interface FetchCurrentDeviceAI extends Action<DevicesAT> {
    type: DevicesAT.FETCH_CURRENT_DEVICE,
    payload: number
}

export interface UpdateCurrentDeviceAI extends Action<DevicesAT> {
    type: DevicesAT.UPDATE_CURRENT_DEVICE,
    payload: Device
}

export interface SetCurrentDeviceAI extends Action<DevicesAT> {
    type: DevicesAT.SET_CURRENT_DEVICE;
    payload: Device
}

export interface SetAllDevicesAI extends Action<DevicesAT> {
    type: DevicesAT.SET_ALL_DEVICES;
    payload: Device[]
}

export interface AddDeviceAI extends Action<DevicesAT> {
    type: DevicesAT.ADD_DEVICE;
    payload: Device
}

export interface SetDevicesAI extends Action<DevicesAT> {
    type: DevicesAT.SET_DEVICES;
    payload: DevicesState["devicesDate"]
}

export interface SetDevicesLoadingStatusAI extends Action<DevicesAT> {
    type: DevicesAT.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export interface SetOperationStatusDevicesAI extends Action<DevicesAT> {
    type: DevicesAT.SET_DEVICES_OPERATION_STATUS;
    payload: LoadingStatus;
}

export interface ClearDevicesAI extends Action<DevicesAT> {
    type: DevicesAT.CLEAR_DEVICES
}

export interface ClearSelectDevicesAI extends Action<DevicesAT> {
    type: DevicesAT.CLEAR_SELECT_DEVICES;
}



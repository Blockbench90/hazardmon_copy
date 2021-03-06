import {LoadingStatus} from "../../status";

export interface Device {
    "id"?: number
    "title"?: string
    "udf_id"?: string
    "serial_number"?: string
    "code"?: string
    "device_type"?: string
    "ip_address"?: string
    "is_trash"?: boolean
    "is_online"?: boolean
    "is_suspended"?: boolean
    "location"?: number
    "is_emulated_as"?: any | []
    "sensors_settings"?: any
    selectedDevice?: number

}

export interface MaintenanceInfo {
    time: number,
    engineer: string,
    state: string
}

export interface FetchNextPortionDevices {
    device_id: number
    limit: number
    offset: number
}

export interface DevicesState {
    devicesDate: Device[]
    current_device: Device
    maintenanceInfo: any
    all_devices: Device[]
    status: LoadingStatus
    status_operation: LoadingStatus
    isSelected: boolean
}

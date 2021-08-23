import {LoadingStatus} from "../../types";

export interface Device {
    "id"?: number
    "title"?: string
    "udf_id"?: string
    "serial_number"?: string
    "code"?: string
    "device_type"?: string
    "is_trash"?: boolean
    "is_online"?: boolean
    "is_suspended"?: boolean
    "location"?: number
    "is_emulated_as"?: any | []
    "sensors_settings"?: any
}

export interface DevicesState {
    devicesDate: {
        count: number | null
        next: number | null
        previous: number | null
        results: Device[]
    }
    current_device: Device
    all_devices: Device[]
    status: LoadingStatus
    status_operation: LoadingStatus
    isSelected: boolean
}
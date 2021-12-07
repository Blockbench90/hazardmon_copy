import {LoadingStatus} from "../../status";

export interface AddWarning {
    sign: string
    sensor_id: number
    value: string
}

export interface Warning {
    id: number
    unit: string
    sign: string
    sensor_id: number
    value: string
    device: number
    name: string
}

export interface SensorNamesSensor {
    id?: string
    label?: string
    name?: string
}

export interface SensorNamesArray {
    id: string
    name: string
    sensors: SensorNamesSensor[]
}

export enum Degrees {
    F = "F",
    C = "C"
}

export interface SensorNames {
    degrees?: Degrees
    networks?: SensorNamesNetworks[]
    sensor_names?: SensorNamesArray[]

}

export interface SensorNamesNetworks {
    name: string
    label: string
}

export interface WarningSensor {
    id: string
    name: string
}

export interface WarningsSensors {
    id: string
    name: string
    sensors: WarningSensor[]
}

interface WsDevice {
    accessCode?: string
    command?: string
    deviceId?: string
    deviceIpAddress?: string
    deviceType?: string
    length?: string
    protocol?: string
    versionInfo?: {
        Btm: string
        CDEP: number
        Gfx: string
        Main: string
    }
}

interface WsMeta {
    Max?: number
    Min?: number
    NumDecimalPoints?: number
    State?: string
    Units?: string | null
}

export interface WsSensor {
    Alarm?: false
    Id?: string
    Meta?: WsMeta
    Name?: string
    Status?: string
    Type?: string
    Value?: number
}

export interface WsGroups {
    Alarm: boolean
    Id: string
    Name: string
    Status: string
    groups: null
    sensors: WsSensor[]
}

export interface WsGroup {
    Alarm?: boolean
    Id?: string
    Meta?: {
        Activity?: number
        Blocks?: number
        Nodes?: number
    }
    Name?: string
    Status?: string
    groups?: WsGroups[]
    sensors?: WsSensor[]
}

export interface WsDataSensors {
    Alarm?: boolean
    Id?: string
    Name?: string
    Status?: string
    device?: WsDevice
    groups?: WsGroup[]
    sensors?: any
    time?: number
}

export interface HistoricalItem {
    timestamp: string
    status: string
    record_id?: string
}
export interface Unit {
    id: number
    name: string
}

export interface SettingsSensor {
    c_value: number
    id: string
    k_value: number
    label: number
    type: string
    unit: string
}

export interface SensorSettings {
    id: string
    name: string
    sensors: SettingsSensor[]
}

export interface HistoricalData {
    count: number
    next: string
    previous: string
    results: HistoricalItem[]
}

export enum FilterStatus {
    ACTIVE = "active",
    ALARMED = "alarmed",
    ALL_NODES = "all_nodes"
}

export interface Maintenance {
    device_id: number,
    event_type: string,
    sensor_id: string,
    current_sensor_id?: string
    sensor_name: string,
    comment?: string,
    maintenance_time: number
};

export enum ConfirmStatus {
    success = "success",
    failed = "failed",
    not_cleared = "clear",
    cancel = "cancel"
}

export interface SensorsState {
    sensorsData: {
        count: number | null
        next: number | null
        previous: number | null
        results: any
    }
    ws_data: WsDataSensors
    warning_sensors: WarningsSensors[]
    filter_status: FilterStatus
    sensorNames: SensorNames
    sensorSettings: SensorSettings[]
    units: Unit[]
    warnings: Warning[]
    current_sensor: any
    historical_data: HistoricalData
    status: LoadingStatus
    status_operation: LoadingStatus
    maintenanceSensorsArray: Maintenance[]
    isMaintenance: boolean
    isSnapshot: boolean
    confirmMaintenance: {
        isShow: boolean,
        device_id?: number,
        event_type?: string
        sensor_id?: string
        sensor_name?: string
        status?: ConfirmStatus
    }
    maintenance_status_operation: LoadingStatus
    isSelected: boolean
}

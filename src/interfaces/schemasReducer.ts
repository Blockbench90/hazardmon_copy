import {Application} from '../containers/Editor/components/Application';

export interface AnchorPoint {
    id: number,
    x_coord: number,
    y_coord: number
}

interface MachineImgThumb {
    large: string
    large_height: number
    large_width: number
    small: string
    small_height: number
    small_width: number
}

export interface MachineSensorPoint {
    id: number
    x_coord: number
    y_coord: number
    side: string
    type_of_machine: number
}

export interface MachineType {
    anchor_points: AnchorPoint[]
    id: number,
    left_side_img: string,
    left_side_img_thumbs: MachineImgThumb,
    right_side_img: string,
    right_side_img_thumbs: MachineImgThumb,
    sensor_points_left: MachineSensorPoint[]
    sensor_points_right: MachineSensorPoint[]
    name: string
}

export interface Machine {
    x_coord: number,
    y_coord: number,
    scale: 1.0,
    type_of_machine: number,
    sensors?: Sensor
    flip: true,
    frontend_id?: number,
    id?: number
}

export interface Sensor {
    id: string,
    name: string,
    device: any,
    liveData?: any
    group_name: string
}

export interface SensorObj {
    sensor: Sensor,
    sensor_point: number,
}

export interface SchemaInMachineDetails {
    id: number,
    name: string,
    location: Location
}

export interface MachineExtended {
    x_coord: number,
    y_coord: number,
    scale: 1.0,
    type_of_machine: MachineType,
    sensors?: SensorObj[]
    flip: boolean,
    frontend_id: number,
    id?: number,
    name?: string,
    schema?: SchemaInMachineDetails
    schema_tab?: TabInList,
    selectedSensorId?: string,
    device_ids?: number[],
    system_state_sensor?: Sensor
}

export interface ConnectorAdditionalPoint {
    x_coord: number,
    y_coord: number
}

export interface Connector {
    id?: number,
    additional_points?: ConnectorAdditionalPoint[],
    end_anchor_point?: number,
    end_m_fe_id?: string,
    end_machine?: number,
    start_anchor_point: number,
    start_m_fe_id: string,
    start_machine: number
}

export interface TabDetails {
    id?: number,
    schema?: number,
    schema_name?: string,
    name?: string,
    machines?: MachineExtended[],
    shapes?: any[],
    text_elements?: any[],
    connectors?: Connector[],
    offset_x?: number,
    offset_y?: number,
    zoom?: number
    location?: number
    height?: number
    width?: number
}

export interface TabInList {
    id: number
    name: string,
    sensors_ids: any[]
}

export interface SchemaDetails {
    comment: string
    created_dt: string
    id: number
    is_published: boolean
    modified_by: number
    name: string
    schema_tabs: TabInList[]
    update_dt: string
    device_ids: number[]
}

export interface SelectedSensorInfo {
    frontendId: string,
    pointId?: number,
    top?: number,
    left?: number,
    deviceName: string
    isStateSensor?: boolean
    pointLabel: string,
    sensor?: any
}

export interface ModifiedBy {
    id: number
    first_name: string
    last_name: string
}

export interface Schema {
    comment: string
    created_dt: string
    id: number
    is_published: boolean
    modified_by: ModifiedBy
    name: string
    update_dt: string
    schema_tabs?: TabInList[]
}

export interface PublishedSchema {
    id: number,
    name: string,
    schema_tabs: TabInList[]
}

export interface Location {
    id: number,
    title: string,
    published_schema?: PublishedSchema
    devices: any
}

export default interface SchemasReducer {
    machineTypesList: MachineType[]
    schemaDetails?: SchemaDetails
    schemaDetailsLoading: boolean
    suggestionsInputValue: string
    sensorSuggestions: []
    selectedSensorInfo?: SelectedSensorInfo
    app: Application
    updateFlag: Date
    schemasList: Schema[]
    tabDetails: TabDetails,
    tabDetailsLoading: boolean,
    machineDetails: MachineExtended
    showPublishModal: boolean
    showModifyPublishedModal: boolean
    showEditorPromt: boolean
    schemaToPublishId: number
    siteToCloneId: number
    schemaToCloneId: number
    onTabSensors: string[]
    locations: Location[],
    locationsLoading: boolean,
    currentLocation: number,
    onSuccessModifyPublishedModal: any,
    machineDetailsLastTimeInAlarm: {}
    machineDetailsNotifications: any[]
    machineDetailsMaintenance: any[]
    schemaNotifications: any[]
    sensorsGraphData: any
    sensorsGraphDataLoading: boolean
    isFullScreen: boolean
    currentUserNotifications: any[]
}

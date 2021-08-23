import {LoadingStatus} from "../../types";

export interface SearchValues {
    limit?: number
    offset?: number
    device?: string
    location?: string
    site?: string
    date_created?: string
    event_type?: string
    search?: string
    ordering?: string
    is_active?: boolean
}

export interface ChangePassword {
    old_password: string,
    new_password1: string,
    new_password2: string
}

export interface HeaderNotification {
    id?: number
    location?: {
        id?: number
        title?: string
    }
    device?: {
        id?: number
        title?: string
        udf_id?: string
        device_type?: number
        is_online?: true
    }
    is_trash?: false
    node_id?: number
    sensor_id?: number
    sensor_name?: string
    event_type?: string
    duration?: string
    value?: any
    content?: string
    is_active?: false
    date_cleared?: any
    date_created?: string
    site?: any
    user?: any
    forebear?: number
}

export interface Notification {
    id?: number
    is_trash?: boolean
    node_id?: any
    sensor_id?: any
    sensor_name?: any
    event_type?: string
    duration?: string
    value?: any
    content?: string
    is_active?: boolean
    date_cleared?: any
    date_created?: string
    site?: any
    user?: any
    location?: {
        id?: number
        title?: string
    }
    forebear?: any
    device?: {
        id?: number
        title?: string
    }
}

export interface User {
    id?: string
    company: string
    email: string
    first_name: string
    is_accounts_management: boolean
    is_manager: boolean
    is_oem: boolean
    is_superuser: boolean
    last_name: string
    locations_roles: any
    visual_dashboard_enabled: boolean
    current_client: {
        id: number
        company: string,
    };
    current_location: {
        id: number,
        title: string
    };
    current_device: {
        id: number,
        title: string
        udf_id: string
        device_type: string
    };
}

export interface INotificationsResponse {
    count: number;
    results: Notification[];
}

export interface WsNotification {
    color?: string
    content?: string
    device?: string
    device_pk?: number
    event_type?: string
    forebear_pk?: number
    full_sensor_id?: string
    is_active?: boolean
    key?: number
    location_pk?: number
    node_id?: string
    notification_time?: string
    pk?: number
    sensor_id?: string
    sensor_name?: string
    timestamp?: number
    url?: string
    value?: any
}

export interface IWsNotify {
    device: number
    location: number
    notifications: WsNotification[]

}

export interface UserState {
    userData: User | undefined
    auth_key: null | string
    status: LoadingStatus
    registerStatus: LoadingStatus
    notifications: INotificationsResponse;
    headerNotifications: INotificationsResponse;
    ws_notify: IWsNotify
    email_notifications: []
    isApply: boolean,
    notificationsFilter: {
        isActive: boolean;
    }
}

import {LoadingStatus} from "../../types";

export interface PageRequest {
    limit: number;
    offset: number;
}


export interface Client {
    id?: number
    number?: number
    email?: string
    full_name?: string
    company?: string
    address?: string
    phone?: string
    is_active?: boolean
    visual_dashboard_enabled?: boolean
    sms_enabled?: boolean
    alternative_name?: boolean
    alternative_email?: boolean
    alternative_phone?: boolean
}

export interface ClientsState {
    clientsData: {
        count: number | null
        next: number | null
        previous: number | null
        results: Client[]
    },
    current_client: Client
    next_client_number: number
    status: LoadingStatus
    status_operation: LoadingStatus
}

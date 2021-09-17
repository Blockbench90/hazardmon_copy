import {LoadingStatus} from "../../status"
import {Device} from "../devices/stateTypes"

export interface AddSite {
    title: string
    address: string
    timezone: string
    full_name: string
    mobile: string
    email: string
}

export interface SiteAccess {
    id: number,
    site: string
    has_access: boolean
    permission: "User" | "Manager" | "Engineer"
}

export interface NewSiteAccess {
    location_id: number
    has_access: boolean
    permission: SiteAccess["permission"]
}

export interface UserData {
    full_name: string
    company: string
    phone: string
    email: string
    location_access: NewSiteAccess[]
    address: string
}
export interface SetMemberShip {
    has_access: boolean
    permission: string
    user: number
    location: number
}

export interface UpdateMemberShip {
    location_id: number
    has_access: boolean
    permission: string
    id: number
}

export interface CurrentLocation {
    id: number
    title: string
    address: string
    full_name: string
    email: string
    mobile: string
    timezone: string
    client?: number
    is_suspended?: boolean
    visual_dashboard_enabled?: boolean
    devices?: any
}

export interface AssignUser {
    id: number
    email: string
    first_name: string
    last_name: string
    is_manager: boolean
    is_oem: boolean
    is_superuser: boolean
    is_accounts_management: boolean
    profile: {
        id: number
        company: string
        phone: string
        address: string
        user: number
    }
    location_membership?: {
        id: number
        has_access: boolean
        permission: "User" | "Engineer" | "Manager"
    }
}

export interface Site {
    id?: number
    title?: string
    address?: string
    full_name?: string
    email?: string
    mobile?: string
    timezone?: string
    client?: number
    is_suspended?: boolean
    visual_dashboard_enabled?: boolean
    devices?: Device[]
}

export interface SitesState {
    sitesData: {
        count: number | null
        next: number | null
        previous: number | null
        results: Site[]
    },
    site_access: {
        count: number | null
        next: number | null
        previous: number | null
        results: Site[]
    },
    assign_users: AssignUser[]
    current_location: CurrentLocation
    status: LoadingStatus
    status_operation: LoadingStatus
    isSelected: boolean
    timezones: string[]
}

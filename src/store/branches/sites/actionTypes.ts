import {Action} from "redux"
import {LoadingStatus} from "../../types"
import {AddSite, CurrentLocation, SetMemberShip, SitesState, UpdateMemberShip, UserData} from "./stateTypes"

export enum SitesAT {
    FETCH_SITES = "sites/FETCH_SITES",
    FETCH_SITE_ACCESS = "sites/FETCH_SITE_ACCESS",
    FETCH_CURRENT_LOCATION = "sites/FETCH_CURRENT_LOCATION",
    SET_CURRENT_LOCATION = "sites/SET_CURRENT_LOCATION",
    REMOVE_CURRENT_LOCATION = "sites/REMOVE_CURRENT_LOCATION",
    DEACTIVATE_CURRENT_LOCATION = "sites/DEACTIVATE_CURRENT_LOCATION",
    CHANGE_ACTIVATE_CURRENT_LOCATION = "sites/CHANGE_ACTIVATE_CURRENT_LOCATION",
    UPDATE_CURRENT_LOCATION = "sites/UPDATE_CURRENT_LOCATION",
    SET_LOCATION_MEMBERSHIP = "sites/SET_LOCATION_MEMBERSHIP",
    UPDATE_LOCATION_MEMBERSHIP = "sites/UPDATE_LOCATION_MEMBERSHIP",
    FETCH_ASSIGN_USERS = "sites/FETCH_ASSIGN_USERS",
    SET_SITES = "sites/SET_SITES",
    ADD_SITE = "sites/ADD_SITE",
    SET_SITE_ACCESS = "sites/SET_SITE_ACCESS",
    SET_ASSIGN_USERS = "sites/SET_ASSIGN_USERS",
    SELECT_SITES = "sites/SELECT_SITES",
    SET_USER = "sites/SET_USER",
    SET_TIMEZONES = "sites/SET_TIMEZONES",
    FETCH_TIMEZONES = "sites/FETCH_TIMEZONES",
    CLEAR_SITES = "sites/CLEAR_SITES",
    CLEAR_ASSIGN_USERS = "sites/CLEAR_ASSIGN_USERS",
    CLEAR_CURRENT_SITE = "sites/CLEAR_CURRENT_SITE",
    SET_LOADING_STATE = "sites/SET_LOADING_STATE",
    CLEAR_SELECT_SITES = "sites/CLEAR_SELECT_SITES",
    SET_SITES_STATUS_OPERATION = "sites/SET_SITES_STATUS_OPERATION",
}


export interface SelectSitesAI extends Action<SitesAT> {
    type: SitesAT.SELECT_SITES
    payload: string
}

export interface FetchSitesAI extends Action<SitesAT> {
    type: SitesAT.FETCH_SITES
}

export interface FetchSiteAccessAI extends Action<SitesAT> {
    type: SitesAT.FETCH_SITE_ACCESS
}

export interface FetchAssignUsersAI extends Action<SitesAT> {
    type: SitesAT.FETCH_ASSIGN_USERS
    payload: string
}

export interface FetchCurrentLocationAI extends Action<SitesAT> {
    type: SitesAT.FETCH_CURRENT_LOCATION
    payload: string
}

export interface SetSitesAI extends Action<SitesAT> {
    type: SitesAT.SET_SITES;
    payload: SitesState["sitesData"]
}

export interface AddSiteAI extends Action<SitesAT> {
    type: SitesAT.ADD_SITE;
    payload: AddSite
}

export interface FetchTimezonesAI extends Action<SitesAT> {
    type: SitesAT.FETCH_TIMEZONES;
}

export interface SetTimezonesAI extends Action<SitesAT> {
    type: SitesAT.SET_TIMEZONES;
    payload: SitesState["timezones"]
}

export interface SetSiteAccessAI extends Action<SitesAT> {
    type: SitesAT.SET_SITE_ACCESS;
    payload: SitesState["site_access"]
}

export interface SetAssignUsersAI extends Action<SitesAT> {
    type: SitesAT.SET_ASSIGN_USERS;
    payload: SitesState["assign_users"]
}

export interface SetCurrentLocationAI extends Action<SitesAT> {
    type: SitesAT.SET_CURRENT_LOCATION;
    payload: SitesState["current_location"]
}

export interface SetUserAI extends Action<SitesAT> {
    type: SitesAT.SET_USER;
    payload: UserData
}

export interface SetSitesLoadingStatusAI extends Action<SitesAT> {
    type: SitesAT.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export interface SetOperationStatusSiteAI extends Action<SitesAT> {
    type: SitesAT.SET_SITES_STATUS_OPERATION;
    payload: LoadingStatus;
}

export interface SetLocationMemberShipAI extends Action<SitesAT> {
    type: SitesAT.SET_LOCATION_MEMBERSHIP;
    payload: SetMemberShip
}

export interface UpdateLocationMemberShipAI extends Action<SitesAT> {
    type: SitesAT.UPDATE_LOCATION_MEMBERSHIP;
    payload: UpdateMemberShip
}

export interface UpdateCurrentLocationAI extends Action<SitesAT> {
    type: SitesAT.UPDATE_CURRENT_LOCATION;
    payload: CurrentLocation
}

export interface RemoveCurrentLocationAI extends Action<SitesAT> {
    type: SitesAT.REMOVE_CURRENT_LOCATION;
    payload: string
}

export interface DeactivateCurrentLocationAI extends Action<SitesAT> {
    type: SitesAT.DEACTIVATE_CURRENT_LOCATION;
    payload: string
}

export interface ChangeActivateCurLocAI extends Action<SitesAT> {
    type: SitesAT.CHANGE_ACTIVATE_CURRENT_LOCATION;
    payload: boolean
}

export interface ClearSitesAI extends Action<SitesAT> {
    type: SitesAT.CLEAR_SITES;
}

export interface ClearSelectSitesAI extends Action<SitesAT> {
    type: SitesAT.CLEAR_SELECT_SITES;
}

export interface ClearCurrentSiteAI extends Action<SitesAT> {
    type: SitesAT.CLEAR_CURRENT_SITE;
}

export interface ClearAssignUsersAI extends Action<SitesAT> {
    type: SitesAT.CLEAR_ASSIGN_USERS;
}

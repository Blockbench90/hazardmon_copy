import {AddSite, CurrentLocation, SetMemberShip, SitesState, UpdateMemberShip, UserData} from "./stateTypes"
import {
    AddSiteAI,
    ChangeActivateCurLocAI,
    ClearAssignUsersAI,
    ClearCurrentSiteAI,
    ClearSelectSitesAI,
    ClearSitesAI,
    DeactivateCurrentLocationAI,
    FetchAssignUsersAI,
    FetchCurrentLocationAI,
    FetchSiteAccessAI,
    FetchSitesAI,
    FetchTimezonesAI,
    RemoveCurrentLocationAI,
    SelectSitesAI,
    SetAssignUsersAI,
    SetCurrentLocationAI,
    SetLocationMemberShipAI,
    SetOperationStatusSiteAI,
    SetSiteAccessAI,
    SetSitesAI,
    SetSitesLoadingStatusAI,
    SetTimezonesAI,
    SetUserAI,
    SitesAT,
    UpdateCurrentLocationAI,
    UpdateLocationMemberShipAI,
} from "./actionTypes"



export const sitesAC = {

    selectClient: (payload: string): SelectSitesAI => ({
        type: SitesAT.SELECT_SITES,
        payload,
    }),

    fetchSites: (): FetchSitesAI => ({
        type: SitesAT.FETCH_SITES,
    }),

    fetchSiteAccess: (): FetchSiteAccessAI => ({
        type: SitesAT.FETCH_SITE_ACCESS,
    }),

    fetchAssignUsers: (payload: string): FetchAssignUsersAI => ({
        type: SitesAT.FETCH_ASSIGN_USERS,
        payload,
    }),

    fetchCurrentLocation: (payload: string): FetchCurrentLocationAI => ({
        type: SitesAT.FETCH_CURRENT_LOCATION,
        payload,
    }),

    setSites: (payload: SitesState["sitesData"]): SetSitesAI => ({
        type: SitesAT.SET_SITES,
        payload,
    }),

    fetchTimezones: (): FetchTimezonesAI => ({
        type: SitesAT.FETCH_TIMEZONES
    }),

    setTimezones: (payload: SitesState["timezones"]): SetTimezonesAI => ({
        type: SitesAT.SET_TIMEZONES,
        payload,
    }),

    setSiteAccess: (payload: SitesState["site_access"]): SetSiteAccessAI => ({
        type: SitesAT.SET_SITE_ACCESS,
        payload,
    }),

    setCurrentLocation: (payload: SitesState["current_location"]): SetCurrentLocationAI => ({
        type: SitesAT.SET_CURRENT_LOCATION,
        payload,
    }),

    setAssignUsers: (payload: SitesState["assign_users"]): SetAssignUsersAI => ({
        type: SitesAT.SET_ASSIGN_USERS,
        payload,
    }),

    setSitesLoadingStatus: (payload: SitesState["status"]): SetSitesLoadingStatusAI => ({
        type: SitesAT.SET_LOADING_STATE,
        payload,
    }),

    setOperationStatusSite: (payload: SitesState["status_operation"]): SetOperationStatusSiteAI => ({
        type: SitesAT.SET_SITES_STATUS_OPERATION,
        payload,
    }),

    setUser: (payload: UserData): SetUserAI => ({
        type: SitesAT.SET_USER,
        payload,
    }),

    addSite: (payload: AddSite): AddSiteAI => ({
        type: SitesAT.ADD_SITE,
        payload,
    }),

    setLocationMemberShip: (payload: SetMemberShip): SetLocationMemberShipAI => ({
        type: SitesAT.SET_LOCATION_MEMBERSHIP,
        payload,
    }),

    updateLocationMemberShip: (payload: UpdateMemberShip): UpdateLocationMemberShipAI => ({
        type: SitesAT.UPDATE_LOCATION_MEMBERSHIP,
        payload,
    }),

    updateCurrentLocation: (payload: CurrentLocation): UpdateCurrentLocationAI => ({
        type: SitesAT.UPDATE_CURRENT_LOCATION,
        payload,
    }),

    removeCurrentLocation: (payload: string): RemoveCurrentLocationAI => ({
        type: SitesAT.REMOVE_CURRENT_LOCATION,
        payload,
    }),

    deactivateCurrentLocation: (payload: string): DeactivateCurrentLocationAI => ({
        type: SitesAT.DEACTIVATE_CURRENT_LOCATION,
        payload,
    }),

    changeActivateCurLoc: (payload: boolean): ChangeActivateCurLocAI => ({
        type: SitesAT.CHANGE_ACTIVATE_CURRENT_LOCATION,
        payload,
    }),

    clearSites: (): ClearSitesAI => ({
        type: SitesAT.CLEAR_SITES,
    }),

    clearSelectSites: (): ClearSelectSitesAI => ({
        type: SitesAT.CLEAR_SELECT_SITES,
    }),

    clearCurrentSite: (): ClearCurrentSiteAI => ({
        type: SitesAT.CLEAR_CURRENT_SITE,
    }),

    clearAssignUsers: (): ClearAssignUsersAI => ({
        type: SitesAT.CLEAR_ASSIGN_USERS,
    }),

}

export type SitesActions =
    | SelectSitesAI
    | FetchSitesAI
    | FetchSiteAccessAI
    | FetchAssignUsersAI
    | FetchCurrentLocationAI
    | SetSitesAI
    | FetchTimezonesAI
    | SetTimezonesAI
    | SetSiteAccessAI
    | SetAssignUsersAI
    | SetCurrentLocationAI
    | SetLocationMemberShipAI
    | UpdateLocationMemberShipAI
    | UpdateCurrentLocationAI
    | RemoveCurrentLocationAI
    | DeactivateCurrentLocationAI
    | ClearSitesAI
    | ClearSelectSitesAI
    | ClearAssignUsersAI
    | ClearCurrentSiteAI
    | ChangeActivateCurLocAI
    | SetSitesLoadingStatusAI
    | SetOperationStatusSiteAI

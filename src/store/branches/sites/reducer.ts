import produce, {Draft} from "immer"
import {LoadingStatus} from "../../status"
import {SitesState} from "./stateTypes"
import {SitesActions} from "./actionCreators"
import {SitesAT} from "./actionTypes"


const initialSitesState: SitesState = {
    sitesData: null,
    site_access: null,
    assign_users: null,
    current_location: null,
    status: LoadingStatus.NEVER,
    status_operation: LoadingStatus.NEVER,
    isSelected: false,
    timezones: null,
}

export const sitesReducer = produce((draft: Draft<SitesState>, action: SitesActions) => {
    switch (action.type) {
        case SitesAT.SET_LOADING_STATE:
            draft.status = action.payload
            break

        case SitesAT.SET_SITES_STATUS_OPERATION:
            draft.status_operation = action.payload
            break

        case SitesAT.SET_SITES:
            draft.sitesData = action.payload
            draft.status = LoadingStatus.LOADED
            break

        case SitesAT.SET_TIMEZONES:
            draft.timezones = action.payload
            break

        case SitesAT.SET_SITE_ACCESS:
            draft.site_access = action.payload
            draft.status = LoadingStatus.LOADED
            break

        case SitesAT.SET_ASSIGN_USERS:
            draft.assign_users = action.payload
            draft.status = LoadingStatus.LOADED
            break

        case SitesAT.SET_CURRENT_LOCATION:
            draft.current_location = action.payload
            draft.status = LoadingStatus.LOADED
            break

        case SitesAT.SELECT_SITES:
            draft.isSelected = true
            break

        case SitesAT.CHANGE_ACTIVATE_CURRENT_LOCATION:
            draft.current_location.is_suspended = action.payload
            break

        case SitesAT.CLEAR_SELECT_SITES:
            draft.isSelected = false
            break

        case SitesAT.CLEAR_SITES:
            draft.sitesData = null
            draft.isSelected = false
            draft.status = LoadingStatus.NEVER
            break

        case SitesAT.CLEAR_ASSIGN_USERS:
            draft.assign_users = null
            draft.current_location = null
            break

        case SitesAT.CLEAR_CURRENT_SITE:
            draft.current_location = null
            break

        default:
            break
    }
}, initialSitesState)

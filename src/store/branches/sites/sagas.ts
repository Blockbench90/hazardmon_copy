import {call, put, takeLatest} from "redux-saga/effects";
import {LoadingStatus} from "../../status";
import {
    AddSiteAI,
    DeactivateCurrentLocationAI,
    FetchAssignUsersAI,
    FetchCurrentLocationAI,
    RemoveCurrentLocationAI,
    SelectSitesAI,
    SetLocationMemberShipAI,
    SetUserAI,
    SitesAT,
    UpdateCurrentLocationAI,
    UpdateLocationMemberShipAI,
} from "./actionTypes";
import {sitesAC} from "./actionCreators";
import {SitesApi} from "../../../services/api/sitesApi";
import history from "../../../helpers/history";
import {WinStorage} from "../../../services/AuthSrorage";
import {userAC} from "../user/actionCreators";
import {clientsAC} from "../clients/actionCreators";


export function* getSelectedSitesRequest({payload}: SelectSitesAI) {
    try {
        yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADING));
        const status = yield call(SitesApi.selectSites, payload);
        yield put(userAC.fetchUserData());
        // const timezones = yield call(SitesApi.getTimezones);
        if (status === 200) {
            const selectSites = yield call(SitesApi.getSites);
            yield put(sitesAC.setSites(selectSites));
            // yield put(sitesAC.setTimezones(timezones));
            yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADED));
            yield put(userAC.fetchHeaderNotificationCount());
            history.push("/sites");
            yield put(sitesAC.setOperationStatusSite(LoadingStatus.SELECT_SITE_SUCCESS));
        } else {
            yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.ERROR));
            yield put(clientsAC.setStatusOperationClients(LoadingStatus.SELECT_CLIENT_ERROR));
        }
    } catch (error) {
        yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchSitesRequest() {
    try {
        yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADING));
        const data = yield call(SitesApi.getSites);
        // const timezones = yield call(SitesApi.getTimezones);
        yield put(sitesAC.setSites(data));
        // yield put(sitesAC.setTimezones(timezones));
    } catch (error) {
        yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchSiteAccessRequest() {
    try {
        yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADING));
        const data = yield call(SitesApi.getSiteAccess);
        yield put(sitesAC.setSiteAccess(data));
    } catch (error) {
        yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchAssignUsersRequest({payload}: FetchAssignUsersAI) {
    try {
        yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADING));
        const clientId = WinStorage.getClient();
        const data = yield call(SitesApi.getAssignUsers, clientId, payload);
        const timezones = yield call(SitesApi.getTimezones);
        yield put(sitesAC.setAssignUsers(data.results));
        yield put(sitesAC.setTimezones(timezones));
    } catch (error) {
        yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchCurrentLocationRequest({payload}: FetchCurrentLocationAI) {
    try {
        yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADING));
        const data = yield call(SitesApi.getCurrentLocation, payload);
        if (data) {
            yield put(sitesAC.setCurrentLocation(data));
        }
    } catch (error) {
        yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* setUserRequest({payload}: SetUserAI) {
    try {
        yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADING));
        const status = yield call(SitesApi.setUser, payload);
        if (status === 201) {
            yield put(sitesAC.setOperationStatusSite(LoadingStatus.ADD_USER_SUCCESS));
            yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADED));
            history.push("/sites");
        } else {
            yield put(sitesAC.setOperationStatusSite(LoadingStatus.ADD_USER_ERROR));
            yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADED));
        }
    } catch (error) {
        yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* setMemberShipRequest({payload}: SetLocationMemberShipAI) {
    try {
        yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADING));
        const status = yield call(SitesApi.setMemberShip, payload);
        if (status === 201) {
            const id = payload.location.toString();
            const clientId = WinStorage.getClient();
            const data = yield call(SitesApi.getAssignUsers, clientId, id);
            // const data = yield call(SitesApi.getAssignUsers, id)
            yield put(sitesAC.setAssignUsers(data.results));
            yield put(sitesAC.setOperationStatusSite(LoadingStatus.ASSIGN_USER_SUCCESS));
            yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADED));
        } else {
            yield put(sitesAC.setOperationStatusSite(LoadingStatus.ASSIGN_USER_ERROR));
            yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADED));
        }
    } catch (error) {
        yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateMemberShipRequest({payload}: UpdateLocationMemberShipAI) {
    try {
        yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADING));
        const status = yield call(SitesApi.updateMemberShip, payload);
        if (status === 200) {
            const id = payload.location_id.toString();
            const clientId = WinStorage.getClient();
            const data = yield call(SitesApi.getAssignUsers, clientId, id);
            yield put(sitesAC.setAssignUsers(data.results));
            yield put(sitesAC.setOperationStatusSite(LoadingStatus.ASSIGN_USER_SUCCESS));
            yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADED));
        } else {
            yield put(sitesAC.setOperationStatusSite(LoadingStatus.ASSIGN_USER_ERROR));
            yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADED));
        }
    } catch (error) {
        yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* addSiteRequest({payload}: AddSiteAI) {
    try {
        yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADING));
        const data = yield call(SitesApi.addSite, payload);
        if (data.id) {
            yield put(sitesAC.setOperationStatusSite(LoadingStatus.ADD_SITE_SUCCESS));
            yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADED));
            history.push(`/sites/edit/${data.id}`);
        } else {
            yield put(sitesAC.setOperationStatusSite(LoadingStatus.ADD_SITE_ERROR));
            yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADED));
        }
    } catch (error) {
        yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.ADD_SITE_ERROR));
    }
}

export function* fetchTimezonesRequest() {
    try {
        yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADING));
        const timezones = yield call(SitesApi.getTimezones);
        if (timezones) {
            yield put(sitesAC.setTimezones(timezones));
            yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADED));
        }
    } catch (error) {
        yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateCurrentLocationRequest({payload}: UpdateCurrentLocationAI) {
    try {
        yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADING));
        const status = yield call(SitesApi.updateLocation, payload);
        if (status === 200) {
            yield put(sitesAC.setOperationStatusSite(LoadingStatus.EDIT_SITE_SUCCESS));
            yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADED));
            history.push("/sites");
        } else {
            yield put(sitesAC.setOperationStatusSite(LoadingStatus.EDIT_SITE_ERROR));
            yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADED));
        }
    } catch (error) {
        yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* removeCurrentLocationRequest({payload}: RemoveCurrentLocationAI) {
    try {
        yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADING));
        const status = yield call(SitesApi.removeLocation, payload);
        if (status === 204) {
            yield put(sitesAC.setOperationStatusSite(LoadingStatus.REMOVE_SITE_SUCCESS));
            yield put(sitesAC.clearCurrentSite());
            yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADED));
            history.push("/sites");
        } else {
            yield put(sitesAC.setOperationStatusSite(LoadingStatus.REMOVE_SITE_ERROR));
            yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADED));
        }
    } catch (error) {
        yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* deactivateCurrentLocationRequest({payload}: DeactivateCurrentLocationAI) {
    try {
        yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADING));
        const status = yield call(SitesApi.deactivateLocation, payload);
        if (status === 200) {
            yield put(sitesAC.setOperationStatusSite(LoadingStatus.ACTIVATION_SITE_SUCCESS));
            yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADED));
        } else {
            yield put(sitesAC.setOperationStatusSite(LoadingStatus.ACTIVATION_SITE_ERROR));
            yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.LOADED));
        }
    } catch (error) {
        yield put(sitesAC.setSitesLoadingStatus(LoadingStatus.ERROR));
    }
}


export function* sitesSaga() {
    yield takeLatest(SitesAT.FETCH_SITES, fetchSitesRequest);
    yield takeLatest(SitesAT.FETCH_SITE_ACCESS, fetchSiteAccessRequest);
    yield takeLatest(SitesAT.FETCH_ASSIGN_USERS, fetchAssignUsersRequest);
    yield takeLatest(SitesAT.FETCH_CURRENT_LOCATION, fetchCurrentLocationRequest);
    yield takeLatest(SitesAT.SET_LOCATION_MEMBERSHIP, setMemberShipRequest);
    yield takeLatest(SitesAT.UPDATE_LOCATION_MEMBERSHIP, updateMemberShipRequest);
    yield takeLatest(SitesAT.UPDATE_CURRENT_LOCATION, updateCurrentLocationRequest);
    yield takeLatest(SitesAT.REMOVE_CURRENT_LOCATION, removeCurrentLocationRequest);
    yield takeLatest(SitesAT.DEACTIVATE_CURRENT_LOCATION, deactivateCurrentLocationRequest);
    yield takeLatest(SitesAT.FETCH_TIMEZONES, fetchTimezonesRequest);
    yield takeLatest(SitesAT.SET_USER, setUserRequest);
    yield takeLatest(SitesAT.ADD_SITE, addSiteRequest);
    yield takeLatest(SitesAT.SELECT_SITES, getSelectedSitesRequest);
}

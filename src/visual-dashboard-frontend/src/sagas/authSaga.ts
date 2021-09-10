import {all, put, takeLatest} from 'redux-saga/effects';
import * as authConstants from '../constants/actions/authConstants';
import * as authService from '../services/authService';

export function* getCurrentUser() {
    try {
        const response = yield authService.getCurrentUser();
        if (response.data.visual_dashboard_enabled) {
            yield put({type: authConstants.GET_CURRENT_USER_SUCCESS, payload: response.data});
        } else {
            window.location.href = '/';
        }
    } catch (error) {
        if (error.response && error.response.status === 403) {
            window.location.href = '/';
        } else {
            yield put({type: authConstants.GET_CURRENT_USER_ERROR, error});
        }
    }
}

export function* watchGetCurrentUser() {
    yield takeLatest(authConstants.GET_CURRENT_USER, getCurrentUser);
}

export function* getLayoutSettings() {
    try {
        const response = yield authService.getLayoutSettings();
        const flatPagesResponse = yield authService.getFlatPages();
        yield put({type: authConstants.GET_LAYOUT_SETTINGS_SUCCESS, payload: {...response.data, flatPages: flatPagesResponse.data}});
        const newStyles = document.createElement('style');
        newStyles.type = 'text/css';
        newStyles.appendChild(document.createTextNode(response.data.css));
        document.head.appendChild(newStyles);
    } catch (error) {
        yield put({type: authConstants.GET_LAYOUT_SETTINGS_ERROR, error});
    }
}

export function* watchGetLayoutSettings() {
    yield takeLatest(authConstants.GET_LAYOUT_SETTINGS, getLayoutSettings);
}

export function* logout() {
    try {
        yield authService.logout();
        window.location.href = '/';
    } catch (error) {
        console.log(error)
    }
}

export function* watchLogout() {
    yield takeLatest(authConstants.LOGOUT, logout);
}

// ---------------------------------------
export default function* authSaga() {
    yield all([
        watchGetCurrentUser(),
        watchGetLayoutSettings(),
        watchLogout()
    ])
}
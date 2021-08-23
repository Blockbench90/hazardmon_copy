import {call, put, takeLatest} from "redux-saga/effects";
import {DevicesApi} from "../../../services/api/devicesApi";
import {LoadingStatus} from "../../types";
import {devicesAC} from "./actionCreators";
import {
    AddDeviceAI,
    DevicesAT,
    FetchCurrentDeviceAI,
    RemoveDeviceAI, SelectDeviceAI,
    SelectDevicesAI,
    UpdateCurrentDeviceAI,
} from "./actionTypes";
import history from "../../../helpers/history";
import {sitesAC} from "../sites/actionCreators";
import {userAC} from "../user/actionCreators";

export function* getSelectedDevicesRequest({payload}: SelectDevicesAI) {
    try {
        yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.LOADING));
        const status = yield call(DevicesApi.selectDevices, payload);
        yield put(userAC.fetchUserData());
        if (status === 200) {
            const selectDevices = yield call(DevicesApi.getDevices);
            yield put(devicesAC.setDevices(selectDevices));
            yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.LOADED));
            history.push("/devices");
            yield put(devicesAC.setOperationDevices(LoadingStatus.SELECT_DEVICE_SUCCESS));
        } else {
            yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.ERROR));
            yield put(sitesAC.setOperationStatusSite(LoadingStatus.SELECT_SITE_ERROR));
        }
    } catch (error) {
        yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* getSelectedDeviceRequest({payload}: SelectDeviceAI) {
    try {
        yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.LOADING));
        const status = yield call(DevicesApi.selectDevice, payload);
        yield put(userAC.fetchUserData());
        if (status === 200) {
            // change for websocket
            // const selectDevices = yield call(DevicesApi.getDevices);
            // yield put(setDevicesAC(selectDevices));
            yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.LOADED));
            history.push("/dashboard");
            yield put(devicesAC.setOperationDevices(LoadingStatus.SELECT_DEVICE_SUCCESS));
        } else {
            yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.ERROR));
            yield put(sitesAC.setOperationStatusSite(LoadingStatus.SELECT_SITE_ERROR));
        }
    } catch (error) {
        yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchCurrentDeviceRequest({payload}: FetchCurrentDeviceAI) {
    try {
        yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.LOADING));
        const data = yield call(DevicesApi.getCurrentDevice, payload);
        if (data) {
            yield put(devicesAC.setCurrentDevice(data));
            yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.LOADED));
        } else {
            yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.ERROR));
        }
    } catch (error) {
        yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateDeviceRequest({payload}: UpdateCurrentDeviceAI) {
    try {
        yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.LOADING));
        const data = yield call(DevicesApi.updateCurrentDevice, payload);
        if (data.status === 200) {
            yield put(devicesAC.setOperationDevices(LoadingStatus.UPDATE_DEVICE_SUCCESS));
            yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.LOADED));
            history.push("/devices");
        } else {
            yield put(devicesAC.setOperationDevices(LoadingStatus.UPDATE_DEVICE_ERROR));
            yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.LOADED));
        }
    } catch (error) {
        yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* addDeviceRequest({payload}: AddDeviceAI) {
    try {
        yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.LOADING));
        const status = yield call(DevicesApi.addDevice, payload);
        if (status === 201) {
            yield put(devicesAC.setOperationDevices(LoadingStatus.ADD_DEVICE_SUCCESS));
            yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.LOADED));
            history.push("/devices");
        } else {
            yield put(devicesAC.setOperationDevices(LoadingStatus.ADD_DEVICE_ERROR));
            yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.LOADED));
        }
    } catch (error) {
        yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* removeDeviceRequest({payload}: RemoveDeviceAI) {
    try {
        yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.LOADING));
        const status = yield call(DevicesApi.removeDevice, payload);
        if (status === 204) {
            yield put(devicesAC.setOperationDevices(LoadingStatus.REMOVE_DEVICE_SUCCESS));
            yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.LOADED));
            history.push("/devices");
        } else {
            yield put(devicesAC.setOperationDevices(LoadingStatus.REMOVE_DEVICE_ERROR));
            yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.LOADED));
        }
    } catch (error) {
        yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* deactivateDeviceRequest({payload}: RemoveDeviceAI) {
    try {
        yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.LOADING));
        const status = yield call(DevicesApi.deactivateDevice, payload);
        if (status === 200) {
            yield put(devicesAC.changeActiveCurDev());
            yield put(devicesAC.setOperationDevices(LoadingStatus.ACTIVATION_DEVICE_SUCCESS));
            yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.LOADED));
        } else {
            yield put(devicesAC.setOperationDevices(LoadingStatus.ACTIVATION_DEVICE_ERROR));
            yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.LOADED));
        }
    } catch (error) {
        yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.ERROR));
    }
}


export function* fetchDevicesRequest() {
    try {
        yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.LOADING));
        const data = yield call(DevicesApi.getDevices);
        yield put(devicesAC.setDevices(data));
    } catch (error) {
        yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchAllDevicesRequest() {
    try {
        yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.LOADING));
        const data = yield call(DevicesApi.getAllDevices);
        yield put(devicesAC.setAllDevices(data.results));
    } catch (error) {
        yield put(devicesAC.setDevicesLoadingStatus(LoadingStatus.ERROR));
    }
}


export function* devicesSaga() {
    yield takeLatest(DevicesAT.FETCH_DEVICES, fetchDevicesRequest);
    yield takeLatest(DevicesAT.FETCH_CURRENT_DEVICE, fetchCurrentDeviceRequest);
    yield takeLatest(DevicesAT.FETCH_ALL_DEVICES, fetchAllDevicesRequest);
    yield takeLatest(DevicesAT.UPDATE_CURRENT_DEVICE, updateDeviceRequest);
    yield takeLatest(DevicesAT.ADD_DEVICE, addDeviceRequest);
    yield takeLatest(DevicesAT.REMOVE_CURRENT_DEVICE, removeDeviceRequest);
    yield takeLatest(DevicesAT.DEACTIVATE_CURRENT_DEVICE, deactivateDeviceRequest);
    yield takeLatest(DevicesAT.SELECT_DEVICES, getSelectedDevicesRequest);
    yield takeLatest(DevicesAT.SELECT_DEVICE, getSelectedDeviceRequest);
}

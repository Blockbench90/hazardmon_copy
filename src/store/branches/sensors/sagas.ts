import {call, put, takeLatest} from "redux-saga/effects";
import {LoadingStatus} from "../../status";
import {sensorsAC} from "./actionCreators";
import {
    AddSensorNamesAI,
    AddSensorSettingsAI,
    AddWarningAI,
    ChangeEventTypeMaintenanceAI,
    FetchHistoricalGraphsAI,
    FetchSensorNamesAI,
    FetchSensorsAI,
    FetchSensorSettingsAI,
    FetchWarningsAI,
    FetchWsDataSensorsAI,
    SensorsAT,
    SetMaintenanceAI,
    StopSensorMaintenanceAI,
    UpdateArrangementAI,
} from "./actionTypes";
import {SensorsApi} from "../../../services/api/sensorsApi";
import history from "../../../helpers/history";
import {devicesAC} from "../devices/actionCreators";

export function* fetchWarningsSensorsRequest({payload}: FetchSensorsAI) {
    try {
        yield put(sensorsAC.setSensorsLoadingStatus(LoadingStatus.LOADING));
        const data = yield call(SensorsApi.getSelectedSensorsByDevice, payload);
        yield put(sensorsAC.setWarningSensors(data));
    } catch (error) {
        yield put(sensorsAC.setSensorsLoadingStatus(LoadingStatus.ERROR));
        yield put(sensorsAC.setSensorsStatusOperation(LoadingStatus.FETCH_SENSORS_ERROR));
    }
}

export function* fetchWarningsRequest({payload}: FetchWarningsAI) {
    try {
        yield put(sensorsAC.setSensorsLoadingStatus(LoadingStatus.LOADING));
        const data = yield call(SensorsApi.getWarnings, payload);
        yield put(sensorsAC.setWarningsSign(data.results));
        yield put(sensorsAC.setSensorsStatusOperation(LoadingStatus.FETCH_SENSORS_SUCCESS));
    } catch (error) {
        yield put(sensorsAC.setSensorsLoadingStatus(LoadingStatus.ERROR));
        yield put(sensorsAC.setSensorsStatusOperation(LoadingStatus.FETCH_SENSORS_ERROR));
        history.push("/dashboard");
    }
}

export function* addWarningRequest({payload}: AddWarningAI) {
    try {
        yield put(sensorsAC.setSensorsLoadingStatus(LoadingStatus.LOADING));
        const data = yield call(SensorsApi.addWarning, payload);
        if (data.status === 201) {
            yield put(sensorsAC.setSensorsStatusOperation(LoadingStatus.FETCH_SENSORS_SUCCESS));
            yield put(sensorsAC.setSensorsLoadingStatus(LoadingStatus.LOADED));
            history.push("/dashboard");
        }
    } catch (error) {
        yield put(sensorsAC.setSensorsStatusOperation(LoadingStatus.FETCH_SENSORS_ERROR));
        yield put(sensorsAC.setSensorsLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchWsDataSensorsRequest({payload}: FetchWsDataSensorsAI) {
    try {
        if (payload) {
            yield put(sensorsAC.setWsSensorsData(payload));
        }
    } catch (error) {
        yield put(sensorsAC.setSensorsLoadingStatus(LoadingStatus.ERROR));
    }
}


export function* fetchSensorNamesRequest({payload}: FetchSensorNamesAI) {
    try {
        yield put(sensorsAC.setSensorsLoadingStatus(LoadingStatus.LOADING));
        const data = yield call(SensorsApi.getSensorNames, payload);
        if (data.status === 200) {
            yield put(sensorsAC.setSensorNames(data?.data));
            yield put(sensorsAC.setSensorsStatusOperation(LoadingStatus.FETCH_SENSORS_NAMES_SUCCESS));
        } else {
            history.push("/dashboard");
            yield put(sensorsAC.setSensorsStatusOperation(LoadingStatus.FETCH_SENSORS_NAMES_ERROR));
        }
    } catch (error) {
        yield put(sensorsAC.setSensorsLoadingStatus(LoadingStatus.ERROR));
        yield put(sensorsAC.setSensorsStatusOperation(LoadingStatus.FETCH_SENSORS_NAMES_ERROR));
        history.push("/dashboard");
    }
}

export function* fetchSensorSettingsRequest({payload}: FetchSensorSettingsAI) {
    try {
        yield put(sensorsAC.setSensorsLoadingStatus(LoadingStatus.LOADING));
        const data = yield call(SensorsApi.getSensorSettings, payload);
        const res = yield call(SensorsApi.getSensorUnits);
        if (data) {
            yield put(sensorsAC.setSensorSettings(data?.sensor_types));
            yield put(sensorsAC.setSensorUnits(res.results));
            yield put(sensorsAC.setSensorsStatusOperation(LoadingStatus.FETCH_SENSORS_NAMES_SUCCESS));
        } else {
            history.push("/dashboard");
            yield put(sensorsAC.setSensorsStatusOperation(LoadingStatus.FETCH_SENSORS_NAMES_ERROR));
        }
    } catch (error) {
        yield put(sensorsAC.setSensorsLoadingStatus(LoadingStatus.ERROR));
        yield put(sensorsAC.setSensorsStatusOperation(LoadingStatus.FETCH_SENSORS_NAMES_ERROR));
        history.push("/dashboard");
    }
}

export function* addSensorNamesRequest({payload}: AddSensorNamesAI) {
    try {
        yield put(sensorsAC.setSensorsLoadingStatus(LoadingStatus.LOADING));
        const data = yield call(SensorsApi.addSensorNames, payload);
        if (data.status === 201) {
            yield put(sensorsAC.setSensorsStatusOperation(LoadingStatus.FETCH_SENSORS_NAMES_SUCCESS));
            history.push("/dashboard");
        } else {
            yield put(sensorsAC.setSensorsStatusOperation(LoadingStatus.FETCH_SENSORS_NAMES_ERROR));
            yield put(sensorsAC.setSensorsLoadingStatus(LoadingStatus.ERROR));
        }
    } catch (error) {
        yield put(sensorsAC.setSensorsLoadingStatus(LoadingStatus.ERROR));
        yield put(sensorsAC.setSensorsStatusOperation(LoadingStatus.FETCH_SENSORS_NAMES_ERROR));
        history.push("/dashboard");
    }
}

export function* addSensorSettingsRequest({payload}: AddSensorSettingsAI) {
    try {
        yield put(sensorsAC.setSensorsLoadingStatus(LoadingStatus.LOADING));
        const data = yield call(SensorsApi.addSensorSettings, payload);
        if (data.status === 201) {
            yield put(sensorsAC.setSensorsStatusOperation(LoadingStatus.FETCH_SENSORS_NAMES_SUCCESS));
            history.push("/dashboard");
        } else {
            yield put(sensorsAC.setSensorsStatusOperation(LoadingStatus.FETCH_SENSORS_NAMES_ERROR));
            yield put(sensorsAC.setSensorsLoadingStatus(LoadingStatus.ERROR));
        }
    } catch (error) {
        yield put(sensorsAC.setSensorsLoadingStatus(LoadingStatus.ERROR));
        yield put(sensorsAC.setSensorsStatusOperation(LoadingStatus.FETCH_SENSORS_NAMES_ERROR));
        history.push("/dashboard");
    }
}

export function* fetchHistoricalGraphsRequest({payload}: FetchHistoricalGraphsAI) {
    try {
        yield put(sensorsAC.setSensorsLoadingStatus(LoadingStatus.LOADING));
        const data = yield call(SensorsApi.fetchHistoricalGraphs, payload);
        if (data.status === 200) {
            yield put(sensorsAC.setHistoricalGraphsData(data?.data));
            yield put(sensorsAC.setSensorsStatusOperation(LoadingStatus.FETCH_SENSORS_NAMES_SUCCESS));
        } else {
            yield put(sensorsAC.setSensorsStatusOperation(LoadingStatus.FETCH_SENSORS_NAMES_ERROR));
        }
    } catch (error) {
        yield put(sensorsAC.setSensorsLoadingStatus(LoadingStatus.ERROR));
        yield put(sensorsAC.setSensorsStatusOperation(LoadingStatus.FETCH_SENSORS_NAMES_ERROR));
        history.push("/dashboard");
    }
}

export function* setMaintenanceRequest({payload}: SetMaintenanceAI) {
    try {
        const data = yield call(SensorsApi.setMaintenance, payload);
        if (data.status !== 200) {
            yield put(sensorsAC.setSensorsStatusOperation(LoadingStatus.MAINTENANCE_SENSORS_ERROR));
        }
    } catch {
        yield put(sensorsAC.setSensorsLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* setMaintenanceExpectOffRequest({payload}: ChangeEventTypeMaintenanceAI) {
    try {
        const data = yield call(SensorsApi.setMaintenance, payload);
        if (data.status !== 200) {
            yield put(sensorsAC.setSensorsStatusOperation(LoadingStatus.MAINTENANCE_SENSORS_ERROR));
        }
    } catch {
        yield put(sensorsAC.setSensorsLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* stopSensorMaintenanceRequest({payload}: StopSensorMaintenanceAI) {
    try {
        const sensor_id = payload.sensor_id.split(".");
        yield put(devicesAC.stopDeviceMaintenance(sensor_id[sensor_id.length - 1]));
        // const payloadRequest = {...payload, sensor_id}

        // const data = yield call(SensorsApi.setMaintenance, {...payload, sensor_id: sensor_id[sensor_id.length - 1]});
        const data = yield call(SensorsApi.setMaintenance, payload);
        if (data.status !== 200) {
            yield put(sensorsAC.setSensorsStatusOperation(LoadingStatus.MAINTENANCE_SENSORS_ERROR));
        }
    } catch {
        yield put(sensorsAC.setSensorsLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateArrangementRequest({payload}: UpdateArrangementAI) {
    try {
        yield put(sensorsAC.setSensorsLoadingStatus(LoadingStatus.LOADING));
        const nodes = yield call(SensorsApi.getF500Nodes, payload.device_id);
        let node;
        if (nodes) {
            nodes.forEach((item: any) => {
                item.sensors.forEach((sensor: any) => {
                    if (sensor.id === Number(payload.sensor)) {
                        node = item.number;
                    }
                });
            });
        }

        const data = yield call(SensorsApi.updateArrangement, {
            action: payload.action,
            graph_type: "live",
            node: node,
            sensor: payload.sensor,
            device_id: payload.device_id,
        });
        if (data.status === 200) {
            history.push(`/graphs/${payload.sensor}`);
        } else {
            yield put(sensorsAC.setSensorsLoadingStatus(LoadingStatus.ERROR));
        }
    } catch {
        yield put(sensorsAC.setSensorsLoadingStatus(LoadingStatus.ERROR));
    }
}


export function* sensorsSaga() {
    yield takeLatest(SensorsAT.FETCH_WARNINGS_SENSORS, fetchWarningsSensorsRequest);
    yield takeLatest(SensorsAT.ADD_WARNING, addWarningRequest);
    yield takeLatest(SensorsAT.FETCH_WARNINGS, fetchWarningsRequest);
    yield takeLatest(SensorsAT.FETCH_SENSOR_NAMES, fetchSensorNamesRequest);
    yield takeLatest(SensorsAT.FETCH_SENSOR_SETTINGS, fetchSensorSettingsRequest);
    yield takeLatest(SensorsAT.ADD_SENSOR_NAMES, addSensorNamesRequest);
    yield takeLatest(SensorsAT.ADD_SENSOR_SETTINGS, addSensorSettingsRequest);
    yield takeLatest(SensorsAT.FETCH_WS_DATA_SENSORS, fetchWsDataSensorsRequest);
    yield takeLatest(SensorsAT.FETCH_HISTORICAL_GRAPHS_SENSORS, fetchHistoricalGraphsRequest);
    yield takeLatest(SensorsAT.SET_MAINTENANCE, setMaintenanceRequest);
    yield takeLatest(SensorsAT.CHANGE_EVENT_TYPE_ALARM_OFF, setMaintenanceExpectOffRequest);
    yield takeLatest(SensorsAT.STOP_SENSOR_MAINTENANCE, stopSensorMaintenanceRequest);
    yield takeLatest(SensorsAT.UPDATE_ARRANGEMENT, updateArrangementRequest);
}

import {call, put, takeLatest} from "redux-saga/effects";
import {LoadingStatus} from "../../types";
import {AnalyticsAT, FetchAnalyticsAI} from "./actionTypes";
import {AnalyticsApi} from "../../../services/api/analyticsApi";
import { analyticsAC } from "./actionCreators";

export function* fetchAnalyticsRequest({payload}: FetchAnalyticsAI) {
    try {
        yield put(analyticsAC.setAnalyticsLoadingStatus(LoadingStatus.LOADING));
        const sensor = yield call(AnalyticsApi.getAlarmSensor, payload);
        const time = yield call(AnalyticsApi.getAlarmTime, payload);
        const type = yield call(AnalyticsApi.getAlarmType, payload);
        if (sensor.status === 200) {
            yield put(analyticsAC.setAnalyticsSensor(sensor.data));
        } else {
            yield put(analyticsAC.setAnalyticsLoadingStatus(LoadingStatus.ERROR));
            yield put(analyticsAC.setStatusOperationAnalytics(LoadingStatus.FETCH_ANALYTICS_ERROR));
        }
        if (time.status === 200) {
            yield put(analyticsAC.setAnalyticsTime(time.data));
        } else {
            yield put(analyticsAC.setAnalyticsLoadingStatus(LoadingStatus.ERROR));
            yield put(analyticsAC.setStatusOperationAnalytics(LoadingStatus.FETCH_ANALYTICS_ERROR));
        }
        if (type.status === 200) {
            yield put(analyticsAC.setAnalyticsType(type.data));
        } else {
            yield put(analyticsAC.setAnalyticsLoadingStatus(LoadingStatus.ERROR));
            yield put(analyticsAC.setStatusOperationAnalytics(LoadingStatus.FETCH_ANALYTICS_ERROR));
        }
        yield put(analyticsAC.setAnalyticsLoadingStatus(LoadingStatus.LOADED));
    } catch (error) {
        yield put(analyticsAC.setStatusOperationAnalytics(LoadingStatus.FETCH_ANALYTICS_ERROR));
        yield put(analyticsAC.setAnalyticsLoadingStatus(LoadingStatus.ERROR));
    }
}


export function* analyticsSaga() {
    yield takeLatest(AnalyticsAT.FETCH_ANALYTICS, fetchAnalyticsRequest);
}

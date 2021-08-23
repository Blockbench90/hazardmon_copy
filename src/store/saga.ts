import {all} from "redux-saga/effects";
import {clientsSaga} from "./branches/clients/sagas";
import {userSaga} from "./branches/user/sagas";
import {devicesSaga} from "./branches/devices/sagas";
import {sitesSaga} from "./branches/sites/sagas";
import {sensorsSaga} from "./branches/sensors/sagas";
import {graphsSaga} from "./branches/graphs/sagas";
import {analyticsSaga} from "./branches/analytics/sagas";

export default function* rootSaga() {
    yield all([
        userSaga(),
        clientsSaga(),
        sitesSaga(),
        devicesSaga(),
        sensorsSaga(),
        graphsSaga(),
        analyticsSaga()
    ]);
}

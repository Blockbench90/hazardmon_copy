import { all } from 'redux-saga/effects';

import authSaga from './authSaga';
import schemaSaga from './schemaSagas';

export default function* rootSaga() {
    yield all([
        authSaga(),
        schemaSaga()
    ])
}
import {call, put, takeLatest} from "redux-saga/effects";
import {LoadingStatus} from "../../types";
import {FetchCustomGraphsDataAI, FetchGraphsDataAI, GraphsAT} from "./actionTypes"
import {GraphsApi} from "../../../services/api/graphsApi";
import {graphsAC} from "./actionCreators";


export function* fetchGraphsDataRequest({payload}: FetchGraphsDataAI)  {
    try {
        yield put(graphsAC.setGraphsLoadingStatus(LoadingStatus.LOADING))
        const data = yield call(GraphsApi.getGraphs, payload)
        yield put(graphsAC.setGraphsData(data))
    } catch (error) {
        yield put(graphsAC.setGraphsLoadingStatus(LoadingStatus.ERROR))
        yield put(graphsAC.setGraphsStatusOperation(LoadingStatus.FETCH_GRAPHS_ERROR))
    }
}



export function* fetchCustomGraphsDataRequest({payload}: FetchCustomGraphsDataAI)  {
    try {
        yield put(graphsAC.setGraphsLoadingStatus(LoadingStatus.LOADING))
        const data = yield call(GraphsApi.getCustomGraphs, payload)
        yield put(graphsAC.setGraphsData(data))
    } catch (error) {
        yield put(graphsAC.setGraphsLoadingStatus(LoadingStatus.ERROR))
        yield put(graphsAC.setGraphsStatusOperation(LoadingStatus.FETCH_GRAPHS_ERROR))
    }
}


export function* graphsSaga() {
    yield takeLatest(GraphsAT.FETCH_GRAPHS_DATA, fetchGraphsDataRequest)
    yield takeLatest(GraphsAT.FETCH_CUSTOM_GRAPHS_DATA, fetchCustomGraphsDataRequest)
}
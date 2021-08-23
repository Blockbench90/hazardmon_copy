import {call, put, takeLatest} from "redux-saga/effects";
import {LoadingStatus} from "../../types";
import {
    AddClientAI,
    ClientsAT,
    FetchClientsAI,
    FetchCurrentClientAI,
    RemoveClientAI,
    UpdateCurrentClientAI,
} from "./actionTypes";
import {ClientsApi} from "../../../services/api/clientsApi";
import history from "../../../helpers/history";
import { clientsAC } from "./actionCreators";

export function* fetchClientsRequest({payload}: FetchClientsAI) {
    try {
        yield put(clientsAC.setClientsLoadingStatus(LoadingStatus.LOADING))
        const data = yield call(ClientsApi.getClients, payload)
        yield put(clientsAC.setClients(data))
    } catch (error) {
        yield put(clientsAC.setClientsLoadingStatus(LoadingStatus.ERROR))
    }
}

export function* fetchAccountNumberRequest() {
    try {
        yield put(clientsAC.setClientsLoadingStatus(LoadingStatus.LOADING))
        const data = yield call(ClientsApi.getAccountNumber)
        yield put(clientsAC.setAccountNumber(data.next_client_number))
    } catch (error) {
        yield put(clientsAC.setClientsLoadingStatus(LoadingStatus.ERROR))
    }
}

export function* fetchCurrentClientRequest({payload}: FetchCurrentClientAI) {
    try {
        yield put(clientsAC.setClientsLoadingStatus(LoadingStatus.LOADING))
        const data = yield call(ClientsApi.getCurrentClient, payload)
        if (data) {
            yield put(clientsAC.setCurrentClient(data))
            history.push(`/clients/add/client/${payload}`)
        }
    } catch (error) {
        yield put(clientsAC.setClientsLoadingStatus(LoadingStatus.ERROR))
    }
}

export function* addClientRequest({payload}: AddClientAI) {
    try {
        yield put(clientsAC.setClientsLoadingStatus(LoadingStatus.LOADING))
        const status = yield call(ClientsApi.addClient, payload)
        if (status === 201) {
            yield put(clientsAC.setStatusOperationClients(LoadingStatus.ADD_CLIENT_SUCCESS))
            history.push("/clients")
        } else {
            yield put(clientsAC.setStatusOperationClients(LoadingStatus.ADD_CLIENT_ERROR))
            yield put(clientsAC.setClientsLoadingStatus(LoadingStatus.LOADED))
        }
    } catch (error) {
            yield put(clientsAC.setClientsLoadingStatus(LoadingStatus.ERROR))
    }
}

export function* removeClientRequest({payload}: RemoveClientAI) {
    try {
        yield put(clientsAC.setClientsLoadingStatus(LoadingStatus.LOADING))
        const status = yield call(ClientsApi.removeClient, payload)
        if (status === 204) {
            history.push("/clients")
            yield put(clientsAC.setStatusOperationClients(LoadingStatus.REMOVE_CLIENT_SUCCESS))
        } else {
            yield put(clientsAC.setStatusOperationClients(LoadingStatus.REMOVE_CLIENT_ERROR))
            yield put(clientsAC.setClientsLoadingStatus(LoadingStatus.LOADED))
        }
    } catch (error) {
        yield put(clientsAC.setClientsLoadingStatus(LoadingStatus.ERROR))
    }
}

export function* updateCurrentClientRequest({payload}: UpdateCurrentClientAI) {
    try {
        yield put(clientsAC.setClientsLoadingStatus(LoadingStatus.LOADING))
        const status = yield call(ClientsApi.updateClient, payload)
        if (status === 200) {
            yield put(clientsAC.setStatusOperationClients(LoadingStatus.UPDATE_CLIENT_SUCCESS))
            history.push("/clients")
        } else {
            yield put(clientsAC.setStatusOperationClients(LoadingStatus.UPDATE_CLIENT_ERROR))
            yield put(clientsAC.setClientsLoadingStatus(LoadingStatus.LOADED))
        }
    } catch (error) {
        yield put(clientsAC.setClientsLoadingStatus(LoadingStatus.ERROR))
    }
}


export function* clientsSaga() {
    yield takeLatest(ClientsAT.FETCH_CLIENTS, fetchClientsRequest)
    yield takeLatest(ClientsAT.FETCH_CURRENT_CLIENT, fetchCurrentClientRequest)
    yield takeLatest(ClientsAT.FETCH_ACCOUNT_NUMBER, fetchAccountNumberRequest)
    yield takeLatest(ClientsAT.UPDATE_CURRENT_CLIENT, updateCurrentClientRequest)
    yield takeLatest(ClientsAT.ADD_CLIENT, addClientRequest)
    yield takeLatest(ClientsAT.REMOVE_CLIENT, removeClientRequest)
}

import produce, {Draft} from "immer"
import {LoadingStatus} from "../../types"
import {ClientsState} from "./stateTypes"
import {ClientsActions} from "./actionCreators"
import {ClientsAT} from "./actionTypes"


const initialClientsState: ClientsState = {
    clientsData: null,
    current_client: null,
    next_client_number: null,
    status: LoadingStatus.NEVER,
    status_operation: LoadingStatus.NEVER,
}

export const clientsReducer = produce((draft: Draft<ClientsState>, action: ClientsActions) => {
    switch (action.type) {
        case ClientsAT.SET_LOADING_STATE:
            draft.status = action.payload
            break

        case ClientsAT.SET_CLIENTS:
            draft.clientsData = action.payload
            draft.status = LoadingStatus.LOADED
            break

        case ClientsAT.SET_CURRENT_CLIENT:
            draft.current_client = action.payload
            draft.status = LoadingStatus.LOADED
            break

        case ClientsAT.SET_ACCOUNT_NUMBER:
            draft.next_client_number = action.payload
            draft.status = LoadingStatus.LOADED
            break

        case ClientsAT.CLEAR_CLIENTS:
            draft.clientsData = null
            draft.status = LoadingStatus.NEVER
            break

        case ClientsAT.CLEAR_CURRENT_CLIENT:
            draft.current_client = null
            break

        case ClientsAT.SET_STATUS_OPERATION_STATE:
            draft.status_operation = action.payload
            break

        default:
            break
    }
}, initialClientsState)

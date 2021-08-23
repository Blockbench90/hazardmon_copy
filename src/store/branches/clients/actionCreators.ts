import {Client, ClientsState, PageRequest} from "./stateTypes"
import {
    AddClientAI,
    ClearClientsAI,
    ClearCurrentClientAI,
    ClientsAT, FetchAccountNumberAI,
    FetchClientsAI,
    FetchCurrentClientAI,
    RemoveClientAI, SetAccountNumberAI,
    SetClientsAI,
    SetClientsLoadingStatusAI,
    SetClientsStatusOperationAI,
    SetCurrentClientAI,
    UpdateCurrentClientAI,
} from "./actionTypes";




export const clientsAC = {

    fetchClients: (payload: PageRequest): FetchClientsAI => ({
        type: ClientsAT.FETCH_CLIENTS,
        payload
    }),

    fetchAccountNumber: (): FetchAccountNumberAI => ({
        type: ClientsAT.FETCH_ACCOUNT_NUMBER,
    }),

    setClients: (payload: ClientsState["clientsData"]): SetClientsAI => ({
        type: ClientsAT.SET_CLIENTS,
        payload
    }),

    fetchCurrentClient: (payload: any): FetchCurrentClientAI => ({
        type: ClientsAT.FETCH_CURRENT_CLIENT,
        payload
    }),

    setCurrentClient: (payload: Client): SetCurrentClientAI => ({
        type: ClientsAT.SET_CURRENT_CLIENT,
        payload
    }),

    setAccountNumber: (payload: number): SetAccountNumberAI => ({
        type: ClientsAT.SET_ACCOUNT_NUMBER,
        payload
    }),

    clearClients: (): ClearClientsAI => ({
        type: ClientsAT.CLEAR_CLIENTS
    }),

    clearCurrentClient: (): ClearCurrentClientAI => ({
        type: ClientsAT.CLEAR_CURRENT_CLIENT
    }),

    setClientsLoadingStatus: (payload: ClientsState["status"]): SetClientsLoadingStatusAI => ({
        type: ClientsAT.SET_LOADING_STATE,
        payload,
    }),

    setStatusOperationClients: (payload: ClientsState["status_operation"]): SetClientsStatusOperationAI => ({
        type: ClientsAT.SET_STATUS_OPERATION_STATE,
        payload,
    }),

    addClient: (payload: Client): AddClientAI => ({
        type: ClientsAT.ADD_CLIENT,
        payload,
    }),

    removeClient: (payload: string): RemoveClientAI => ({
        type: ClientsAT.REMOVE_CLIENT,
        payload,
    }),

    updateCurrentClient: (payload: Client): UpdateCurrentClientAI => ({
        type: ClientsAT.UPDATE_CURRENT_CLIENT,
        payload,
    }),
}


export type ClientsActions =
    | FetchClientsAI
    | SetClientsAI
    | FetchCurrentClientAI
    | FetchAccountNumberAI
    | SetCurrentClientAI
    | ClearClientsAI
    | SetAccountNumberAI
    | ClearCurrentClientAI
    | AddClientAI
    | RemoveClientAI
    | UpdateCurrentClientAI
    | SetClientsLoadingStatusAI
    | SetClientsStatusOperationAI

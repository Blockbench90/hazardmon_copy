import {Action} from "redux"
import {LoadingStatus} from "../../status"
import {Client, ClientsState, PageRequest} from "./stateTypes"

export enum ClientsAT {
    FETCH_CLIENTS = "clients/FETCH_CLIENTS",
    FETCH_ACCOUNT_NUMBER = "clients/FETCH_ACCOUNT_NUMBER",
    FETCH_CURRENT_CLIENT = "clients/FETCH_CURRENT_CLIENT",
    SET_CURRENT_CLIENT = "clients/SET_CURRENT_CLIENT",
    SET_CLIENTS = "clients/SET_CLIENTS",
    SET_ACCOUNT_NUMBER = "clients/SET_ACCOUNT_NUMBER",
    CLEAR_CLIENTS = "clients/CLEAR_CLIENTS",
    ADD_CLIENT = "clients/ADD_CLIENT",
    REMOVE_CLIENT = "clients/REMOVE_CLIENT",
    UPDATE_CURRENT_CLIENT = "clients/UPDATE_CURRENT_CLIENT",
    CLEAR_CURRENT_CLIENT = "clients/CLEAR_CURRENT_CLIENT",
    SET_LOADING_STATE = "clients/SET_LOADING_STATE",
    SET_STATUS_OPERATION_STATE = "clients/SET_STATUS_OPERATION_STATE",
}


export interface FetchClientsAI extends Action<ClientsAT> {
    type: ClientsAT.FETCH_CLIENTS
    payload: PageRequest
}

export interface FetchAccountNumberAI extends Action<ClientsAT> {
    type: ClientsAT.FETCH_ACCOUNT_NUMBER
}

export interface FetchCurrentClientAI extends Action<ClientsAT> {
    type: ClientsAT.FETCH_CURRENT_CLIENT
    payload: any
}

export interface SetCurrentClientAI extends Action<ClientsAT> {
    type: ClientsAT.SET_CURRENT_CLIENT
    payload: Client
}

export interface SetAccountNumberAI extends Action<ClientsAT> {
    type: ClientsAT.SET_ACCOUNT_NUMBER
    payload: number
}

export interface ClearClientsAI extends Action<ClientsAT> {
    type: ClientsAT.CLEAR_CLIENTS
}

export interface ClearCurrentClientAI extends Action<ClientsAT> {
    type: ClientsAT.CLEAR_CURRENT_CLIENT
}

export interface SetClientsAI extends Action<ClientsAT> {
    type: ClientsAT.SET_CLIENTS;
    payload: ClientsState["clientsData"]
}

export interface SetClientsLoadingStatusAI extends Action<ClientsAT> {
    type: ClientsAT.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export interface SetClientsStatusOperationAI extends Action<ClientsAT> {
    type: ClientsAT.SET_STATUS_OPERATION_STATE;
    payload: LoadingStatus;
}

export interface AddClientAI extends Action<ClientsAT> {
    type: ClientsAT.ADD_CLIENT;
    payload: Client;
}

export interface RemoveClientAI extends Action<ClientsAT> {
    type: ClientsAT.REMOVE_CLIENT;
    payload: string;
}

export interface UpdateCurrentClientAI extends Action<ClientsAT> {
    type: ClientsAT.UPDATE_CURRENT_CLIENT;
    payload: Client;
}

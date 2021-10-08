import {Action} from "redux";
import {LoadingStatus} from "../../status";
import {FetchCustomGraphs, FetchGraphs} from "./stateTypes"

export enum GraphsAT {
    FETCH_GRAPHS_DATA = "graphs/FETCH_GRAPHS_DATA",
    FETCH_CUSTOM_GRAPHS_DATA = "graphs/FETCH_CUSTOM_GRAPHS_DATA",
    SET_GRAPHS_DATA = "graphs/SET_GRAPHS_DATA",
    UPDATE_GRAPHS_DATA = "graphs/UPDATE_GRAPHS_DATA",
    UPDATE_OLD_GRAPHS_DATA = "graphs/UPDATE_OLD_GRAPHS_DATA",
    CLEAR_LIVE_DATA = "graphs/CLEAR_LIVE_DATA",
    GET_LIVE_GRAPHS_DATA = "graphs/GET_LIVE_GRAPHS_DATA",
    SET_LIVE_GRAPHS_DATA_TAB = "graphs/SET_LIVE_GRAPHS_DATA_TAB",
    SET_LOADING_STATUS_GRAPHS = "graphs/SET_LOADING_STATUS_GRAPHS",
    SET_GRAPHS_STATUS_OPERATION = "graphs/SET_GRAPHS_STATUS_OPERATION",
    EXPORT_GRAPHS_PNG = "graphs/EXPORT_GRAPHS_PNG",
    CLEAR_GRAPHS_STATE = "graphs/CLEAR_GRAPHS_STATE",
}


export interface FetchGraphsDataAI extends Action<GraphsAT> {
    type: GraphsAT.FETCH_GRAPHS_DATA;
    payload: FetchGraphs;
}

export interface FetchCustomGraphsDataAI extends Action<GraphsAT> {
    type: GraphsAT.FETCH_CUSTOM_GRAPHS_DATA;
    payload: FetchCustomGraphs;
}

export interface SetGraphsDataAI extends Action<GraphsAT> {
    type: GraphsAT.SET_GRAPHS_DATA;
    payload: any
}

export interface SetGraphsLoadingStatusAI extends Action<GraphsAT> {
    type: GraphsAT.SET_LOADING_STATUS_GRAPHS;
    payload: LoadingStatus
}

export interface SetGraphsStatusOperationAI extends Action<GraphsAT> {
    type: GraphsAT.SET_GRAPHS_STATUS_OPERATION;
    payload: LoadingStatus
}

export interface ExportGraphsPNGAI extends Action<GraphsAT> {
    type: GraphsAT.EXPORT_GRAPHS_PNG;
    payload: FetchGraphs
}

export interface ClearGraphsStateAI extends Action<GraphsAT> {
    type: GraphsAT.CLEAR_GRAPHS_STATE;
}

export interface GetLiveGraphsDataAI extends Action<GraphsAT> {
    type: GraphsAT.GET_LIVE_GRAPHS_DATA;
    payload: number
}

export interface SetLiveGraphsDataTabAI extends Action<GraphsAT> {
    type: GraphsAT.SET_LIVE_GRAPHS_DATA_TAB;
    payload: boolean
}

export interface UpdateLiveGraphsDataAI extends Action<GraphsAT> {
    type: GraphsAT.UPDATE_GRAPHS_DATA;
    payload: number
}

export interface UpdateOldLiveGraphsDataAI extends Action<GraphsAT> {
    type: GraphsAT.UPDATE_OLD_GRAPHS_DATA;
    payload: any
}

export interface ClearLiveDataAI extends Action<GraphsAT> {
    type: GraphsAT.CLEAR_LIVE_DATA;
}



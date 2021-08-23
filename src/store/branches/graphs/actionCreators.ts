import {
    ClearGraphsStateAI,
    ExportGraphsPNGAI, FetchCustomGraphsDataAI,
    FetchGraphsDataAI,
    GraphsAT,
    SetGraphsDataAI,
    SetGraphsLoadingStatusAI,
    SetGraphsStatusOperationAI,
} from "./actionTypes"
import {LoadingStatus} from "../../types";
import {FetchCustomGraphs, FetchGraphs} from "./stateTypes"



export const graphsAC = {

    fetchGraphsData: (payload: FetchGraphs): FetchGraphsDataAI => ({
        type: GraphsAT.FETCH_GRAPHS_DATA,
        payload,
    }),

    fetchCustomGraphsData: (payload: FetchCustomGraphs): FetchCustomGraphsDataAI => ({
        type: GraphsAT.FETCH_CUSTOM_GRAPHS_DATA,
        payload,
    }),

    setGraphsData: (payload: any): SetGraphsDataAI => ({
        type: GraphsAT.SET_GRAPHS_DATA,
        payload,
    }),

    setGraphsLoadingStatus: (payload: LoadingStatus): SetGraphsLoadingStatusAI => ({
        type: GraphsAT.SET_LOADING_STATUS_GRAPHS,
        payload,
    }),

    setGraphsStatusOperation: (payload: LoadingStatus): SetGraphsStatusOperationAI => ({
        type: GraphsAT.SET_GRAPHS_STATUS_OPERATION,
        payload,
    }),

    clearGraphsState: (): ClearGraphsStateAI => ({
        type: GraphsAT.CLEAR_GRAPHS_STATE,
    }),

}

export type GraphsActions =
    | FetchGraphsDataAI
    | FetchCustomGraphsDataAI
    | SetGraphsDataAI
    | SetGraphsLoadingStatusAI
    | SetGraphsStatusOperationAI
    | ExportGraphsPNGAI
    | ClearGraphsStateAI

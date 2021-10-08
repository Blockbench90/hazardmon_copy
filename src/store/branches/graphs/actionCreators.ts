import {
    ClearGraphsStateAI, ClearLiveDataAI,
    ExportGraphsPNGAI, FetchCustomGraphsDataAI,
    FetchGraphsDataAI, GetLiveGraphsDataAI,
    GraphsAT,
    SetGraphsDataAI,
    SetGraphsLoadingStatusAI,
    SetGraphsStatusOperationAI, SetLiveGraphsDataTabAI, UpdateLiveGraphsDataAI, UpdateOldLiveGraphsDataAI,
} from "./actionTypes";
import {LoadingStatus} from "../../status";
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

    updateOldGraphsData: (payload: any): UpdateOldLiveGraphsDataAI => ({
        type: GraphsAT.UPDATE_OLD_GRAPHS_DATA,
        payload,
    }),

    clearLiveData: (): ClearLiveDataAI => ({
        type: GraphsAT.CLEAR_LIVE_DATA,
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

    getLiveGraphsData : (payload: number): GetLiveGraphsDataAI => ({
        type: GraphsAT.GET_LIVE_GRAPHS_DATA,
        payload
    }),

    setLiveGraphsDataTab : (payload: boolean): SetLiveGraphsDataTabAI => ({
        type: GraphsAT.SET_LIVE_GRAPHS_DATA_TAB,
        payload
    }),

    updateLiveGraphsData : (payload: number): UpdateLiveGraphsDataAI => ({
        type: GraphsAT.UPDATE_GRAPHS_DATA,
        payload
    })

}

export type GraphsActions =
    | FetchGraphsDataAI
    | FetchCustomGraphsDataAI
    | SetGraphsDataAI
    | SetGraphsLoadingStatusAI
    | SetGraphsStatusOperationAI
    | ExportGraphsPNGAI
    | GetLiveGraphsDataAI
    | ClearGraphsStateAI
    | UpdateLiveGraphsDataAI
    | UpdateOldLiveGraphsDataAI
    | SetLiveGraphsDataTabAI
    | ClearLiveDataAI

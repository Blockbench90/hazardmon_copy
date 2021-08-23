import produce, {Draft} from "immer";
import {LoadingStatus} from "../../types";
import {GraphsActions} from "./actionCreators";
import {GraphsAT} from "./actionTypes";
import {GraphsState} from "./stateTypes";

const initialGraphsState: GraphsState = {
    graphsData: null,
    status: LoadingStatus.NEVER,
    status_operation: LoadingStatus.NEVER,
};

export const graphsReducer = produce((draft: Draft<GraphsState>, action: GraphsActions) => {
    switch (action.type) {
        case GraphsAT.SET_GRAPHS_DATA:
            draft.graphsData = action.payload;
            draft.status = LoadingStatus.SUCCESS;
            break;

        case GraphsAT.SET_LOADING_STATUS_GRAPHS:
            draft.status = action.payload;
            break;

        case GraphsAT.SET_GRAPHS_STATUS_OPERATION:
            draft.status_operation = action.payload;
            break;

        case GraphsAT.CLEAR_GRAPHS_STATE:
            draft.graphsData = null;
            break;

        default:
            break;

    }
}, initialGraphsState);

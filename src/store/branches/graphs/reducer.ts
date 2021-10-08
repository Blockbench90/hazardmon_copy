import produce, {Draft} from "immer";
import {LoadingStatus} from "../../status";
import {GraphsActions} from "./actionCreators";
import {GraphsAT} from "./actionTypes";
import {GraphsState} from "./stateTypes";

const initialGraphsState: GraphsState = {
    graphsData: null,
    liveData: null,
    isLivePage: false,
    status: LoadingStatus.NEVER,
    status_operation: LoadingStatus.NEVER,
};

export const graphsReducer = produce((draft: Draft<GraphsState>, action: GraphsActions) => {
    switch (action.type) {
        case GraphsAT.SET_GRAPHS_DATA:
            draft.graphsData = action.payload;
            draft.status = LoadingStatus.SUCCESS;
            break;

        case GraphsAT.UPDATE_OLD_GRAPHS_DATA:
            const currentData = draft.liveData;
            const nextData = action.payload;

            if (!currentData) {
                draft.liveData = nextData;
                break;
            }

            if (currentData.device !== nextData.device) {
                console.error("Live data cannot be merged device id doesn't match.");
            }

            const existingGraphNames = Object.keys(currentData.graphs);

            for (let graphName of existingGraphNames) {
                const currentGraph = currentData.graphs[graphName];

                if (!nextData.graphs.hasOwnProperty(graphName)) {
                    console.error(`Graph ${graphName} doesn't exist in next data.`);
                    continue;
                }

                const newGraph = nextData.graphs[graphName];

                for (let i = 0; i < currentGraph.series.length; i++) {
                    const currentSeries = currentGraph.series[i];
                    const nextSeries = newGraph.series[i];

                    currentSeries.data = [...currentSeries.data, ...nextSeries.data];
                }
            }

            draft.liveData = currentData;
            break;

        case GraphsAT.SET_LOADING_STATUS_GRAPHS:
            draft.status = action.payload;
            break;

        case GraphsAT.CLEAR_LIVE_DATA:
            draft.liveData = null;
            break;

        case GraphsAT.SET_GRAPHS_STATUS_OPERATION:
            draft.status_operation = action.payload;
            break;

        case GraphsAT.CLEAR_GRAPHS_STATE:
            draft.graphsData = null;
            break;

        case GraphsAT.SET_LIVE_GRAPHS_DATA_TAB:
            draft.isLivePage = action.payload;
            break;

        default:
            break;

    }
}, initialGraphsState);

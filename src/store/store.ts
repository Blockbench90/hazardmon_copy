import {applyMiddleware, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";
import {rootReducer} from "./rootReducer";

import {UserState} from "./branches/user/stateTypes";
import {ClientsState} from "./branches/clients/stateTypes";
import {DevicesState} from "./branches/devices/stateTypes";
import {SitesState} from "./branches/sites/stateTypes";
import {SensorsState} from "./branches/sensors/stateTypes";
import {GraphsState} from "./branches/graphs/stateTypes";
import {AnalyticsState} from "./branches/analytics/stateTypes";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers =
    (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const sagaMiddleware = createSagaMiddleware();

export interface RootState {
    user: UserState
    clients: ClientsState
    sites: SitesState
    devices: DevicesState
    sensors: SensorsState
    graphs: GraphsState
    analytics: AnalyticsState
}

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

import {combineReducers} from "redux";
import {userReducer} from "./branches/user/reducer";
import {clientsReducer} from "./branches/clients/reducer";
import {devicesReducer} from "./branches/devices/reducer";
import {sitesReducer} from "./branches/sites/reducer";
import {sensorsReducer} from "./branches/sensors/reducer"
import {graphsReducer} from "./branches/graphs/reducer";
import {analyticsReducer} from "./branches/analytics/reducer";
import authReducer from "./branches/visual-dashboard/authReducer";
import schemasReducer from "./branches/visual-dashboard/schemasReducer";
import { reducer as reduxFormReducer } from 'redux-form';


export const rootReducer = combineReducers({
    user: userReducer,
    clients: clientsReducer,
    sites: sitesReducer,
    devices: devicesReducer,
    sensors: sensorsReducer,
    graphs: graphsReducer,
    analytics: analyticsReducer,
    authReducer,
    form: reduxFormReducer,
    schemasReducer,
});

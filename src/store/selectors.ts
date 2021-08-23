import {RootState} from "./store";
import {AnalyticsState} from "./branches/analytics/stateTypes";
import {ClientsState} from "./branches/clients/stateTypes";
import {DevicesState} from "./branches/devices/stateTypes";
import {GraphsState} from "./branches/graphs/stateTypes";
import {SensorsState} from "./branches/sensors/stateTypes";
import {SitesState} from "./branches/sites/stateTypes";
import {UserState} from "./branches/user/stateTypes";

export const selectAnalyticsState = (state: RootState): AnalyticsState => state.analytics;

export const selectClientsState = (state: RootState): ClientsState => state.clients;

export const selectDevicesState = (state: RootState): DevicesState => state.devices;

export const selectGraphsState = (state: RootState): GraphsState => state.graphs;

export const selectSensorsState = (state: RootState): SensorsState => state.sensors;

export const selectSitesState = (state: RootState): SitesState => state.sites;

export const selectUserState = (state: RootState): UserState => state.user;
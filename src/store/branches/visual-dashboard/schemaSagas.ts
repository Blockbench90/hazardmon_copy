import {eventChannel} from 'redux-saga';
import {all, call, put, take, takeLatest} from 'redux-saga/effects';

// utils
import Notification from '../../../components/Notification/Notification';

import * as schemasConstants from '../../../constants/actions/schemasConstants';
import {parseResponseErrors} from '../../../helpers/helperFunctions';
import history from '../../../helpers/history';

// interfaces
import {Machine, MachineType} from "../../../interfaces/schemasReducer";
import * as schemaService from '../../../services/schemaService';
import urls from '../../../constants/urls';

// constants
let wsTabChannel: any = null;
let wsMachineChannel: any = null;
let wsCurrentUserChannel: any = null;

// ---------------------------------------
export function* getLocationsList() {
    try {
        const response = yield schemaService.getLocations();
        yield put({
            payload: response.data.results,
            type: schemasConstants.GET_LOCATIONS_LIST_SUCCESS
        });
    } catch (error) {
        yield put({type: schemasConstants.GET_LOCATIONS_LIST_ERROR, error});
    }
}

export function* watchGetLocationsList() {
    yield takeLatest(schemasConstants.GET_LOCATIONS_LIST, getLocationsList);
}

// ---------------------------------------
export function* getTabDetails(data: any) {
    try {
        const response = yield schemaService.getTabDetails(data.payload);
        const responseTypes = yield schemaService.getMachineTypesList();
        const extendedDetails = {...response.data};
        extendedDetails.machines.forEach((machine: Machine) => {
            machine.type_of_machine = responseTypes.data.results.find((machineType: MachineType) => machineType.id === machine.type_of_machine);
        });
        yield put({
            payload: extendedDetails,
            type: schemasConstants.GET_TAB_DETAILS_SUCCESS
        });
    } catch (error) {
        yield put({type: schemasConstants.GET_TAB_DETAILS_ERROR, error});
    }
}

export function* watchGetTabDetails() {
    yield takeLatest(schemasConstants.GET_TAB_DETAILS, getTabDetails);
}


// ---------------------------------------
export function* getSchemasList(data: any) {
    try {
        const response = yield schemaService.getSchemasList(data.payload);
        yield put({type: schemasConstants.GET_SCHEMAS_LIST_SUCCESS, payload: response.data.results});
    } catch (error) {
        yield put({type: schemasConstants.GET_SCHEMAS_LIST_ERROR, error});
    }
}

export function* watchGetSchemasList() {
    yield takeLatest(schemasConstants.GET_SCHEMAS_LIST, getSchemasList);
}

// ---------------------------------------
export function* getSchemaDetails(data: any) {
    try {
        const response = yield schemaService.getSchemaDetails(data.payload);
        if (response.data.id) {
            yield put({type: schemasConstants.GET_SCHEMA_DETAILS_SUCCESS, payload: response.data});
        } else {
            yield put({type: schemasConstants.GET_SCHEMA_DETAILS_SUCCESS, payload: null});
            history.push(urls.schemasList);
        }
    } catch (error) {
        yield put({type: schemasConstants.GET_SCHEMA_DETAILS_ERROR, error});
        history.push(urls.schemasList);
    }
}

export function* watchGetSchemaDetails() {
    yield takeLatest(schemasConstants.GET_SCHEMA_DETAILS, getSchemaDetails);
}

// ---------------------------------------
export function* getMachineTypesList() {
    try {
        const response = yield schemaService.getMachineTypesList();
        yield put({type: schemasConstants.GET_MACHINE_TYPES_LIST_SUCCESS, payload: response.data.results});
    } catch (error) {
        yield put({type: schemasConstants.GET_MACHINE_TYPES_LIST_ERROR, error});
    }
}

export function* watchGetMachinesList() {
    yield takeLatest(schemasConstants.GET_MACHINE_TYPES_LIST, getMachineTypesList);
}

// ---------------------------------------
export function* saveTabForm(data: any) {
    try {
        const response = yield schemaService.saveTabForm(data.payload.formData);
        yield put({
            payload: {
                data: response.data,
                isEdit: Boolean(data.payload.formData.id)
            },
            type: schemasConstants.SAVE_TAB_FORM_SUCCESS
        });
        yield put({
            payload: false,
            type: schemasConstants.TOGGLE_SHOW_EDITOR_PROMT
        });
        history.push(urls.schemaDetails.replace(':siteId', `${data.payload.siteId}`).replace(':schemaId', `${response.data.schema}`).replace(':tabId', response.data.id));
    } catch (error) {
        yield put({type: schemasConstants.SAVE_TAB_FORM_ERROR, error});
        Notification.error(parseResponseErrors(error));
    }
}

export function* watchSaveTabForm() {
    yield takeLatest(schemasConstants.SAVE_TAB_FORM, saveTabForm);
}

// ---------------------------------------
export function* searchSensors(data: any) {
    try {
        const response = yield schemaService.searchSensors(data.payload);
        yield put({
            payload: response.data,
            type: schemasConstants.SEARCH_SENSORS_SUCCESS
        });
    } catch (error) {
        yield put({type: schemasConstants.SEARCH_SENSORS_ERROR, error});
    }
}

export function* watchSearchSensors() {
    yield takeLatest(schemasConstants.SEARCH_SENSORS, searchSensors);
}

// ---------------------------------------
export function* getMachineDetails(data: any) {
    try {
        const response = yield schemaService.getMachineDetails(data.payload);
        yield put({type: schemasConstants.GET_MACHINE_DETAILS_SUCCESS, payload: response.data});
    } catch (error) {
        yield put({type: schemasConstants.GET_MACHINE_DETAILS_ERROR, error});
        history.push(urls.schemasList);
    }
}

export function* watchGetMachineDetails() {
    yield takeLatest(schemasConstants.GET_MACHINE_DETAILS, getMachineDetails);
}

// ---------------------------------------
export function* getSensorGraph(data: any) {
    try {
        const response = yield schemaService.getSensorsGraph(data.payload);
        yield put({type: schemasConstants.GET_SENSORS_GRAPH_SUCCESS, payload: response.data});
    } catch (error) {
        yield put({type: schemasConstants.GET_SENSORS_GRAPH_ERROR, error});
    }
}

export function* watchGetSensorsGraph() {
    yield takeLatest(schemasConstants.GET_SENSORS_GRAPH, getSensorGraph);
}

// ---------------------------------------
export function* getMachineNotifications(data: any) {
    try {
        const response = yield schemaService.getMachineNotifications(data.payload);
        yield put({type: schemasConstants.GET_MACHINE_NOTIFICATIONS_SUCCESS, payload: response.data});
    } catch (error) {
        yield put({type: schemasConstants.GET_MACHINE_NOTIFICATIONS_ERROR, error});
    }
}

export function* watchGetMachineNotifications() {
    yield takeLatest(schemasConstants.GET_MACHINE_NOTIFICATIONS, getMachineNotifications);
}

// ---------------------------------------
export function* getMachineLastTimeInAlarm(data: any) {
    try {
        const response = yield schemaService.getMachineLastTimeInAlarm(data.payload);
        yield put({type: schemasConstants.GET_MACHINE_LAST_TIME_IN_ALARM_SUCCESS, payload: response.data});
    } catch (error) {
        yield put({type: schemasConstants.GET_MACHINE_LAST_TIME_IN_ALARM_ERROR, error});
    }
}

export function* watchGetMachineLastTimeInAlarm() {
    yield takeLatest(schemasConstants.GET_MACHINE_LAST_TIME_IN_ALARM, getMachineLastTimeInAlarm);
}

// ---------------------------------------
export function* getMachineMaintenance(data: any) {
    try {
        const response = yield schemaService.getMachineMaintenance(data.payload);
        yield put({type: schemasConstants.GET_MACHINE_MAINTENANCE_SUCCESS, payload: response.data});
    } catch (error) {
        yield put({type: schemasConstants.GET_MACHINE_MAINTENANCE_ERROR, error});
    }
}

export function* watchGetMachineMaintenance() {
    yield takeLatest(schemasConstants.GET_MACHINE_MAINTENANCE, getMachineMaintenance);
}

// ---------------------------------------
export function* publishSchema(data: any) {
    try {
        const response = yield schemaService.publishSchema(data.payload);
        yield put({type: schemasConstants.PUBLISH_SCHEMA_SUCCESS, payload: response.data});
        yield put({type: schemasConstants.GET_SCHEMAS_LIST, payload: data.payload.siteId});
        yield put({type: schemasConstants.GET_LOCATIONS_LIST});
    } catch (error) {
        yield put({type: schemasConstants.PUBLISH_SCHEMA_ERROR, error});
    }
}

export function* watchPublishSchema() {
    yield takeLatest(schemasConstants.PUBLISH_SCHEMA, publishSchema);
}

// ---------------------------------------
export function* cloneSchema(data: any) {
    try {
        const response = yield schemaService.cloneSchema(data.payload.schemaId, data.payload.name);
        yield put({type: schemasConstants.CLONE_SCHEMA_SUCCESS, payload: response.data});
        history.push(urls.schemaDetails.replace(':siteId', data.payload.siteId).replace(':schemaId', `${response.data.id}`).replace(':tabId', `${response.data.schema_tabs[0].id}`));
        if (data.payload.onSuccess) {
            data.payload.onSuccess(response.data);
        }
    } catch (error) {
        yield put({type: schemasConstants.CLONE_SCHEMA_ERROR, error});
        Notification.error(parseResponseErrors(error));
    }
}

export function* watchCloneSchema() {
    yield takeLatest(schemasConstants.CLONE_SCHEMA, cloneSchema);
}

// ---------------------------------------
export function* cloneTab(data: any) {
    try {
        const response = yield schemaService.cloneTab(data.payload.tabId);
        yield put({type: schemasConstants.CLONE_TAB_SUCCESS, payload: response.data});
        history.push(urls.tabEdit.replace(':siteId', data.payload.siteId).replace(':schemaId', `${response.data.schema.id}`).replace(':tabId', `${response.data.id}`));
        yield put({type: schemasConstants.GET_SCHEMA_DETAILS, payload: response.data.schema.id});
    } catch (error) {
        yield put({type: schemasConstants.CLONE_TAB_ERROR, error});
    }
}

export function* watchCloneTab() {
    yield takeLatest(schemasConstants.CLONE_TAB, cloneTab);
}

// ---------------------------------------
export function* deleteSchema(data: any) {
    try {
        const response = yield schemaService.deleteSchema(data.payload.id);
        yield put({type: schemasConstants.DELETE_SCHEMA_SUCCESS, payload: response.data});
        if (history.location.pathname === urls.schemasList.replace(':siteId', data.payload.siteId)) {
            yield put({type: schemasConstants.GET_SCHEMAS_LIST, payload: {location: data.payload.siteId, order_by: null}});
        } else {
            history.push(urls.schemasList.replace(':siteId', data.payload.siteId));
        }
    } catch (error) {
        yield put({type: schemasConstants.DELETE_SCHEMA_ERROR, error});
        Notification.error(parseResponseErrors(error));
    }
}

export function* watchDeleteSchema() {
    yield takeLatest(schemasConstants.DELETE_SCHEMA, deleteSchema);
}

// ---------------------------------------
export function* deleteTab(data: any) {
    try {
        const response = yield schemaService.deleteTab(data.payload.tabId);
        yield put({type: schemasConstants.DELETE_TAB_SUCCESS, payload: response.data});
        yield put({
            payload: false,
            type: schemasConstants.TOGGLE_SHOW_EDITOR_PROMT
        });
        if (data.payload.nextTabId) {
            history.push(urls.schemaDetails.replace(':siteId', data.payload.siteId).replace(':schemaId', `${data.payload.schemaId}`).replace(':tabId', `${data.payload.nextTabId}`));
        }
        yield put({type: schemasConstants.GET_SCHEMA_DETAILS, payload: data.payload.schemaId});
        yield put({type: schemasConstants.GET_LOCATIONS_LIST});
    } catch (error) {
        yield put({type: schemasConstants.DELETE_TAB_ERROR, error});
        Notification.error(parseResponseErrors(error));
    }
}

export function* watchDeleteTab() {
    yield takeLatest(schemasConstants.DELETE_TAB, deleteTab);
}

// ---------------------------------------

export function toggleMachineSocket(machineId: string) {
    return eventChannel((emitter: any) => {
        const ws: any = schemaService.machineDetailsWS(machineId);

        ws.onerror = (error: any) => {
            console.log('WebSocket error ' + error);
            console.dir(error);
        };

        ws.onmessage = (e: any) => {
            let msg = null;
            try {
                msg = JSON.parse(e.data);
            } catch(e) {
                // @ts-ignore
                console.error(`Error parsing : ${e.data}`);
            }

            return emitter({type: schemasConstants.UPDATE_MACHINE_DETAILS, payload: msg});
        };

        // unsubscribe function
        return () => {
            console.log(`Socket off`);
            if (ws) {
                ws.close();
            }
        }
    });
}

export function* runMachineSocket (data: any) {
    if (data.payload.isOpen) {
        wsMachineChannel = yield call(toggleMachineSocket, data.payload.machineId);
        while (true) {
            const action = yield take(wsMachineChannel);
            yield put(action);
        }
    } else {
        if (wsMachineChannel) {
            wsMachineChannel.close();
        }
    }
}

export function* watchToggleMachineSocket() {
    yield takeLatest(schemasConstants.TOGGLE_MACHINE_SOCKET, runMachineSocket);
}

export function toggleTabSocket(tabId: string) {
    return eventChannel((emitter: any) => {
        const ws: any = schemaService.tabDetailsWS(tabId);

        ws.onerror = (error: any) => {
            console.log('WebSocket error ' + error);
            console.dir(error);
        };

        ws.onmessage = (e: any) => {
            let msg = null;
            try {
                msg = JSON.parse(e.data);
            } catch(e) {
                // @ts-ignore
                console.error(`Error parsing : ${e.data}`);
            }

            return emitter({type: schemasConstants.UPDATE_TAB_DETAILS, payload: msg});
        };

        // unsubscribe function
        return () => {
            console.log(`Socket off`);
            if (ws) {
                ws.close();
            }
        }
    });
}

export function* runTabSocket (data: any) {
    if (data.payload.isOpen) {
        wsTabChannel = yield call(toggleTabSocket, data.payload.tabId);
        while (true) {
            const action = yield take(wsTabChannel);
            yield put(action);
        }
    } else {
        if (wsTabChannel) {
            wsTabChannel.close();
        }
    }
}

export function* watchToggleTabSocket() {
    yield takeLatest(schemasConstants.TOGGLE_TAB_SOCKET, runTabSocket);
}

// ---------------------------------------
export function* getSchemaNotifications(data: any) {
    try {
        const response = yield schemaService.getSchemaNotifications(data.payload);
        yield put({type: schemasConstants.GET_SCHEMA_NOTIFICATIONS_SUCCESS, payload: response.data});
    } catch (error) {
        yield put({type: schemasConstants.GET_SCHEMA_NOTIFICATIONS_ERROR, error});
    }
}

export function* watchGetSchemaNotifications() {
    yield takeLatest(schemasConstants.GET_SCHEMA_NOTIFICATIONS, getSchemaNotifications);
}

// ---------------------------------------
export function* getCurrentUserNotifications() {
    try {
        const response = yield schemaService.getCurrentUserNotifications();
        yield put({type: schemasConstants.GET_CURRENT_USER_NOTIFICATIONS_SUCCESS, payload: response.data});
    } catch (error) {
        yield put({type: schemasConstants.GET_CURRENT_USER_NOTIFICATIONS_ERROR, error});
    }
}

export function* watchGetCurrentUserNotifications() {
    yield takeLatest(schemasConstants.GET_CURRENT_USER_NOTIFICATIONS, getCurrentUserNotifications);
}

// –––––––––––––––––––––––––––––––––––––––

export function toggleCurrentUserSocket() {
    return eventChannel((emitter: any) => {
        const ws: any = schemaService.currentUserWS();

        ws.onerror = (error: any) => {
            console.log('WebSocket error ' + error);
            console.dir(error);
        };

        ws.onmessage = (e: any) => {
            let msg = null;
            try {
                msg = JSON.parse(e.data);
            } catch(e) {
                // @ts-ignore
                console.error(`Error parsing : ${e.data}`);
            }

            msg.notifications.forEach((notification: any) => Notification.locationAlert(notification));

            return emitter({type: schemasConstants.ON_CURRENT_USER_NOTIFICATION, payload: msg});
        };

        // unsubscribe function
        return () => {
            console.log(`Socket off`);
            if (ws) {
                ws.close();
            }
        }
    });
}

export function* runCurrentUserSocket (data: any) {
    if (data.payload) {
        wsCurrentUserChannel = yield call(toggleCurrentUserSocket);
        while (true) {
            const action = yield take(wsCurrentUserChannel);
            yield put(action);
        }
    } else {
        if (wsCurrentUserChannel) {
            wsCurrentUserChannel.close();
        }
    }
}

export function* watchToggleCurrentUserSocket() {
    // yield takeLatest(schemasConstants.TOGGLE_CURRENT_USER_SOCKET, runCurrentUserSocket);
}

// ---------------------------------------
export function* changeTabsOrder(data: any) {
    try {
        const response = yield schemaService.changeTabsOrder(data.payload);
        yield put({type: schemasConstants.CHANGE_TABS_ORDER_SUCCESS, payload: response.data});
    } catch (error) {
        yield put({type: schemasConstants.CHANGE_TABS_ORDER_ERROR, error});
    }
}

export function* watchChangeTabsOrder() {
    yield takeLatest(schemasConstants.CHANGE_TABS_ORDER, changeTabsOrder);
}

// ---------------------------------------
export default function* schemaSaga() {
    yield all([
        watchGetMachinesList(),
        watchSaveTabForm(),
        watchGetSchemasList(),
        watchGetSchemaDetails(),
        watchGetTabDetails(),
        watchSearchSensors(),
        watchGetMachineDetails(),
        watchGetMachineNotifications(),
        watchGetMachineLastTimeInAlarm(),
        watchGetMachineMaintenance(),
        watchPublishSchema(),
        watchCloneSchema(),
        watchDeleteSchema(),
        watchDeleteTab(),
        watchGetLocationsList(),
        watchCloneTab(),
        watchToggleMachineSocket(),
        watchToggleTabSocket(),
        watchGetSchemaNotifications(),
        watchGetSensorsGraph(),
        watchGetCurrentUserNotifications(),
        watchToggleCurrentUserSocket(),
        watchChangeTabsOrder()
    ])
}
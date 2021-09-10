import _ from 'lodash';

import * as schemasConstants from '../constants/actions/schemasConstants';
import {Application} from "../containers/Editor/components/Application";
import SchemasReducer, {MachineExtended, SensorObj, TabInList} from '../interfaces/schemasReducer';

const findSensorDetails = (sensorId: string, payload: any) => {
    const sensorIdsArray =  sensorId.split('.');
    let objToReturn = null;
    let groupObj: any = null;
    let sensorObj: any = null;

    if (payload.device.deviceId === sensorIdsArray[0]) {
        sensorIdsArray.slice(0).forEach((id: string, index: number) => {
            if (index + 1 === sensorIdsArray.length) {
                // console.log(groupObj);
                sensorObj = groupObj.sensors.find((sensor: any) => sensor.Id === id);
            } else {
                const searchIn = groupObj ? groupObj.groups : payload.groups;
                groupObj = searchIn.find((group: any) => group.Id === id);
            }
        });

        objToReturn = sensorObj ? {...sensorObj, GroupName: groupObj.Name} : undefined;
    }

    return objToReturn;
};

const processNotifications = (notificationsList: any, payloadNotifications: any, isMaintenance?: boolean) => {
    const filteredNotifications = payloadNotifications.filter((notification: any) => {
        return isMaintenance ? notification.event_type === 'Maintenance' : notification.event_type !== 'Maintenance';
    });

    filteredNotifications.forEach((notification: any) => {
        const forebearNotificationIndex = _.findIndex(notificationsList, (machineNotification: any) => {
            return notification.forebear_pk ? machineNotification.id === notification.forebear_pk.toString() : false;
        });

        if (forebearNotificationIndex !== -1) {
            notificationsList.splice(forebearNotificationIndex, 1);
        } else {
            notificationsList.splice(0, 0, {
                content: notification.content,
                date_created: parseInt(notification.timestamp, 10),
                device_id: notification.full_sensor_id.split('.')[0],
                device_name: notification.device,
                event_type: notification.event_type,
                full_sensor_id: notification.full_sensor_id,
                id: notification.pk.toString(),
                sensor_id: parseInt(notification.sensor_id, 10),
                sensor_name: notification.sensor_name,
                value: notification.value
            });
        }
    });
};

const initialState: SchemasReducer = {
    app: new Application(),
    currentLocation: null,
    currentUserNotifications: [],
    isFullScreen: false,
    locations: [],
    locationsLoading: false,
    machineDetails: null,
    machineDetailsMaintenance: [],
    machineDetailsNotifications: [],
    machineTypesList: [],
    onSuccessModifyPublishedModal: null,
    onTabSensors: [],
    schemaDetails: null,
    schemaDetailsLoading: false,
    schemaNotifications: [],
    schemaToCloneId: null,
    schemaToPublishId: null,
    schemasList: [],
    selectedSensorInfo: null,
    sensorSuggestions: [],
    sensorsGraphData: [],
    sensorsGraphDataLoading: false,
    showEditorPromt: false,
    showModifyPublishedModal: false,
    showPublishModal: false,
    siteToCloneId: null,
    suggestionsInputValue: '',
    tabDetails: null,
    tabDetailsLoading: false,
    updateFlag: new Date,
};

const schemasReducer = (state = initialState, action: any) => {
    let machines = [];
    let machineIndex = null;
    let onTabSensors = new Array<string>();
    let machineDetailsNotifications: any = [];
    let machineDetailsMaintenance: any = [];
    let schemaNotifications: any = [];

    switch (action.type) {
        case schemasConstants.GET_SCHEMAS_LIST:
            return {
                ...state,
                schemasList: []
            };
        case schemasConstants.GET_SCHEMAS_LIST_SUCCESS:
            return {
                ...state,
                schemasList: action.payload
            };
        case schemasConstants.GET_SCHEMAS_LIST_ERROR:
            return {
                ...state
            };
        case schemasConstants.APP_INIT:
            return {
                ...state,
                app: action.payload
            };
        case schemasConstants.GET_SCHEMA_DETAILS:
            return {
                ...state,
                schemaDetailsLoading: true
            };
        case schemasConstants.GET_SCHEMA_DETAILS_SUCCESS:
            return {
                ...state,
                currentLocation: action.payload.location,
                schemaDetails: action.payload,
                schemaDetailsLoading: false
            };
        case schemasConstants.GET_SCHEMA_DETAILS_ERROR:
            return {
                ...state,
                schemaDetailsLoading: false
            };
        case schemasConstants.GET_TAB_DETAILS:
            return {
                ...state,
                tabDetails: null,
                tabDetailsLoading: true,
            };
        case schemasConstants.GET_TAB_DETAILS_SUCCESS:
            onTabSensors = [];
            action.payload.machines.forEach((machine: MachineExtended) => {
                machine.sensors.forEach((sensorObj: SensorObj) => {
                    onTabSensors.push(sensorObj.sensor.id);
                });
                if (machine.system_state_sensor) {
                    onTabSensors.push(machine.system_state_sensor.id);
                }
            });

            return {
                ...state,
                app: new Application(action.payload),
                onTabSensors,
                tabDetails: action.payload,
                tabDetailsLoading: false
            };
        case schemasConstants.GET_TAB_DETAILS_ERROR:
            return {
                ...state,
                tabDetailsLoading: false
            };
        case schemasConstants.CLEAR_TAB_DETAILS:
            return {
                ...state,
                app: new Application(),
                onTabSensors: [],
                tabDetails: null,
            };
        case schemasConstants.CLEAR_SCHEMA_DETAILS:
            return {
                ...state,
                schemaDetails: null,
                schemaNotifications: []
            };
        case schemasConstants.GET_MACHINE_TYPES_LIST:
            return {
                ...state
            };
        case schemasConstants.GET_MACHINE_TYPES_LIST_SUCCESS:
            return {
                ...state,
                machineTypesList: action.payload
            };
        case schemasConstants.GET_MACHINE_TYPES_LIST_ERROR:
            return {
                ...state
            };
        case schemasConstants.SAVE_SCHEMA_FORM_SUCCESS:
            return {
                ...state,
            };
        case schemasConstants.SELECT_SENSOR_PORT:
            return {
                ...state,
                selectedSensorInfo: action.payload,
                suggestionsInputValue: ''
            };
        case schemasConstants.SEARCH_SENSORS:
            return {
                ...state,
                suggestionsInputValue: action.payload.q
            };
        case schemasConstants.SEARCH_SENSORS_SUCCESS:
            return {
                ...state,
                sensorSuggestions: action.payload
            };
        case schemasConstants.UPDATE_FORM:
            return {
                ...state,
                updateFlag: new Date
            };
        case schemasConstants.FLIP:
            machines = state.tabDetails.machines.slice();
            machineIndex = machines.findIndex((machineObj: MachineExtended) => machineObj.id === action.payload);
            machines[machineIndex] = {...machines[machineIndex], flip: !machines[machineIndex].flip};

            return {
                ...state,
                tabDetails: {...state.tabDetails, machines }
            };
        case schemasConstants.GET_MACHINE_DETAILS_SUCCESS: {
            return {
                ...state,
                machineDetails: action.payload
            };
        }
        case schemasConstants.GET_MACHINE_NOTIFICATIONS_SUCCESS: {
            return {
                ...state,
                machineDetailsNotifications: action.payload
            };
        }
        case schemasConstants.GET_MACHINE_MAINTENANCE_SUCCESS: {
            return {
                ...state,
                machineDetailsMaintenance: action.payload
            };
        }
        case schemasConstants.CLEAR_MACHINE_DETAILS: {
            return {
                ...state,
                machineDetails: null,
                machineDetailsMaintenance: [],
                machineDetailsNotifications: []
            };
        }
        case schemasConstants.UPDATE_MACHINE_DETAILS: {
            let extendedSystemState = state.machineDetails.system_state_sensor;
            if (state.machineDetails.system_state_sensor) {
                const systemStateLiveData = findSensorDetails(state.machineDetails.system_state_sensor.id, action.payload)
                if (systemStateLiveData) {
                    extendedSystemState = {
                        ...state.machineDetails.system_state_sensor,
                        liveData: systemStateLiveData
                    }
                }
            }
            const sensors = state.machineDetails.sensors.map((sensorObj: SensorObj) => {
                const liveData = findSensorDetails(sensorObj.sensor.id, action.payload);

                return liveData ? {
                    ...sensorObj,
                    sensor: {
                        ...sensorObj.sensor,
                        liveData
                    }
                } : sensorObj;
            });

            const isEqualSensorsInfo = _.isEqual(state.machineDetails.sensors, sensors);
            const isEqualStateSensorInfo = _.isEqual(state.machineDetails.system_state_sensor, extendedSystemState);

            return isEqualSensorsInfo && isEqualStateSensorInfo ? state : {
                ...state,
                machineDetails: {
                    ...state.machineDetails,
                    sensors,
                    system_state_sensor: extendedSystemState
                },
            };
        }
        case schemasConstants.UPDATE_TAB_DETAILS: {
            const tabDetails = state.tabDetails && {
                ...state.tabDetails,
                machines: state.tabDetails.machines.map(machineObj => {
                    let extendedSystemState = machineObj.system_state_sensor;
                    if (machineObj.system_state_sensor) {
                        const systemStateLiveData = findSensorDetails(machineObj.system_state_sensor.id, action.payload);
                        if (systemStateLiveData) {
                            extendedSystemState = {
                                ...machineObj.system_state_sensor,
                                liveData: systemStateLiveData
                            }
                        }
                    }
                    return {
                        ...machineObj,
                        sensors: machineObj.sensors.map((sensorObj: SensorObj) => {
                            const liveData = findSensorDetails(sensorObj.sensor.id, action.payload);

                            return liveData ? {
                                ...sensorObj,
                                sensor: {
                                    ...sensorObj.sensor,
                                    liveData
                                }
                            } : sensorObj;
                        }),
                        system_state_sensor: extendedSystemState
                    }
                })
            };

            return {
                ...state,
                tabDetails
            };
        }
        case schemasConstants.FLIP_MACHINE_DETAILS: {
            return {
                ...state,
                machineDetails: {...state.machineDetails, flip: !state.machineDetails.flip}
            }
        }
        case schemasConstants.TOGGLE_MODIFY_PUBLISHED_MODAL: {
            return {
                ...state,
                onSuccessModifyPublishedModal: action.payload.onSuccess,
                schemaToCloneId: action.payload.schemaId,
                showModifyPublishedModal: action.payload.isOpen,
                siteToCloneId: action.payload.siteId,
            }
        }
        case schemasConstants.TOGGLE_PUBLISH_MODAL: {
            return {
                ...state,
                schemaToPublishId: action.payload.schemaId,
                showPublishModal: action.payload.isOpen,
            }
        }
        case schemasConstants.PUBLISH_SCHEMA_SUCCESS: {
            return {
                ...state,
                schemaToPublishId: undefined,
                showPublishModal: false
            }
        }
        case schemasConstants.DELETE_TAB_SUCCESS: {
            return {
                ...state,
                schemaDetails: null
            }
        }
        case schemasConstants.TOGGLE_SHOW_EDITOR_PROMT: {
            return {
                ...state,
                showEditorPromt: action.payload
            }
        }
        case schemasConstants.TOGGLE_SENSOR: {
            onTabSensors = state.onTabSensors.slice();
            const sensorIndex = onTabSensors.indexOf(action.payload);

            if (sensorIndex === -1) {
                onTabSensors.push(action.payload);
            } else {
                onTabSensors.splice(sensorIndex, 1);
            }

            return {
                ...state,
                onTabSensors
            }
        }
        case schemasConstants.GET_LOCATIONS_LIST: {
            return {
                ...state,
                locations: [],
                locationsLoading: true
            }
        }
        case schemasConstants.GET_LOCATIONS_LIST_SUCCESS: {
            return {
                ...state,
                locations: action.payload,
                locationsLoading: false
            }
        }
        case schemasConstants.GET_LOCATIONS_LIST_ERROR: {
            return {
                ...state,
                locationsLoading: false
            }
        }
        case schemasConstants.CLONE_SCHEMA_SUCCESS: {
            return {
                ...state,
                onSuccessModifyPublishedModal: null,
                schemaToCloneId: null,
                showModifyPublishedModal: false,
                siteToCloneId: null,
            }
        }
        case schemasConstants.GET_SCHEMA_NOTIFICATIONS_SUCCESS: {
            return {
                ...state,
                schemaNotifications: action.payload
            }
        }
        case schemasConstants.GET_SENSORS_GRAPH: {
            return {
                ...state,
                sensorsGraphData: [],
                sensorsGraphDataLoading: true
            }
        }
        case schemasConstants.GET_SENSORS_GRAPH_SUCCESS: {
            return {
                ...state,
                sensorsGraphData: action.payload,
                sensorsGraphDataLoading: false
            }
        }
        case schemasConstants.GET_SENSORS_GRAPH_ERROR: {
            return {
                ...state,
                sensorsGraphData: action.payload,
                sensorsGraphDataLoading: false
            }
        }
        case schemasConstants.TOGGLE_FULL_SCREEN: {
            return {
                ...state,
                isFullScreen: action.payload
            }
        }
        case schemasConstants.GET_CURRENT_USER_NOTIFICATIONS_SUCCESS: {
            return {
                ...state,
                currentUserNotifications: action.payload
            }
        }
        case schemasConstants.ON_CURRENT_USER_NOTIFICATION: {
            const currentUserNotifications = state.currentUserNotifications.slice();
            machineDetailsNotifications = state.machineDetailsNotifications.slice();
            machineDetailsMaintenance = state.machineDetailsMaintenance.slice();
            schemaNotifications = state.schemaNotifications.slice();

            if (
                state.machineDetails &&
                state.machineDetails.device_ids.includes(action.payload.device)
            ) {
                const filteredNotifications = action.payload.notifications.filter((notification: any) => {
                    return state.machineDetails.sensors.some((sensorObj: SensorObj) => sensorObj.sensor.id === notification.full_sensor_id) || notification.sensor_id === null;
                });

                if (filteredNotifications.length) {
                    processNotifications(machineDetailsNotifications, filteredNotifications);
                    processNotifications(machineDetailsMaintenance, filteredNotifications, true);
                }
            }

            if (
                state.schemaDetails &&
                state.schemaDetails.device_ids.includes(action.payload.device)
            ) {
                const filteredNotifications = action.payload.notifications.filter((notification: any) => {
                    return state.schemaDetails.schema_tabs.some((schemaTab: TabInList) => schemaTab.sensors_ids.some( (sensorIdObj: any) => {
                            return _.some(sensorIdObj, (obj: any, sensorId: string) => notification.full_sensor_id === sensorId);
                        })
                    ) || notification.sensor_id === null;
                });

                if (filteredNotifications.length) {
                    processNotifications(schemaNotifications, filteredNotifications);
                }
            }

            processNotifications(currentUserNotifications, action.payload.notifications);

            return {
                ...state,
                currentUserNotifications,
                machineDetailsMaintenance,
                machineDetailsNotifications,
                schemaNotifications
            }
        }
        default:
            return state;
    }
};

export default schemasReducer;

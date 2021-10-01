import {SchemaDetails} from "../interfaces/schemasReducer";
import baseService, {WSSeverUrl} from "./baseService";

export function getLocations() {
    return baseService.get("/locations/");
}

export function getSchemasList(params: any) {
    return baseService.get("/schemas/", {params});
}

export function getSchemaDetails(id: number) {
    return id ? baseService.get(`/schemas/${id}/`) : baseService.get(`/schemas/current/`);
}

export function getTabDetails(id: string) {
    return baseService.get(`/tabs/${id}/`);
}

export function getMachineTypesList() {
    return baseService.get("/type-of-machine/");
}

export function searchSensors(params: any) {
    return baseService.get("/search-sensor/", {params: {...params}});
}

export function saveSchemaForm(data: SchemaDetails) {
    return data.id ? baseService.patch(`/schemas/${data.id}/`, data) : baseService.post("/schemas/", data);
}

export function saveTabForm(data: SchemaDetails) {
    return data.id ? baseService.patch(`/tabs/${data.id}/`, data) : baseService.post("/tabs/", data);
}

export function getMachineDetails(id: number) {
    return baseService.get(`/machines/${id}/`);
}

export function getSensorsGraph(sensorId: number) {
    return baseService.get(`/graphs/machine/${sensorId}/`);
}

export function getMachineNotifications(id: number) {
    return baseService.get(`/machines/${id}/notifications/`);
}

export function getMachineLastTimeInAlarm(id: number) {
    return baseService.get(`/machines/${id}/notifications/last-time-in-alarm/`);
}

export function getMachineMaintenance(id: number) {
    return baseService.get(`/machines/${id}/maintenance/`);
}

export function publishSchema(payload: any) {
    return baseService.post(`/schemas/${payload.schemaId}/publish/`, payload.data);
}

export function cloneSchema(id: string, name: string) {
    return baseService.post(`/schemas/${id}/clone/`, {name});
}

export function cloneTab(id: string) {
    return baseService.post(`/tabs/${id}/clone/`);
}

export function deleteSchema(id: string) {
    return baseService.delete(`/schemas/${id}/`);
}

export function changeTabsOrder(orderArray: any) {
    return baseService.post(`/update-tabs-order/`, orderArray);
}

export function deleteTab(id: string) {
    return baseService.delete(`/tabs/${id}/`);
}

export function machineDetailsWS(machineId: string) {
    return new WebSocket(`${WSSeverUrl}ws/machine-devices-data/${machineId}/`);
}

export function tabDetailsWS(tabId: string) {
    return new WebSocket(`${WSSeverUrl}ws/tab-devices-data/${tabId}/`);
}

export function notificationsWS(siteId: string) {
    return new WebSocket(`${WSSeverUrl}ws/location-notifications/${siteId}/`);
}

export function getSchemaNotifications(schemaId: number) {
    return baseService.get(`schemas/${schemaId}/notifications/`);
}

export function getCurrentUserNotifications() {
    return baseService.get(`current-user-notifications/`);
}

export function currentUserWS() {
    return new WebSocket(`${WSSeverUrl}ws/current-user-notifications/`);
}

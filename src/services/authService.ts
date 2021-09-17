import baseService from './baseService';

export function getCurrentUser() {
    return baseService.get('/me/');
}

export function getLayoutSettings() {
    return baseService.get('/layout-settings/');
}

export function getFlatPages() {
    return baseService.get('/get-flatpages/');
}

export function logout() {
    return baseService.post('/rest-auth/logout/');
}
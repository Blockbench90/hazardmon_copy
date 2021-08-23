export enum LoadingStatus {
    LOADED = "LOADED",
    LOADING = "LOADING",
    ERROR = "ERROR",
    NEVER = "NEVER",
    SUCCESS = "SUCCESS",
    WARNING = "WARNING",

    ADD_USER_SUCCESS = "ADD_USER_SUCCESS",
    ADD_USER_ERROR = "ADD_USER_ERROR",
    UPDATED_USER_SUCCESS = "UPDATED_USER_SUCCESS",
    UPDATED_USER_PASSWORD_SUCCESS = "UPDATED_USER_PASSWORD_SUCCESS",
    UPDATED_USER_ERROR = "UPDATED_USER_ERROR",
    ASSIGN_USER_SUCCESS = "ASSIGN_USER_SUCCESS",
    ASSIGN_USER_ERROR = "ASSIGN_USER_ERROR",
    REMOVE_SITE_SUCCESS = "REMOVE_SITE_SUCCESS",
    REMOVE_SITE_ERROR = "REMOVE_SITE_ERROR",
    ACTIVATION_SITE_SUCCESS = "ACTIVATION_SITE_SUCCESS",
    ACTIVATION_SITE_ERROR = "ACTIVATION_SITE_ERROR",

    EDIT_SITE_SUCCESS = "EDIT_SITE_SUCCESS",
    EDIT_SITE_ERROR = "EDIT_SITE_ERROR",
    ADD_SITE_SUCCESS = "ADD_SITE_SUCCESS",
    ADD_SITE_ERROR = "ADD_SITE_ERROR",
    SELECT_SITE_SUCCESS = "SELECT_SITE_SUCCESS",
    SELECT_SITE_ERROR = "SELECT_SITE_ERROR",

    ADD_DEVICE_SUCCESS = "ADD_DEVICE_SUCCESS",
    ADD_DEVICE_ERROR = "ADD_DEVICE_ERROR",
    UPDATE_DEVICE_SUCCESS = "UPDATE_DEVICE_SUCCESS",
    UPDATE_DEVICE_ERROR = "UPDATE_DEVICE_ERROR",
    REMOVE_DEVICE_SUCCESS = "REMOVE_DEVICE_SUCCESS",
    REMOVE_DEVICE_ERROR = "REMOVE_DEVICE_ERROR",
    ACTIVATION_DEVICE_SUCCESS = "ACTIVATION_DEVICE_SUCCESS",
    EXPORT_NOTIFICATIONS_WITHOUT_DATE = "EXPORT_NOTIFICATIONS_WITHOUT_DATE",
    ACTIVATION_DEVICE_ERROR = "ACTIVATION_DEVICE_ERROR",
    SELECT_DEVICE_SUCCESS = "SELECT_DEVICE_SUCCESS",


    ADD_CLIENT_SUCCESS = "ADD_CLIENT_SUCCESS",
    ADD_CLIENT_ERROR = "ADD_CLIENT_ERROR",
    REMOVE_CLIENT_SUCCESS = "REMOVE_CLIENT_SUCCESS",
    REMOVE_CLIENT_ERROR = "REMOVE_CLIENT_ERROR",
    SELECT_CLIENT_ERROR = "SELECT_CLIENT_ERROR",
    UPDATE_CLIENT_SUCCESS = "UPDATE_CLIENT_SUCCESS",
    UPDATE_CLIENT_ERROR = "UPDATE_CLIENT_ERROR",

    FETCH_GRAPHS_SUCCESS = "FETCH_GRAPHS_SUCCESS",
    FETCH_GRAPHS_ERROR = "FETCH_GRAPHS_ERROR",
    FETCH_GRAPHS_TIME_ERROR = "FETCH_GRAPHS_TIME_ERROR",
    WITHOUT_SELECTED_DEVICE_GRAPHS_ERROR = "WITHOUT_SELECTED_DEVICE_GRAPHS_ERROR",

    FETCH_SENSORS_SUCCESS = "FETCH_SENSORS_SUCCESS",
    FETCH_SENSORS_ERROR = "FETCH_SENSORS_ERROR",
    FETCH_SENSORS_NAMES_SUCCESS = "FETCH_SENSORS_NAMES_SUCCESS",
    FETCH_SENSORS_NAMES_ERROR = "FETCH_SENSORS_NAMES_ERROR",
    FETCH_SENSORS_WITHOUT_DEVICE = "FETCH_SENSORS_WITHOUT_DEVICE",
    FETCH_SENSORS_HISTORICAL_DATE = "FETCH_SENSORS_HISTORICAL_DATE",

    FETCH_ANALYTICS_ERROR = "FETCH_ANALYTICS_ERROR",
    FETCH_ANALYTICS_WITHOUT_DEVICE = "FETCH_ANALYTICS_WITHOUT_DEVICE",
}

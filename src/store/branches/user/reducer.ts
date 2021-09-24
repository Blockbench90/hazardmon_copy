import produce, {Draft} from "immer";
import {LoadingStatus} from "../../status";
import {UserActions} from "./actionCreators";
import {UserAT} from "./actionTypes";
import {UserState} from "./stateTypes";

const initialUserState: UserState = {
    userData: undefined,
    auth_key: null,
    notifications: {results: [], count: 0},
    headerNotificationCount: null,
    ws_notify: {device: null, location: null, notifications: []},
    email_notifications: null,
    current_email_notification: null,
    isApply: true,
    status: LoadingStatus.NEVER,
    registerStatus: LoadingStatus.NEVER,
    notificationsFilter: {isActive: true},
};

export const userReducer = produce((draft: Draft<UserState>, action: UserActions) => {
    switch (action.type) {
        case UserAT.SET_USER_DATA:
            draft.userData = action.payload;
            draft.status = LoadingStatus.SUCCESS;
            break;

        case UserAT.SET_NOTIFICATIONS:
            draft.notifications = action.payload;
            draft.status = LoadingStatus.SUCCESS;
            break;

        case UserAT.SET_HEADER_NOTIFICATIONS:
            // @ts-ignore
            draft.headerNotificationCount = action.payload;
            draft.status = LoadingStatus.SUCCESS;
            break;

        case UserAT.SET_IS_APPLY_NOTIFICATIONS:
            draft.isApply = action.payload;
            break;

        case UserAT.SET_USER_AUTH_KEY:
            draft.auth_key = action.payload;
            draft.status = LoadingStatus.SUCCESS;
            break;

        case UserAT.SET_LOADING_STATE:
            draft.status = action.payload;
            break;

        case UserAT.SET_REGISTER_STATUS:
            draft.registerStatus = action.payload;
            break;

        case UserAT.LOG_OUT:
            draft.status = LoadingStatus.NEVER;
            draft.userData = undefined;
            draft.auth_key = null;
            break;

        case UserAT.SET_EMAIL_NOTIFICATIONS:
            draft.status = LoadingStatus.LOADED;
            draft.email_notifications = action.payload;
            break;

        case UserAT.SET_NOTIFICATIONS_FILTER:
            draft.notificationsFilter.isActive = action.payload.isActive;
            break;

        case UserAT.SET_WS_NOTIFICATION:
            draft.ws_notify = action.payload;
            break;

        case UserAT.SET_CURRENT_EMAIL_NOTIFICATIONS:
            draft.current_email_notification = action.payload;
            draft.status = LoadingStatus.LOADED;
            break;

        default:
            break;
    }
}, initialUserState);

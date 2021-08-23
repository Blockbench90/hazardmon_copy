import {RootState} from "../../store";
import {UserState} from "./stateTypes";

export const selectUserState = (state: RootState): UserState => state.user;

export const selectUserData = (state: RootState): UserState["userData"] =>
    selectUserState(state).userData;

export const selectUserAuthKey = (state: RootState): UserState["auth_key"] =>
    selectUserState(state).auth_key;

export const selectUserStatus = (state: RootState): UserState["status"] =>
    selectUserState(state).status;

export const selectWsNotifications = (state: RootState): UserState["ws_notify"] =>
    selectUserState(state).ws_notify;

export const selectNotifications = (state: RootState): UserState["notifications"] =>
    selectUserState(state).notifications;

export const selectHeaderNotifications = (state: RootState): UserState["notifications"] =>
    selectUserState(state).headerNotifications;

export const selectRegisterStatus = (state: RootState): UserState["registerStatus"] =>
    selectUserState(state).registerStatus;

export const selectIsApplyNotifications = (state: RootState): UserState["isApply"] =>
    selectUserState(state).isApply;

export const selectUserRoleVisualDashboard = (state: RootState): UserState["userData"]["visual_dashboard_enabled"] =>
    selectUserState(state)?.userData?.visual_dashboard_enabled;

export const selectNotificationsFilter = (state: RootState) => selectUserState(state).notificationsFilter;

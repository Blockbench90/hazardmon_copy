import {Action} from "redux";
import {
    ChangePassword,
    EmailNotification,
    IWsNotify,
    oem_setting,
    SearchValues,
    support_contacts,
    User,
    UserState,
} from "./stateTypes";
import {LoadingStatus} from "../../status";
import {LoginValues} from "../../../components/LoginBlock";
import {RegisterValues} from "../../../components/RegisterBlock";

export enum UserAT {
    SET_USER_DATA = "user/SET_USER_DATA",
    SET_USER_AUTH_KEY = "user/SET_USER_AUTH_KEY",
    FETCH_SIGN_IN = "user/FETCH_SIGN_IN",
    RESET_PASSWORD = "user/RESET_PASSWORD",
    SET_NOTIFICATIONS = "user/SET_NOTIFICATIONS",
    SET_HEADER_NOTIFICATIONS = "user/SET_HEADER_NOTIFICATIONS",
    SET_IS_APPLY_NOTIFICATIONS = "user/SET_IS_APPLY_NOTIFICATIONS",
    SET_NOTIFICATIONS_FILTER = "user/SET_NOTIFICATIONS_FILTER",
    FETCH_HEADER_NOTIFICATIONS_COUNT = "user/FETCH_HEADER_NOTIFICATIONS_COUNT",
    SEARCH_NOTIFICATIONS = "user/SEARCH_NOTIFICATIONS",
    FETCH_USER_DATA = "user/FETCH_USER_DATA",
    SIGN_UP = "user/SIGN_UP",
    LOG_OUT = "user/LOG_OUT",
    SET_LOADING_STATE = "user/SET_LOADING_STATE",
    SET_REGISTER_STATUS = "user/SET_REGISTER_STATUS",
    UPDATE_USER_DATA = "user/UPDATE_USER_DATA",
    UPDATE_USER_PASSWORD = "user/UPDATE_USER_PASSWORD",
    FETCH_WS_NOTIFICATION = "user/FETCH_WS_NOTIFICATION",
    SET_WS_NOTIFICATION = "user/SET_WS_NOTIFICATION",
    FETCH_EMAIL_NOTIFICATIONS = "user/FETCH_EMAIL_NOTIFICATIONS",
    SET_EMAIL_NOTIFICATIONS = "user/SET_EMAIL_NOTIFICATIONS",
    ADD_EMAIL_NOTIFICATION = "user/ADD_EMAIL_NOTIFICATION",
    FETCH_CURRENT_EMAIL_NOTIFICATIONS = "user/FETCH_CURRENT_EMAIL_NOTIFICATIONS",
    SET_CURRENT_EMAIL_NOTIFICATIONS = "user/SET_CURRENT_EMAIL_NOTIFICATIONS",
    UPDATE_CURRENT_EMAIL_NOTIFICATION = "user/UPDATE_CURRENT_EMAIL_NOTIFICATION",
    REMOVE_CURRENT_EMAIL_NOTIFICATION = "user/REMOVE_CURRENT_EMAIL_NOTIFICATION",
    SEND_FEEDBACK = "user/SEND_FEEDBACK",
    FETCH_OEM_SETTINGS = "user/FETCH_OEM_SETTINGS",
    SET_OEM_SETTINGS = "user/SET_OEM_SETTINGS",
    ADD_OEM_SETTING = "user/ADD_OEM_SETTING",
    FETCH_SUPPORT_CONTACTS = "user/FETCH_SUPPORT_CONTACTS",
    SET_SUPPORT_CONTACTS = "user/SET_SUPPORT_CONTACTS",
    ADD_SUPPORT_CONTACT = "user/ADD_SUPPORT_CONTACT",

}


export interface SignInAI extends Action<UserAT> {
    type: UserAT.FETCH_SIGN_IN;
    payload: LoginValues;
}

export interface SignUpAI extends Action<UserAT> {
    type: UserAT.SIGN_UP;
    payload: RegisterValues;
}

export interface LogOutAI extends Action<UserAT> {
    type: UserAT.LOG_OUT;
}

export interface FetchUserDataAI extends Action<UserAT> {
    type: UserAT.FETCH_USER_DATA;
}

export interface SetNotificationsFilterAI extends Action<UserAT> {
    type: UserAT.SET_NOTIFICATIONS_FILTER;
    payload: { isActive: boolean };
}

export interface ResetPasswordAI extends Action<UserAT> {
    type: UserAT.RESET_PASSWORD;
    payload: string;
}

export interface FetchHeaderNotificationsAI extends Action<UserAT> {
    type: UserAT.FETCH_HEADER_NOTIFICATIONS_COUNT;
}

export interface FetchEmailNotificationsAI extends Action<UserAT> {
    type: UserAT.FETCH_EMAIL_NOTIFICATIONS;
}

export interface SetEmailNotificationsAI extends Action<UserAT> {
    type: UserAT.SET_EMAIL_NOTIFICATIONS;
    payload: any;
}

export interface AddEmailNotificationAI extends Action<UserAT> {
    type: UserAT.ADD_EMAIL_NOTIFICATION;
    payload: any;
}

export interface FetchCurrentEmailNotification extends Action<UserAT> {
    type: UserAT.FETCH_CURRENT_EMAIL_NOTIFICATIONS
    payload: any
}

export interface SetCurrentEmailNotification extends Action<UserAT> {
    type: UserAT.SET_CURRENT_EMAIL_NOTIFICATIONS
    payload: EmailNotification
}

export interface UpdateCurrentEmailNotification extends Action<UserAT> {
    type: UserAT.UPDATE_CURRENT_EMAIL_NOTIFICATION
    payload: { id: number, data: EmailNotification }
}

export interface RemoveCurrentEmailNotification extends Action<UserAT> {
    type: UserAT.REMOVE_CURRENT_EMAIL_NOTIFICATION
    payload: number
}

export interface SearchNotificationsAI extends Action<UserAT> {
    type: UserAT.SEARCH_NOTIFICATIONS;
    payload: SearchValues;
}

export interface SetUserDataAI extends Action<UserAT> {
    type: UserAT.SET_USER_DATA;
    payload: User;
}

export interface SetNotificationsAI extends Action<UserAT> {
    type: UserAT.SET_NOTIFICATIONS;
    payload: UserState["notifications"];
}

export interface SetHeaderNotificationsAI extends Action<UserAT> {
    type: UserAT.SET_HEADER_NOTIFICATIONS;
    payload: number;
}


export interface SetIsApplyNotificationsAI extends Action<UserAT> {
    type: UserAT.SET_IS_APPLY_NOTIFICATIONS;
    payload: boolean;
}

export interface SetUserAuthKeyAI extends Action<UserAT> {
    type: UserAT.SET_USER_AUTH_KEY;
    payload: string | null;
}

export interface SetUserLoadingStatusAI extends Action<UserAT> {
    type: UserAT.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export interface SetUserRegisterStatusAI extends Action<UserAT> {
    type: UserAT.SET_REGISTER_STATUS;
    payload: LoadingStatus;
}

export interface UpdateUserDataAI extends Action<UserAT> {
    type: UserAT.UPDATE_USER_DATA;
    payload: any;
}

export interface UpdateUserPasswordAI extends Action<UserAT> {
    type: UserAT.UPDATE_USER_PASSWORD;
    payload: ChangePassword;
}

export interface ToggleWsNotificationAI extends Action<UserAT> {
    type: UserAT.FETCH_WS_NOTIFICATION;
    payload: { isOpen: boolean, path?: string, device_udf_id?: string };
}

export interface SetWsNotificationAI extends Action<UserAT> {
    type: UserAT.SET_WS_NOTIFICATION;
    payload: IWsNotify;
}

export interface SendFeedbackAI extends Action<UserAT> {
    type: UserAT.SEND_FEEDBACK;
    payload: {about: string, text: string};
}

export interface FetchOEMSettingsAI extends Action<UserAT> {
    type: UserAT.FETCH_OEM_SETTINGS;
}

export interface SetOEMSettingsAI extends Action<UserAT> {
    type: UserAT.SET_OEM_SETTINGS;
    payload: oem_setting[];
}

export interface AddOEMSettingAI extends Action<UserAT> {
    type: UserAT.ADD_OEM_SETTING;
    payload: oem_setting[];
}

export interface FetchSupportContactsAI extends Action<UserAT> {
    type: UserAT.FETCH_SUPPORT_CONTACTS;
}

export interface SetSupportContactsAI extends Action<UserAT> {
    type: UserAT.SET_SUPPORT_CONTACTS;
    payload: support_contacts
}

export interface AddSupportContactAI extends Action<UserAT> {
    type: UserAT.ADD_SUPPORT_CONTACT;
    payload: support_contacts
}



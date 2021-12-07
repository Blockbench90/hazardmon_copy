import {
    AddEmailNotificationAI, AddOEMSettingAI, AddSupportContactAI,
    FetchCurrentEmailNotification,
    FetchEmailNotificationsAI,
    FetchHeaderNotificationsAI, FetchOEMSettingsAI, FetchSupportContactsAI,
    FetchUserDataAI,
    LogOutAI, RemoveCurrentEmailNotification,
    ResetPasswordAI,
    SearchNotificationsAI, SendFeedbackAI, SetCurrentEmailNotification,
    SetEmailNotificationsAI,
    SetHeaderNotificationsAI,
    SetIsApplyNotificationsAI,
    SetNotificationsAI,
    SetNotificationsFilterAI, SetOEMSettingsAI, SetSupportContactsAI,
    SetUserAuthKeyAI,
    SetUserDataAI,
    SetUserLoadingStatusAI,
    SetUserRegisterStatusAI,
    SetWsNotificationAI,
    SignInAI,
    SignUpAI,
    ToggleWsNotificationAI, UpdateCurrentEmailNotification,
    UpdateUserDataAI,
    UpdateUserPasswordAI,
    UserAT,
} from "./actionTypes";
import {ChangePassword, EmailNotification, IWsNotify, SearchValues, User, UserState} from "./stateTypes";
import {LoginValues} from "../../../components/LoginBlock";
import {RegisterValues} from "../../../components/RegisterBlock";


export const userAC = {

    fetchUserData: (): FetchUserDataAI => ({
        type: UserAT.FETCH_USER_DATA,
    }),

    setNotificationsFilter: (isActive: boolean): SetNotificationsFilterAI => ({
        type: UserAT.SET_NOTIFICATIONS_FILTER,
        payload: {isActive},
    }),

    resetPassword: (payload: string): ResetPasswordAI => ({
        type: UserAT.RESET_PASSWORD,
        payload,
    }),

    searchNotifications: (payload: SearchValues): SearchNotificationsAI => ({
        type: UserAT.SEARCH_NOTIFICATIONS,
        payload,
    }),

    signIn: (payload: LoginValues): SignInAI => ({
        type: UserAT.FETCH_SIGN_IN,
        payload,
    }),

    signUp: (payload: RegisterValues): SignUpAI => ({
        type: UserAT.SIGN_UP,
        payload,
    }),

    logOut: (): LogOutAI => ({
        type: UserAT.LOG_OUT,
    }),

    setUserData: (payload: User): SetUserDataAI => ({
        type: UserAT.SET_USER_DATA,
        payload,
    }),

    setNotifications: (payload: UserState["notifications"]): SetNotificationsAI => ({
        type: UserAT.SET_NOTIFICATIONS,
        payload,
    }),

    fetchHeaderNotificationCount: (): FetchHeaderNotificationsAI => ({
        type: UserAT.FETCH_HEADER_NOTIFICATIONS_COUNT,
    }),

    setHeaderNotificationCount: (payload: number) => ({
        type: UserAT.SET_HEADER_NOTIFICATIONS,
        payload,
    }),

    // setCurrentEmailNotifications: (payload: any) => ({
    //     type: UserAT.,
    //     payload,
    // }),
    setIsApplyNotifications: (payload: boolean): SetIsApplyNotificationsAI => ({
        type: UserAT.SET_IS_APPLY_NOTIFICATIONS,
        payload,
    }),

    setAuthKey: (payload: UserState["auth_key"]): SetUserAuthKeyAI => ({
        type: UserAT.SET_USER_AUTH_KEY,
        payload,
    }),

    setUserLoadingStatus: (payload: UserState["status"]): SetUserLoadingStatusAI => ({
        type: UserAT.SET_LOADING_STATE,
        payload,
    }),

    setUserRegisterStatus: (payload: UserState["registerStatus"]): SetUserRegisterStatusAI => ({
        type: UserAT.SET_REGISTER_STATUS,
        payload,
    }),

    updateUserData: (payload: any): UpdateUserDataAI => ({
        type: UserAT.UPDATE_USER_DATA,
        payload,
    }),

    updateUserPassword: (payload: ChangePassword): UpdateUserPasswordAI => ({
        type: UserAT.UPDATE_USER_PASSWORD,
        payload,
    }),

    toggleWsNotifications: (payload: { isOpen: boolean, path?: string, device_udf_id?: string }): ToggleWsNotificationAI => ({
        type: UserAT.FETCH_WS_NOTIFICATION,
        payload,
    }),

    setWsNotifications: (payload: IWsNotify): SetWsNotificationAI => ({
        type: UserAT.SET_WS_NOTIFICATION,
        payload,
    }),

    fetchEmailNotifications: (): FetchEmailNotificationsAI => ({
        type: UserAT.FETCH_EMAIL_NOTIFICATIONS,
    }),

    setEmailNotifications: (payload: any): SetEmailNotificationsAI => ({
        type: UserAT.SET_EMAIL_NOTIFICATIONS,
        payload,
    }),

    addEmailNotifications: (payload: any): AddEmailNotificationAI => ({
        type: UserAT.ADD_EMAIL_NOTIFICATION,
        payload,
    }),

    fetchCurrentEmailNotification: (payload: number): FetchCurrentEmailNotification => ({
        type: UserAT.FETCH_CURRENT_EMAIL_NOTIFICATIONS,
        payload,
    }),
    updateCurrentEmailNotification: (payload: { id: number, data: any }): UpdateCurrentEmailNotification => ({
        type: UserAT.UPDATE_CURRENT_EMAIL_NOTIFICATION,
        payload,
    }),
    removeCurrentEmailNotification: (payload: number): RemoveCurrentEmailNotification => ({
        type: UserAT.REMOVE_CURRENT_EMAIL_NOTIFICATION,
        payload,
    }),
    setCurrentEmailNotification: (payload: EmailNotification): SetCurrentEmailNotification => ({
        type: UserAT.SET_CURRENT_EMAIL_NOTIFICATIONS,
        payload,
    }),
    sendFeedback: (payload: { about: string, text: string }): SendFeedbackAI => ({
        type: UserAT.SEND_FEEDBACK,
        payload,
    }),
    fetchOEMSettings: (): FetchOEMSettingsAI => ({
        type: UserAT.FETCH_OEM_SETTINGS,
    }),
    setOEMSettings: (payload): SetOEMSettingsAI => ({
        type: UserAT.SET_OEM_SETTINGS,
        payload,
    }),
    addOEMSetting: (payload): AddOEMSettingAI => ({
        type: UserAT.ADD_OEM_SETTING,
        payload,
    }),
    fetchSupportContacts: (): FetchSupportContactsAI => ({
        type: UserAT.FETCH_SUPPORT_CONTACTS,
    }),
    setSupportContacts: (payload): SetSupportContactsAI => ({
        type: UserAT.SET_SUPPORT_CONTACTS,
        payload,
    }),
    addSupportContact: (payload): AddSupportContactAI => ({
        type: UserAT.ADD_SUPPORT_CONTACT,
        payload,
    }),
};

export type UserActions =
    FetchUserDataAI
    | SetNotificationsFilterAI
    | SetHeaderNotificationsAI
    | FetchHeaderNotificationsAI
    | SetUserDataAI
    | SetNotificationsAI
    | SetIsApplyNotificationsAI
    | SetUserLoadingStatusAI
    | SignUpAI
    | LogOutAI
    | SetUserAuthKeyAI
    | UpdateUserDataAI
    | UpdateUserPasswordAI
    | SetUserRegisterStatusAI
    | ToggleWsNotificationAI
    | SetWsNotificationAI
    | FetchEmailNotificationsAI
    | SetEmailNotificationsAI
    | AddEmailNotificationAI
    | FetchCurrentEmailNotification
    | SetCurrentEmailNotification
    | UpdateCurrentEmailNotification
    | RemoveCurrentEmailNotification
    | SendFeedbackAI
    | FetchOEMSettingsAI
    | SetOEMSettingsAI
    | AddOEMSettingAI
    | FetchSupportContactsAI
    | SetSupportContactsAI
    | AddSupportContactAI
    | ResetPasswordAI

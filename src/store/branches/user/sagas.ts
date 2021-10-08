import {call, put, take, takeLatest} from "redux-saga/effects";
import {UserApi} from "../../../services/api/userApi";
import {WinStorage} from "../../../services/AuthSrorage";
import {LoadingStatus} from "../../status";
import {eventChannel} from "redux-saga";
import {userAC} from "./actionCreators";
import {
    AddEmailNotificationAI, AddOEMSettingAI, AddSupportContactAI,
    FetchCurrentEmailNotification,
    RemoveCurrentEmailNotification,
    SearchNotificationsAI, SendFeedbackAI,
    SignInAI,
    SignUpAI,
    ToggleWsNotificationAI,
    UpdateCurrentEmailNotification,
    UpdateUserDataAI,
    UpdateUserPasswordAI,
    UserAT,
} from "./actionTypes";
import history from "../../../helpers/history";
import {registration} from "../../../services/api/userRegistranitonApi";
import {SitesApi} from "../../../services/api/sitesApi";
import {sitesAC} from "../sites/actionCreators";


export function* fetchUserDataRequest() {
    try {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.LOADING));
        const data = yield call(UserApi.me);
        const token = WinStorage.getToken();
        if (token && data) {
            yield put(userAC.setAuthKey(token));
            yield put(userAC.setUserData(data));
        }
        if (!data) {
            yield call(LogOutRequest);
            yield put(userAC.setUserLoadingStatus(LoadingStatus.NEVER));
        }
    } catch (error) {
        history.push("/");
        WinStorage.removeToken();
        yield put(userAC.setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchNotificationsCountRequest() {
    try {
        const count = yield call(UserApi.getNotificationsCount);
        if (count) {
            yield put(userAC.setHeaderNotificationCount(count));
        } else {
            yield put(userAC.setUserLoadingStatus(LoadingStatus.ERROR));
        }
    } catch (error) {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* searchNotificationsRequest({payload}: SearchNotificationsAI) {
    try {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.LOADING));
        const data = yield call(UserApi.searchNotifications, payload);
        if (data.status === 200) {
            yield put(userAC.setNotifications(data.data));
        } else {
            yield put(userAC.setUserLoadingStatus(LoadingStatus.EXPORT_NOTIFICATIONS_ERROR));
            yield put(userAC.setUserLoadingStatus(LoadingStatus.ERROR));
        }
    } catch (error) {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* LoginRequest({payload}: SignInAI) {
    try {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.LOADING));
        const data = yield call(UserApi.signIn, payload);
        WinStorage.setToken(data.token);
        yield put(userAC.setAuthKey(data.token));
        yield put(userAC.fetchUserData());
    } catch (error) {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* RegisterRequest({payload}: SignUpAI) {
    try {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.LOADING));
        const data = yield call(registration, payload);
        if (data.status === 201) {
            yield put(userAC.setUserRegisterStatus(LoadingStatus.SUCCESS));
            yield put(userAC.setUserLoadingStatus(LoadingStatus.LOADED));
        } else {
            yield put(userAC.setUserRegisterStatus(LoadingStatus.ERROR));
            yield put(userAC.setUserLoadingStatus(LoadingStatus.LOADED));
        }
    } catch (error) {
        yield put(userAC.setUserRegisterStatus(LoadingStatus.ERROR));
        yield put(userAC.setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateUserDataRequest({payload}: UpdateUserDataAI) {
    try {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.LOADING));
        const status = yield call(UserApi.updateUser, payload);
        if (status === 200) {
            yield call(fetchUserDataRequest);
            history.push("/sites");
            yield put(userAC.setUserLoadingStatus(LoadingStatus.UPDATED_USER_SUCCESS));
        } else {
            yield put(userAC.setUserLoadingStatus(LoadingStatus.UPDATED_USER_ERROR));
        }
    } catch (error) {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.UPDATED_USER_ERROR));
    }
}

export function* updateUserPasswordRequest({payload}: UpdateUserPasswordAI) {
    try {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.LOADING));
        const status = yield call(UserApi.updateUserPassword, payload);
        if (status === 201) {
            yield call(fetchUserDataRequest);
            yield put(userAC.setUserLoadingStatus(LoadingStatus.UPDATED_USER_PASSWORD_SUCCESS));
            history.push("/sites");
        } else {
            yield put(userAC.setUserLoadingStatus(LoadingStatus.UPDATED_USER_ERROR));
        }
    } catch (error) {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.UPDATED_USER_ERROR));
    }
}

export function* LogOutRequest() {
    try {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.LOADING));
        history.push("/");
        yield call(UserApi.logout);
        WinStorage.removeToken();
        yield put(userAC.setUserLoadingStatus(LoadingStatus.SUCCESS));
    } catch (error) {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchEmailNotificationsRequest() {
    try {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.LOADING));
        const data = yield call(UserApi.getEmailNotifications);
        if (data.status === 200) {
            const selectSites = yield call(SitesApi.getSites);
            yield put(sitesAC.setSites(selectSites));
            yield put(userAC.setEmailNotifications(data.data.results));
        } else {
            yield put(userAC.setUserLoadingStatus(LoadingStatus.ERROR));
        }
    } catch (error) {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* addEmailNotificationRequest({payload}: AddEmailNotificationAI) {
    try {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.LOADING));
        const data = yield call(UserApi.addEmailNotification, payload);
        if (data.status === 201) {
            history.push("/user/setting/notification");
        } else {
            yield put(userAC.setUserLoadingStatus(LoadingStatus.UPDATED_USER_ERROR));
        }
    } catch (error) {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateEmailNotificationRequest({payload}: UpdateCurrentEmailNotification) {
    try {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.LOADING));
        const data = yield call(UserApi.updateEmailNotification, payload);
        if (data.status === 200) {
            history.push("/user/setting/notification");
            yield put(userAC.setUserLoadingStatus(LoadingStatus.LOADED));
        } else {
            yield put(userAC.setUserLoadingStatus(LoadingStatus.UPDATED_USER_ERROR));
        }
    } catch (error) {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* removeEmailNotificationRequest({payload}: RemoveCurrentEmailNotification) {
    try {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.LOADING));
        const data = yield call(UserApi.removeEmailNotification, payload);
        if (data.status === 204) {
            history.push("/user/setting/notification");
            yield put(userAC.setUserLoadingStatus(LoadingStatus.LOADED));
        } else {
            yield put(userAC.setUserLoadingStatus(LoadingStatus.UPDATED_USER_ERROR));
        }
    } catch (error) {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function toggleNotificationSocket(path: string, device_udf_id?: string) {
    return eventChannel((emitter: any) => {
        const ws: any = new WebSocket(`${process.env.REACT_APP_WS_SERVER_URL}${path}`);
        const token = window.localStorage.getItem("_token");
        
        const authCmd = {
            cmd: "auth",
            token: token,
        };

        ws.onopen = (event: any) => {
            ws.send(
                JSON.stringify(authCmd),
            );
            console.log("WS open! Event:", event);
        };

        ws.onerror = (error: any) => {
            console.log("WebSocket error " + error);
            console.dir(error);
        };

        ws.onmessage = (e: any) => {
            let message = null;
            try {
                message = JSON.parse(e.data);
            } catch (e) {
                // @ts-ignore
                console.error(`Error parsing : ${e.data}`);
            }
            if (message.notifications.length > 0) {
                return emitter({type: UserAT.SET_WS_NOTIFICATION, payload: message});
            }
        };

        return () => {
            console.log(`Socket off`);
            if (ws) {
                ws.close();
            }
        };
    });
}

let wsNotificationsChannel: any = null;

export function* runNotificationsSocket({payload}: ToggleWsNotificationAI) {
    if (payload.isOpen) {
        wsNotificationsChannel = yield call(toggleNotificationSocket, payload.path);
        while (true) {
            const action = yield take(wsNotificationsChannel);
            yield put(action);
        }
    } else {
        if (wsNotificationsChannel) {
            wsNotificationsChannel.close();
        }
    }
}


export function* fetchCurrentEmailNotificationsRequest({payload}: FetchCurrentEmailNotification) {
    try {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.LOADING));
        const data = yield call(UserApi.getCurrentEmailNotification, payload);
        if (data.status === 200) {
            yield put(userAC.setCurrentEmailNotification(data.data));
            history.push(`/user/setting/add/notification/${payload}`);
        }
    } catch (error) {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* sendFeedbackRequest({payload}: SendFeedbackAI) {
    try {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.LOADING));
        const status = yield call(UserApi.sendFeedback, payload);
        console.log("status ==>", status)
        if (status === 201) {
            history.push("/");
            yield put(userAC.setUserLoadingStatus(LoadingStatus.SEND_FEEDBACK_SUCCESS));
        } else {
            yield put(userAC.setUserLoadingStatus(LoadingStatus.SEND_FEEDBACK_ERROR));
        }
    } catch (error) {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchOEMSettingsRequest() {
    try {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.LOADING));
        const data = yield call(UserApi.getOEMSettings);
        if (data) {
            yield put(userAC.setOEMSettings(data.results));
        } else {
            yield put(userAC.setUserLoadingStatus(LoadingStatus.ERROR));
        }
    } catch (error) {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchSupportContactsRequest() {
    try {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.LOADING));
        const data = yield call(UserApi.getSupportContacts);
        if (data) {
            yield put(userAC.setSupportContacts(data));
        } else {
            yield put(userAC.setUserLoadingStatus(LoadingStatus.ERROR));
        }
    } catch (error) {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* addOEMSettingsRequest({payload}: AddOEMSettingAI ) {
    try {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.LOADING));
        const status = yield call(UserApi.addOEMSettings, payload);
        if (status === 201) {
            yield call(fetchOEMSettingsRequest);
        } else {
            yield put(userAC.setUserLoadingStatus(LoadingStatus.ERROR));
        }
    } catch (error) {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.ERROR));
    }
}


export function* addSupportContactsRequest({payload}: AddSupportContactAI ) {
    try {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.LOADING));
        const data = yield call(UserApi.addSupportContacts, payload);
        if (data) {
            yield put(userAC.setSupportContacts(data));
        } else {
            yield put(userAC.setUserLoadingStatus(LoadingStatus.ERROR));
        }
    } catch (error) {
        yield put(userAC.setUserLoadingStatus(LoadingStatus.ERROR));
    }
}


export function* userSaga() {
    yield takeLatest(UserAT.FETCH_SIGN_IN, LoginRequest);
    yield takeLatest(UserAT.SIGN_UP, RegisterRequest);
    yield takeLatest(UserAT.LOG_OUT, LogOutRequest);
    yield takeLatest(UserAT.FETCH_USER_DATA, fetchUserDataRequest);
    yield takeLatest(UserAT.FETCH_HEADER_NOTIFICATIONS_COUNT, fetchNotificationsCountRequest);
    yield takeLatest(UserAT.SEARCH_NOTIFICATIONS, searchNotificationsRequest);
    yield takeLatest(UserAT.UPDATE_USER_DATA, updateUserDataRequest);
    yield takeLatest(UserAT.UPDATE_USER_PASSWORD, updateUserPasswordRequest);
    yield takeLatest(UserAT.FETCH_WS_NOTIFICATION, runNotificationsSocket);
    yield takeLatest(UserAT.FETCH_EMAIL_NOTIFICATIONS, fetchEmailNotificationsRequest);
    yield takeLatest(UserAT.FETCH_CURRENT_EMAIL_NOTIFICATIONS, fetchCurrentEmailNotificationsRequest);
    yield takeLatest(UserAT.ADD_EMAIL_NOTIFICATION, addEmailNotificationRequest);
    yield takeLatest(UserAT.UPDATE_CURRENT_EMAIL_NOTIFICATION, updateEmailNotificationRequest);
    yield takeLatest(UserAT.REMOVE_CURRENT_EMAIL_NOTIFICATION, removeEmailNotificationRequest);
    yield takeLatest(UserAT.SEND_FEEDBACK, sendFeedbackRequest);
    yield takeLatest(UserAT.FETCH_OEM_SETTINGS, fetchOEMSettingsRequest);
    yield takeLatest(UserAT.FETCH_SUPPORT_CONTACTS, fetchSupportContactsRequest);
    yield takeLatest(UserAT.ADD_OEM_SETTING, addOEMSettingsRequest);
    yield takeLatest(UserAT.ADD_SUPPORT_CONTACT, addSupportContactsRequest);
}

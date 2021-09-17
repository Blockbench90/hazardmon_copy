import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "antd";

import {LoadingStatus} from "../../store/status";
import {userAC} from "../../store/branches/user/actionCreators";
import {WinStorage} from "../../services/AuthSrorage";
import {selectUserState} from "../../store/selectors";

import classes from "./Alert.module.scss";


type AlertNotification = "success" | "info" | "warning" | "error"

const UserAlert = () => {
    const {status} = useSelector(selectUserState);
    const dispatch = useDispatch();
    const errorMessage = WinStorage.getErrorMessage();

    const setTimer = () => {
        setTimeout(() => {
            dispatch(userAC.setUserLoadingStatus(LoadingStatus.NEVER));
            WinStorage.removeErrorMessage();
        }, 5000);
    };

    const alertNotification = (message: typeof errorMessage | string, type: AlertNotification) => {
        return <Alert
            message={message}
            type={type}
            showIcon
            closable
            className={classes.alert}
        />;
    };

    if (status === LoadingStatus.ADD_USER_SUCCESS) {
        setTimer();
        return alertNotification(errorMessage || "User added successfully", "success");
    }

    if (status === LoadingStatus.ADD_USER_ERROR) {
        setTimer();
        return alertNotification(errorMessage || "The email address is already registered.", "warning");
    }

    if (status === LoadingStatus.UPDATED_USER_SUCCESS) {
        setTimer();
        return alertNotification(errorMessage || "User update successfully", "success");
    }

    if (status === LoadingStatus.UPDATED_USER_PASSWORD_SUCCESS) {
        setTimer();
        return alertNotification(errorMessage || "New password has been saved", "success");
    }

    if (status === LoadingStatus.UPDATED_USER_ERROR) {
        setTimer();
        return alertNotification(errorMessage || "An error occured, please try again!", "warning");
    }

    if (status === LoadingStatus.ADD_EMAIL_NOTIFICATION_WITHOUT_DEVICE_ERROR) {
        setTimer();
        return alertNotification(errorMessage || "Please select All Devices or select one of devices!", "warning");
    }

    return null;
};
export default UserAlert;

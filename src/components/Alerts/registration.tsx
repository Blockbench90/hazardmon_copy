import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "antd";

import {LoadingStatus} from "../../store/status";
import {userAC} from "../../store/branches/user/actionCreators";
import {WinStorage} from "../../services/AuthSrorage";
import {selectUserState} from "../../store/selectors";

import classes from "./Alert.module.scss";

type AlertNotification = "success" | "info" | "warning" | "error"

const RegistrationAlert = () => {
    const {registerStatus, status} = useSelector(selectUserState);
    const dispatch = useDispatch();
    const errorMessage = WinStorage.getErrorMessage();

    const setTimer = () => {
        setTimeout(() => {
            dispatch(userAC.setUserRegisterStatus(LoadingStatus.NEVER));
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

    if (registerStatus === LoadingStatus.SUCCESS) {
        setTimer();
        return alertNotification(errorMessage || "Registered successfully", "success");
    }

    if (registerStatus === LoadingStatus.WARNING) {
        setTimer();
        return alertNotification(errorMessage || "The email address is already registered.", "warning");
    }

    if (registerStatus === LoadingStatus.ERROR) {
        setTimer();
        return alertNotification(errorMessage || "The email address is already registered or problems with network.", "error");
    }

    if (registerStatus === LoadingStatus.RESET_PASSWORD_ERROR) {
        setTimer();
        return alertNotification("The e-mail address is not assigned to any user account", "error");
    }


    if (status === LoadingStatus.SEND_FEEDBACK_SUCCESS) {
        setTimer();
        return alertNotification("Your feedback has been saved successfully.", "success");
    }

    if (status === LoadingStatus.RESET_PASSWORD_SUCCESS) {
        setTimer();
        return alertNotification("Your password has been reset successfully. Please check your email.", "success");
    }


    return null;
};
export default RegistrationAlert;

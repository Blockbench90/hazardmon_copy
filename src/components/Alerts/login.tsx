import React from "react";
import {Alert} from "antd";
import {useDispatch, useSelector} from "react-redux";

import {LoadingStatus} from "../../store/types";
import {userAC} from "../../store/branches/user/actionCreators";
import {selectUserState} from "../../store/selectors";
import {WinStorage} from "../../services/AuthSrorage";

import classes from "./Alert.module.scss";

type AlertNotification = "success" | "info" | "warning" | "error"

const LoginAlert = () => {
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

    if (status === LoadingStatus.ERROR) {
        setTimer();
        return alertNotification(errorMessage || "Wrong email or password", "error");
    }

    return null;
};
export default LoginAlert;

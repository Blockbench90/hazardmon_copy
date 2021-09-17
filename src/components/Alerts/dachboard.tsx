import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "antd";

import {LoadingStatus} from "../../store/status";
import {sensorsAC} from "../../store/branches/sensors/actionCreators";
import {selectSensorsState} from "../../store/selectors";
import {WinStorage} from "../../services/AuthSrorage";

import classes from "./Alert.module.scss";

type AlertNotification = "success" | "info" | "warning" | "error"

const DashboardAlert = () => {
    const {status_operation} = useSelector(selectSensorsState);
    const dispatch = useDispatch();
    const errorMessage = WinStorage.getErrorMessage()

    const setTimer = () => {
        setTimeout(() => {
            dispatch(sensorsAC.setSensorsStatusOperation(LoadingStatus.NEVER));
            WinStorage.removeErrorMessage()
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


    if (status_operation === LoadingStatus.FETCH_SENSORS_NAMES_SUCCESS) {
        setTimer();
        return alertNotification("Successfully", "success")
    }

    if (status_operation === LoadingStatus.FETCH_SENSORS_ERROR) {
        setTimer();
        return alertNotification(errorMessage || "You do not have permission to edit warnings!", "warning")
    }

    if (status_operation === LoadingStatus.FETCH_SENSORS_NAMES_ERROR) {
        setTimer();
        return alertNotification(errorMessage || "Please select device before!", "warning")
    }

    if (status_operation === LoadingStatus.FETCH_SENSORS_WITHOUT_DEVICE) {
        setTimer();
        return alertNotification(errorMessage || "Please select device before!", "warning")
    }

    if (status_operation === LoadingStatus.FETCH_SENSORS_HISTORICAL_DATE) {
        setTimer();
        return alertNotification(errorMessage || "Please select time before!", "warning")
    }

    return null;
};
export default DashboardAlert;

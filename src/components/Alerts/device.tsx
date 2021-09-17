import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "antd";
import {devicesAC} from "../../store/branches/devices/actionCreators";
import {LoadingStatus} from "../../store/status";
import {WinStorage} from "../../services/AuthSrorage";
import {selectDevicesState} from "../../store/selectors";

import classes from "./Alert.module.scss";

type AlertNotification = "success" | "info" | "warning" | "error"

const DeviceAlert = () => {
    const {status_operation} = useSelector(selectDevicesState);
    const errorMessage = WinStorage.getErrorMessage();
    const dispatch = useDispatch();

    const setTimer = () => {
        setTimeout(() => {
            dispatch(devicesAC.setOperationDevices(LoadingStatus.NEVER));
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

    if (status_operation === LoadingStatus.ADD_DEVICE_ERROR) {
        setTimer();
        return alertNotification(errorMessage || "Not a valid serial number or code!", "warning")
    }

    if (status_operation === LoadingStatus.UPDATE_DEVICE_ERROR) {
        setTimer();
        return alertNotification(errorMessage || "Not a valid serial number or code!", "warning")
    }

    if (status_operation === LoadingStatus.EXPORT_NOTIFICATIONS_ERROR) {
        setTimer();
        return alertNotification(errorMessage, "warning")
    }

    if (status_operation === LoadingStatus.REMOVE_DEVICE_ERROR) {
        setTimer();
        return alertNotification(errorMessage || "Not a valid serial number or code!", "warning")
    }

    if (status_operation === LoadingStatus.ACTIVATION_DEVICE_SUCCESS) {
        setTimer();
        return alertNotification(errorMessage || "Operation successfully!", "success")
    }

    if (status_operation === LoadingStatus.ACTIVATION_DEVICE_ERROR) {
        setTimer();
        return alertNotification(errorMessage || "Not a valid serial number or code!", "warning")
    }

    if (status_operation === LoadingStatus.EXPORT_NOTIFICATIONS_WITHOUT_DATE) {
        setTimer();
        return alertNotification(errorMessage || "Please select date before!", "warning")
    }

    return null;
};
export default DeviceAlert;

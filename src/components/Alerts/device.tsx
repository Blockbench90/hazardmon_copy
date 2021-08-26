import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "antd";
import {devicesAC} from "../../store/branches/devices/actionCreators";
import {LoadingStatus} from "../../store/types";
import {WinStorage} from "../../services/AuthSrorage";
import {selectDevicesState} from "../../store/selectors";

import classes from "./Alert.module.scss";

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

    if (status_operation === LoadingStatus.ADD_DEVICE_ERROR) {
        setTimer();
        return (
            <Alert
                message={errorMessage || "Not a valid serial number or code!"}
                type="warning"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }

    if (status_operation === LoadingStatus.UPDATE_DEVICE_ERROR) {
        setTimer();
        return (
            <Alert
                message={errorMessage || "Not a valid serial number or code!"}
                type="warning"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }

    if (status_operation === LoadingStatus.EXPORT_NOTIFICATIONS_ERROR) {
        setTimer();
        return (
            <Alert
                message={errorMessage}
                type="warning"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }


    if (status_operation === LoadingStatus.REMOVE_DEVICE_ERROR) {
        setTimer();
        return (
            <Alert
                message={errorMessage || "Not a valid serial number or code!"}
                type="warning"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }

    if (status_operation === LoadingStatus.ACTIVATION_DEVICE_SUCCESS) {
        setTimer();

        return (
            <Alert
                message="Operation successfully"
                type="success"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }

    if (status_operation === LoadingStatus.ACTIVATION_DEVICE_ERROR) {
        setTimer();
        return (
            <Alert
                message={errorMessage || "Not a valid serial number or code!"}
                type="warning"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }

    if (status_operation === LoadingStatus.EXPORT_NOTIFICATIONS_WITHOUT_DATE) {
        setTimer();
        return (
            <Alert
                message="Please select date before!"
                type="warning"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }


    return null;
};
export default DeviceAlert;

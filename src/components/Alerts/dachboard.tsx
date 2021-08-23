import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "antd";

import {LoadingStatus} from "../../store/types";
import {sensorsAC} from "../../store/branches/sensors/actionCreators";
import {selectSensorsState} from "../../store/selectors";
import {WinStorage} from "../../services/AuthSrorage";

import classes from "./Alert.module.scss";

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

    // if (status_operation === LoadingStatus.FETCH_SENSORS_SUCCESS) {
    //     setTimer();
    //
    //     return (
    //         <Alert
    //             message="Successfully"
    //             type="success"
    //             showIcon
    //             closable
    //             className={classes.alert}
    //         />
    //     );
    // }


    if (status_operation === LoadingStatus.FETCH_SENSORS_NAMES_SUCCESS) {
        setTimer();

        return (
            <Alert
                message="Successfully"
                type="success"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }

    if (status_operation === LoadingStatus.FETCH_SENSORS_ERROR) {
        setTimer();

        return (
            <Alert
                message={errorMessage || "You do not have permission to edit warnings!"}
                type="warning"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }

    if (status_operation === LoadingStatus.FETCH_SENSORS_NAMES_ERROR) {
        setTimer();

        return (
            <Alert
                message="Please select device before!"
                type="warning"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }

    if (status_operation === LoadingStatus.FETCH_SENSORS_WITHOUT_DEVICE) {
        setTimer();

        return (
            <Alert
                message="Please select device before!"
                type="warning"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }

    if (status_operation === LoadingStatus.FETCH_SENSORS_HISTORICAL_DATE) {
        setTimer();

        return (
            <Alert
                message="Please select time before!"
                type="warning"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }

    return null;
};
export default DashboardAlert;

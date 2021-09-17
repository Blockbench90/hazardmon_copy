import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "antd";

import {WinStorage} from "../../services/AuthSrorage";
import {LoadingStatus} from "../../store/status";
import {selectGraphsState} from "../../store/selectors";
import {graphsAC} from "../../store/branches/graphs/actionCreators";

import classes from "./Alert.module.scss";

type AlertNotification = "success" | "info" | "warning" | "error"

const GraphsAlert = () => {
    const {status_operation} = useSelector(selectGraphsState);
    const dispatch = useDispatch();
    const errorMessage = WinStorage.getErrorMessage()

    const setTimer = () => {
        setTimeout(() => {
            dispatch(graphsAC.setGraphsStatusOperation(LoadingStatus.NEVER));
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

    if (status_operation === LoadingStatus.FETCH_GRAPHS_SUCCESS) {
        setTimer();
        return alertNotification(errorMessage || "Successfully", "success")
    }

    if (status_operation === LoadingStatus.FETCH_GRAPHS_ERROR) {
        setTimer();
        return alertNotification(errorMessage || "An error occured, please try again!", "warning")
    }

    if (status_operation === LoadingStatus.WITHOUT_SELECTED_DEVICE_GRAPHS_ERROR) {
        setTimer();
        return alertNotification(errorMessage || "Please, select device before!", "warning")
    }

    if (status_operation === LoadingStatus.FETCH_GRAPHS_TIME_ERROR) {
        setTimer();
        return alertNotification(errorMessage || "Please, select device before!", "warning")
    }

    return null;
};
export default GraphsAlert;

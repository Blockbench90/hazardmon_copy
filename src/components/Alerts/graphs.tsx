import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "antd";

import {WinStorage} from "../../services/AuthSrorage";
import {LoadingStatus} from "../../store/types";
import {selectGraphsState} from "../../store/selectors";

import classes from "./Alert.module.scss";
import {graphsAC} from "../../store/branches/graphs/actionCreators";

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

    if (status_operation === LoadingStatus.FETCH_GRAPHS_SUCCESS) {
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

    if (status_operation === LoadingStatus.FETCH_GRAPHS_ERROR) {
        setTimer();

        return (
            <Alert
                message={errorMessage || "An error occured, please try again!"}
                type="warning"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }

    if (status_operation === LoadingStatus.WITHOUT_SELECTED_DEVICE_GRAPHS_ERROR) {
        setTimer();

        return (
            <Alert
                message="Please, select device before!"
                type="warning"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }

    if (status_operation === LoadingStatus.FETCH_GRAPHS_TIME_ERROR) {
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

    return null;
};
export default GraphsAlert;

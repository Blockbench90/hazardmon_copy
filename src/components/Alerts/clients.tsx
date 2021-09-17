import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "antd";

import {LoadingStatus} from "../../store/status";
import {WinStorage} from "../../services/AuthSrorage";
import {selectClientsState} from "../../store/selectors";
import {clientsAC} from "../../store/branches/clients/actionCreators";

import classes from "./Alert.module.scss";

type AlertNotification = "success" | "info" | "warning" | "error"


const ClientAlert = () => {
    const {status_operation} = useSelector(selectClientsState);
    const dispatch = useDispatch();
    const errorMessage = WinStorage.getErrorMessage();

    const setTimer = () => {
        setTimeout(() => {
            dispatch(clientsAC.setStatusOperationClients(LoadingStatus.NEVER));
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


    if (status_operation === LoadingStatus.ADD_CLIENT_SUCCESS) {
        setTimer();
        return alertNotification(errorMessage || "Client added successfully", "success")
    }

    if (status_operation === LoadingStatus.ADD_CLIENT_ERROR) {
        setTimer();
        return alertNotification(errorMessage || "An error occured, please try again!", "warning")
    }

    if (status_operation === LoadingStatus.REMOVE_CLIENT_SUCCESS) {
        setTimer();
        return alertNotification(errorMessage || "Client removed successfully", "success")
    }

    if (status_operation === LoadingStatus.REMOVE_CLIENT_ERROR) {
        setTimer();
        return alertNotification(errorMessage || "An error occured, please try again!", "warning")
    }

    if (status_operation === LoadingStatus.UPDATE_CLIENT_SUCCESS) {
        setTimer();
        return alertNotification(errorMessage || "Client updated successfully", "success")
    }

    if (status_operation === LoadingStatus.UPDATE_CLIENT_ERROR) {
        setTimer();
        return alertNotification(errorMessage || "An error occured, please try again!", "warning")
    }

    if (status_operation === LoadingStatus.SELECT_CLIENT_ERROR) {
        setTimer();
        return alertNotification(errorMessage || "An error occured, please try again!", "warning")
    }

    return null;
};
export default ClientAlert;

import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "antd";

import {LoadingStatus} from "../../store/types";
import {WinStorage} from "../../services/AuthSrorage";
import {selectClientsState} from "../../store/selectors";
import {clientsAC} from "../../store/branches/clients/actionCreators";

import classes from "./Alert.module.scss";

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


    if (status_operation === LoadingStatus.ADD_CLIENT_SUCCESS) {
        setTimer();

        return (
            <Alert
                message="Client added successfully"
                type="success"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }

    if (status_operation === LoadingStatus.ADD_CLIENT_ERROR) {
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

    if (status_operation === LoadingStatus.REMOVE_CLIENT_SUCCESS) {
        setTimer();

        return (
            <Alert
                message="Client removed successfully"
                type="success"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }

    if (status_operation === LoadingStatus.REMOVE_CLIENT_ERROR) {
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

    if (status_operation === LoadingStatus.UPDATE_CLIENT_SUCCESS) {
        setTimer();

        return (
            <Alert
                message="Client updated successfully"
                type="success"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }

    if (status_operation === LoadingStatus.UPDATE_CLIENT_ERROR) {
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

    if (status_operation === LoadingStatus.SELECT_CLIENT_ERROR) {
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

    return null;
};
export default ClientAlert;

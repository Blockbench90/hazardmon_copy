import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "antd";

import {LoadingStatus} from "../../store/types";
import {sitesAC} from "../../store/branches/sites/actionCreators";
import {WinStorage} from "../../services/AuthSrorage";
import {selectSitesState} from "../../store/selectors";

import classes from "./Alert.module.scss";

const SitesAlert = () => {
    const dispatch = useDispatch();
    const {status_operation} = useSelector(selectSitesState);
    const errorMessage = WinStorage.getErrorMessage();

    const setTimer = () => {
        setTimeout(() => {
            dispatch(sitesAC.setOperationStatusSite(LoadingStatus.NEVER));
            WinStorage.removeErrorMessage();
        }, 5000);
    };

    if (status_operation === LoadingStatus.ADD_USER_SUCCESS) {
        setTimer();

        return (
            <Alert
                message="User added successfully"
                type="success"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }

    if (status_operation === LoadingStatus.ADD_USER_ERROR) {
        setTimer();

        return (
            <Alert
                message={errorMessage || "The email address is already registered."}
                type="warning"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }

    // if (status_operation === LoadingStatus.SELECT_SITE_SUCCESS) {
    //     setTimer();
    //
    //     return (
    //         <Alert
    //             message="Selected locations successfully"
    //             type="success"
    //             showIcon
    //             closable
    //             className={classes.alert}
    //         />
    //     );
    // }

    if (status_operation === LoadingStatus.SELECT_SITE_ERROR) {
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

    if (status_operation === LoadingStatus.ASSIGN_USER_SUCCESS) {
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

    if (status_operation === LoadingStatus.ASSIGN_USER_ERROR) {
        setTimer();

        return (
            <Alert
                message={errorMessage || "User added to another client"}
                type="warning"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }

    if (status_operation === LoadingStatus.EDIT_SITE_SUCCESS) {
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

    if (status_operation === LoadingStatus.EDIT_SITE_ERROR) {
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

    if (status_operation === LoadingStatus.ACTIVATION_SITE_SUCCESS) {
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

    if (status_operation === LoadingStatus.ACTIVATION_SITE_ERROR) {
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

    if (status_operation === LoadingStatus.ADD_SITE_SUCCESS) {
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

    if (status_operation === LoadingStatus.ADD_SITE_ERROR) {
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
export default SitesAlert;

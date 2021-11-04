import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "antd";

import {LoadingStatus} from "../../store/status";
import {sitesAC} from "../../store/branches/sites/actionCreators";
import {WinStorage} from "../../services/AuthSrorage";
import {selectSitesState} from "../../store/selectors";

import classes from "./Alert.module.scss";

type AlertNotification = "success" | "info" | "warning" | "error"

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

    const alertNotification = (message: typeof errorMessage | string, type: AlertNotification) => {
        return <Alert
            message={message}
            type={type}
            showIcon
            closable
            className={classes.alert}
        />;
    };

    if (status_operation === LoadingStatus.ADD_USER_ERROR) {
        setTimer();
        return alertNotification(errorMessage || "The email address is already registered.", "warning");
    }

    if (status_operation === LoadingStatus.SELECT_SITE_ERROR) {
        setTimer();
        return alertNotification(errorMessage || "An error occured, please try again!", "warning");
    }

    if (status_operation === LoadingStatus.ASSIGN_USER_ERROR) {
        setTimer();
        return alertNotification(errorMessage || "User added to another client", "warning");
    }

    if (status_operation === LoadingStatus.EDIT_SITE_ERROR) {
        setTimer();
        return alertNotification(errorMessage || "An error occured, please try again!", "warning");
    }

    if (status_operation === LoadingStatus.ACTIVATION_SITE_ERROR) {
        setTimer();
        return alertNotification(errorMessage || "An error occured, please try again!", "warning");
    }


    if (status_operation === LoadingStatus.ADD_SITE_ERROR) {
        setTimer();
        return alertNotification(errorMessage || "An error occured, please try again!", "warning");
    }

    if (status_operation === LoadingStatus.VISUAL_DASHBOARD_WITHOUT_LOCATION) {
        setTimer();
        return alertNotification("please select a location first", "error");
    }

    return null;
};
export default SitesAlert;

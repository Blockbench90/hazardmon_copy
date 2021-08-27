import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "antd";

import {LoadingStatus} from "../../store/types";
import {analyticsAC} from "../../store/branches/analytics/actionCreators";
import {WinStorage} from "../../services/AuthSrorage";
import {selectAnalyticsState} from "../../store/selectors";

import classes from "./Alert.module.scss";

type AlertNotification = "success" | "info" | "warning" | "error"

const AnalyticsAlert = () => {
    const {status_operation} = useSelector(selectAnalyticsState);
    const dispatch = useDispatch();
    const errorMessage = WinStorage.getErrorMessage();

    const setTimer = () => {
        setTimeout(() => {
            dispatch(analyticsAC.setStatusOperationAnalytics(LoadingStatus.NEVER));
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

    if (status_operation === LoadingStatus.FETCH_ANALYTICS_ERROR) {
        setTimer();
        return alertNotification(errorMessage || "An error occured, please try again!", "warning");
    }


    if (status_operation === LoadingStatus.FETCH_ANALYTICS_WITHOUT_DEVICE) {
        setTimer();
        return alertNotification(errorMessage || "Please select device before!", "warning");
    }


    return null;
};
export default AnalyticsAlert;
